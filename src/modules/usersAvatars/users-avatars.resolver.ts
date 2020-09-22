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
	constructor(private readonly usersAvatarsService: UsersAvatarsService) {
		super(usersAvatarsService)
	}

	@Mutation(() => Boolean)
	async uploadFile(
		@CurrentUser() user: User,
		@Args({ name: 'file', type: () => GraphQLUpload })
		{ createReadStream, filename }
	): Promise<boolean> {
		await this.usersAvatarsService.uploadFile({
			createReadStream,
			filename
		})
		await this.usersAvatarsService.create({
			url: filename,
			name: filename,
			userId: user.id
		})
		return true
	}

	@Mutation(() => Boolean)
	async uploadFiles(
		@Args({ name: 'files', type: () => [GraphQLUpload] })
		{ ...props }
	): Promise<boolean> {
		const files = await Promise.all(Object.keys(props).map((key) => props[key]))
		Promise.all(
			files.map(async (file) => {
				const { createReadStream, filename } = file
				await this.usersAvatarsService.uploadFile({
					createReadStream,
					filename
				})
				return this.usersAvatarsService.uploadFile({
					createReadStream,
					filename
				})
			})
		)
		return true
	}
}
