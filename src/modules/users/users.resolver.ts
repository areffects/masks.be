import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { User } from './dto/user.object'
import { UserModel } from './models/users.schema'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersService } from './users.service'
import { UserArgs } from './dto/user.args'
import { AuthRoles } from '../auth/decorators/roles.decorator'
import { UsersAvatarsService } from '../usersAvatars/users-avatars.service'
import { Inject } from '@nestjs/common'
import { UsersAvatars } from '../usersAvatars/dto/users-avatars.object'
import { UsersAvatarsModel } from '../usersAvatars/models/users-avatars.schema'
import { Roles } from './enums/roles.enum'

@Resolver(() => User)
export class UsersResolver extends BaseResolver<
	User,
	CreateUserInput,
	UpdateUserInput,
	UserArgs
>(User, CreateUserInput, UpdateUserInput, UserArgs, [Roles.ADMIN]) {
	constructor(
		private readonly usersService: UsersService,
		@Inject(UsersAvatarsService.name)
		private readonly usersAvatarsService: UsersAvatarsService
	) {
		super(usersService)
	}

	@ResolveField('avatar', () => UsersAvatars)
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async getUser(@Parent() userModel: UserModel): Promise<UsersAvatarsModel> {
		return this.usersAvatarsService.findOneById(userModel.avatarId)
	}
}
