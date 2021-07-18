import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
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
import { ROLES } from '../auth/constants/roles.constants'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { ObjectId } from '../common/constants/common'

@Resolver(() => User)
export class UsersResolver extends BaseResolver<
	User,
	CreateUserInput,
	UpdateUserInput,
	UserArgs
>(User, CreateUserInput, UpdateUserInput, UserArgs, [Roles.ADMIN, Roles.USER]) {
	constructor(
		private readonly usersService: UsersService,
		@Inject(UsersAvatarsService.name)
		private readonly usersAvatarsService: UsersAvatarsService
	) {
		super(usersService)
	}

	@Query(() => User, {
		name: 'getMe'
	})
	@AuthRoles(ROLES.ALL)
	async me(@CurrentUser() user: UserModel): Promise<UserModel> {
		return this.baseService.findOneById(user._id)
	}

	@Query(() => [User], { name: `findAll${User.name}` })
	@AuthRoles(Roles.ADMIN)
	async findAll(
		@Args({ type: () => UserArgs })
		data
	): Promise<User[]> {
		return this.baseService.findAll(data)
	}

	@ResolveField('avatar', () => UsersAvatars, { nullable: true })
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async getAvatar(@CurrentUser() user: UserModel): Promise<UsersAvatarsModel> {
		return this.usersAvatarsService.findOne({ userId: user._id }, null, {
			sort: { createdAt: -1 }
		})
	}
}
