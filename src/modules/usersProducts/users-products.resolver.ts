import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersProducts } from './dto/users-products.object'
import BaseResolver from '../common/resolvers/common.resolver'
import { CreateUsersProductsInput } from './dto/create-users-products.input'
import { UpdateUsersProductsInput } from './dto/update-user-products.input'
import { UsersProductsArgs } from './dto/users-products.args'
import { UsersProductsService } from './users-products.service'
import { AuthRoles } from '../auth/decorators/roles.decorator'
import { UsePipes } from '@nestjs/common'
import { Roles } from '../users/enums/roles.enum'
import { ClassValidatorValidationPipe } from '../common/pipes/class-validator.validation.pipe'
import { CreateQuery } from 'mongoose'
import { DATA } from '../common/constants/common'

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
	UsersProductsArgs,
	[]
) {
	constructor(private readonly usersProductsService: UsersProductsService) {
		super(usersProductsService)
	}
	@Mutation(() => UsersProducts, {
		name: `create${UsersProducts.name}`
	})
	@AuthRoles()
	@UsePipes(new ClassValidatorValidationPipe(CreateUsersProductsInput))
	async create(
		@Args({ name: DATA, type: () => CreateUsersProductsInput })
		createData: CreateQuery<CreateUsersProductsInput>
	): Promise<UsersProducts> {
		return this.baseService.create(createData)
	}

	@Mutation(() => UsersProducts, { name: `update${UsersProducts.name}` })
	@UsePipes(new ClassValidatorValidationPipe(UpdateUsersProductsInput))
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async update(
		@Args({ name: 'id', type: () => String }) id: string,
		@Args({ name: DATA, type: () => UpdateUsersProductsInput })
		updateData: UpdateUsersProductsInput
	): Promise<UsersProducts> {
		return this.baseService.update(id, updateData)
	}

	@Mutation(() => Boolean, { name: `delete${UsersProducts.name}` })
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async delete(
		@Args({ name: 'id', type: () => String }) id: string
	): Promise<boolean> {
		return this.baseService.delete(id)
	}
}
