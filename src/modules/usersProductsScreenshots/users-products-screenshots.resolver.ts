import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateUsersProductsScreenshotsInput } from './dto/update-users-products-screenshots.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { CreateUsersProductsScreenshotsInput } from './dto/create-users-products-screenshots.input'
import { GraphQLUpload } from 'apollo-server-express'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { UserModel } from '../users/models/users.schema'
import { FileService } from '../shared/services/file.service'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import { USERS_PRODUCTS_SCREENSHOTS_BUCKET_NAME } from 'src/environments'
import { AuthRoles } from '../auth/decorators/roles.decorator'
import { Roles } from '../users/enums/roles.enum'
import { UsersProductsArgs } from '../usersProducts/dto/users-products.args'
import { UsersProductsScreenshots } from './dto/users-products-screenshots.object'
import { UsersProductsScreenshotsService } from './users-products-screenshots.service'
import { UsersProductsScreenshotsArgs } from './dto/users-products-screenshots.args'
import { FILE, FILES } from '../common/constants/common'

@Resolver(() => UsersProductsScreenshots)
export class UsersProductsScreenshotsResolver extends BaseResolver<
	UsersProductsScreenshots,
	CreateUsersProductsScreenshotsInput,
	UpdateUsersProductsScreenshotsInput,
	UsersProductsScreenshotsArgs
>(
	UsersProductsScreenshots,
	CreateUsersProductsScreenshotsInput,
	UpdateUsersProductsScreenshotsInput,
	UsersProductsArgs
) {
	constructor(
		private readonly usersProductsScreenshotsService: UsersProductsScreenshotsService,
		@Inject(FileService.name) private readonly fileService: FileService
	) {
		super(usersProductsScreenshotsService)
	}

	@Mutation(() => Boolean, {
		name: `uploadFile${UsersProductsScreenshots.name}`
	})
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async uploadFile(
		@CurrentUser() user: UserModel,
		@Args({ name: FILE, type: () => GraphQLUpload })
		fileUpload: FileUpload & { uid: string }
	): Promise<boolean> {
		const fullFileName = this.fileService.getFullFileName({
			user,
			filename: fileUpload.filename,
			uid: fileUpload.uid
		})
		try {
			await this.fileService.uploadToS3File({
				bucketName: USERS_PRODUCTS_SCREENSHOTS_BUCKET_NAME,
				fileName: fullFileName,
				createReadStream: fileUpload.createReadStream
			})
			await this.usersProductsScreenshotsService.create({
				name: fullFileName,
				userId: user.id
			})
		} catch (e) {
			throw new InternalServerErrorException(e)
		}
		return true
	}

	@Mutation(() => Boolean, {
		name: `uploadFiles${UsersProductsScreenshots.name}`
	})
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async uploadFiles(
		@CurrentUser() user: UserModel,
		@Args({ name: FILES, type: () => [GraphQLUpload] })
		{ ...props }
	): Promise<boolean> {
		const files = await Promise.all(Object.keys(props).map((key) => props[key]))
		try {
			await Promise.all(
				files.map(async (file: FileUpload & { uid: string }) => {
					const { createReadStream, filename, uid } = file
					const fullFileName = this.fileService.getFullFileName({
						user,
						filename,
						uid
					})
					await this.fileService.uploadToS3File({
						bucketName: USERS_PRODUCTS_SCREENSHOTS_BUCKET_NAME,
						fileName: fullFileName,
						createReadStream
					})
					return this.usersProductsScreenshotsService.create({
						name: fullFileName,
						userId: user.id
					})
				})
			)
		} catch (e) {
			throw new InternalServerErrorException(e)
		}
		return true
	}
}
