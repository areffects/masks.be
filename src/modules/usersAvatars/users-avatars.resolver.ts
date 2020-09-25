import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersAvatars } from './dto/users-avatars.object'
import { UpdateUsersAvatarsInput } from './dto/update-user-avatars.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersAvatarsArgs } from './dto/users-avatars.args'
import { CreateUsersAvatarsInput } from './dto/create-users-avatars.input'
import { UsersAvatarsService } from './users-avatars.service'
import { GraphQLUpload } from 'apollo-server-express'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/models/users.schema'
import { FileService } from '../shared/services/file.service'
import { Inject, InternalServerErrorException } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import { USERS_AVATARS_BUCKET_NAME } from 'src/environments'

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
		this.rootDir = './uploads/users-avatars/'
	}

	@Mutation(() => Boolean)
	async uploadFile(
		@CurrentUser() user: User,
		@Args({ name: 'file', type: () => GraphQLUpload })
		{ createReadStream, filename }: FileUpload
	): Promise<boolean> {
		const generatedFileName = this.fileService.generateName({
			filename
		})
		const fullPath = `${this.rootDir}${generatedFileName}`

		try {
			await this.usersAvatarsService.uploadFile({
				createReadStream,
				rootDir: this.rootDir,
				fileName: generatedFileName
			})

			await this.fileService.uploadToS3File({
				bucketName: USERS_AVATARS_BUCKET_NAME,
				fileName: generatedFileName,
				fullPath
			})

			this.fileService.getPresignedUrl({
				bucketName: USERS_AVATARS_BUCKET_NAME,
				fileName: generatedFileName
			})
			// uploadFile('./uploads/ec2.pem')
			await this.usersAvatarsService.create({
				url: generatedFileName,
				name: generatedFileName,
				userId: user.id
			})
		} catch (e) {
			throw new InternalServerErrorException(e)
		}
		return true
	}

	@Mutation(() => Boolean)
	async uploadFiles(
		@CurrentUser() user: User,
		@Args({ name: 'files', type: () => [GraphQLUpload] })
		{ ...props }
	): Promise<boolean> {
		const files = await Promise.all(Object.keys(props).map((key) => props[key]))
		try {
			await Promise.all(
				files.map(async (file: FileUpload) => {
					const { createReadStream, filename } = file

					const generatedFileName = this.fileService.generateName({
						filename
					})
					const fullPath = `${this.rootDir}${generatedFileName}`
					await this.usersAvatarsService.uploadFile({
						createReadStream,
						rootDir: this.rotDir,
						fileName: generatedFileName
					})
					await this.fileService.uploadToS3File({
						bucketName: USERS_AVATARS_BUCKET_NAME,
						fileName: generatedFileName,
						fullPath
					})
					return this.usersAvatarsService.create({
						url: generatedFileName,
						name: generatedFileName,
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
