import { Resolver } from '@nestjs/graphql'
import { User } from './dto/user.object'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersService } from './users.service'
import { UserArgs } from './dto/user.args'

@Resolver(() => User)
export class UsersResolver extends BaseResolver<
	User,
	CreateUserInput,
	UpdateUserInput,
	UserArgs
>(User, CreateUserInput, UpdateUserInput, UserArgs) {
	constructor(private readonly usersService: UsersService) {
		super(usersService)
	}
}
