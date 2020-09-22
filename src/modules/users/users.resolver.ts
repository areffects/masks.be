import { Resolver } from '@nestjs/graphql'
import { UserObject } from './dto/user.object'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersService } from './users.service'
import { UserArgs } from './dto/user.args'

@Resolver(() => UserObject)
export class UsersResolver extends BaseResolver<
	UserObject,
	CreateUserInput,
	UpdateUserInput,
	UserArgs
>(UserObject, CreateUserInput, UpdateUserInput, UserArgs) {
	constructor(private readonly usersService: UsersService) {
		super(usersService)
	}
}
