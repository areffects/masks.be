import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersAvatarsObject } from './dto/users-avatars.object'
import { UpdateUsersAvatarsInput } from './dto/update-user-avatars.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersAvatarsArgs } from './dto/users-avatars.args'
import { CreateUsersAvatarsInput } from './dto/create-users-avatars.input'
import { UsersAvatarsService } from './users-avatars.service'
import { GraphQLUpload } from 'apollo-server-express'
import { createWriteStream } from 'fs'

@Resolver(() => UsersAvatarsObject)
export class UsersAvatarsResolver extends BaseResolver<
	UsersAvatarsObject,
	CreateUsersAvatarsInput,
	UpdateUsersAvatarsInput,
	UsersAvatarsArgs
>(
	UsersAvatarsObject,
	CreateUsersAvatarsInput,
	UpdateUsersAvatarsInput,
	UsersAvatarsArgs
) {
	constructor(private readonly usersAvatarsService: UsersAvatarsService) {
		super(usersAvatarsService)
	}

	@Mutation(() => Boolean)
	async uploadFile(
		@Args({ name: 'file', type: () => GraphQLUpload })
		{ createReadStream, filename }
	): Promise<boolean> {
		return new Promise(async (resolve, reject) =>
			createReadStream()
				.pipe(createWriteStream(`./uploads/${filename}`))
				.on('finish', () => resolve(true))
				.on('error', () => reject(false))
		)
	}
}
