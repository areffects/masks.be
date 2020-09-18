import { Query, Resolver } from '@nestjs/graphql'
import { UserObject } from './dto/user.object'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersService } from './users.service'
import { Roles } from '../auth/decorators/roles.decorator'
import { ADMIN } from './constants/roles'

@Resolver(() => UserObject)
export class UsersResolver extends BaseResolver<
	UserObject,
	CreateUserInput,
	UpdateUserInput
>(UserObject, CreateUserInput, UpdateUserInput) {
	constructor(private readonly usersService: UsersService) {
		super(usersService)
	}

	@Query(() => [UserObject], { name: `findAll${UserObject.name}` })
	@Roles(ADMIN)
	async findAll(): Promise<UserObject[]> {
		return super.findAll()
	}
}
