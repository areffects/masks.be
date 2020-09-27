import { Resolver } from '@nestjs/graphql'
import { UsersProducts } from './dto/users-products.object'
import BaseResolver from '../common/resolvers/common.resolver'
import { CreateUsersProductsInput } from './dto/create-users-products.input'
import { UpdateUsersProductsInput } from './dto/update-user-products.input'
import { UsersProductsArgs } from './dto/users-products.args'
import { UsersProductsService } from './users-products.service'

@Resolver(() => UsersProducts)
export class UsersProductsResolver extends BaseResolver<
	UsersProducts,
	CreateUsersProductsInput,
	UpdateUsersProductsInput,
	UsersProductsArgs
>(
	UsersProducts,
	CreateUsersProductsInput,
	UpdateUsersProductsInput,
	UsersProductsArgs
) {
	constructor(private readonly usersProductsService: UsersProductsService) {
		super(usersProductsService)
	}
}
