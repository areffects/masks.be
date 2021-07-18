import { Resolver } from '@nestjs/graphql'
import { UsersSocials } from './dto/users-socials.object'
import { UpdateUsersSocialsInput } from './dto/update-users-socials.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { UsersSocialsArgs } from './dto/users-socials.args'
import { CreateUsersSocialsInput } from './dto/create-users-socials.input'
import { UsersSocialsService } from './users-socials.service'
import { UsersSocialsModel } from './models/users-socials.schema'

@Resolver(() => UsersSocials)
export class UsersSocialsResolver extends BaseResolver<
	UsersSocialsModel,
	CreateUsersSocialsInput,
	UpdateUsersSocialsInput,
	UsersSocialsArgs
>(
	UsersSocialsModel,
	CreateUsersSocialsInput,
	UpdateUsersSocialsInput,
	UsersSocialsArgs
) {
	constructor(private readonly usersSocialsService: UsersSocialsService) {
		super(usersSocialsService)
	}
}
