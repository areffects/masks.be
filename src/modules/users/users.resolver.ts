import { Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { UserObject } from './dto/user.object'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Resolver(() => UserObject)
export class UsersResolver extends BaseResolver<
	UserObject,
	CreateUserInput,
	UpdateUserInput
>(UserObject, CreateUserInput, UpdateUserInput) {
	constructor(private readonly usersService: UsersService) {
		super(usersService)
	}

	@UseGuards(JwtAuthGuard)
	@Query(() => [UserObject], { name: `findAll${UserObject.name}` })
	async findAll(): Promise<UserObject[]> {
		return this.usersService.findAll()
	}
}
