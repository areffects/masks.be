import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersAvatars } from './dto/users-avatars.object'
import { UpdateUsersAvatarsInput } from './dto/update-user-avatars.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersAvatarsArgs } from './dto/users-avatars.args'
import { CreateUsersAvatarsInput } from './dto/create-users-avatars.input'
import { UsersAvatarsService } from './users-avatars.service'
import { GraphQLUpload } from 'apollo-server-express'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { UserModel } from '../users/models/users.schema'
import { FileService } from '../shared/services/file.service'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import { USERS_AVATARS_BUCKET_NAME } from 'src/environments'
import { AuthRoles } from '../auth/decorators/roles.decorator'
import { Roles } from '../users/enums/roles.enum'

@Resolver(() => UsersAvatars)
export class UsersAvatarsResolver extends BaseResolver<
	UsersAvatars,
	CreateUsersAvatarsInput,
	UpdateUsersAvatarsInput,
	UsersAvatarsArgs
>(
	UsersAvatars,
	CreateUsersAvatarsInput,
	UpdateUsersAvatarsInput,
	UsersAvatarsArgs
) {
	constructor(
		private readonly usersAvatarsService: UsersAvatarsService,
		@Inject(FileService.name) private readonly fileService: FileService
	) {
		super(usersAvatarsService)
	}

	@Mutation(() => Boolean, {
		name: `uploadFile${UsersAvatars.name}`
	})
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async uploadFile(
		@CurrentUser() user: UserModel,
		@Args({ name: 'file', type: () => GraphQLUpload })
		{ createReadStream, filename, uid }: FileUpload & { uid: string }
	): Promise<boolean> {
		const fullFileName = this.fileService.getFullFileName({
			user,
			filename,
			uid
		})
		try {
			await this.fileService.uploadToS3File({
				bucketName: USERS_AVATARS_BUCKET_NAME,
				fileName: fullFileName,
				createReadStream
			})
			await this.usersAvatarsService.create({
				name: fullFileName,
				userId: user.id
			})
		} catch (e) {
			throw new InternalServerErrorException(e)
		}
		return true
	}

	@Mutation(() => Boolean, {
		name: `uploadFiles${UsersAvatars.name}`
	})
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async uploadFiles(
		@CurrentUser() user: UserModel,
		@Args({ name: 'files', type: () => [GraphQLUpload] })
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
						bucketName: USERS_AVATARS_BUCKET_NAME,
						fileName: fullFileName,
						createReadStream
					})
					return this.usersAvatarsService.create({
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
