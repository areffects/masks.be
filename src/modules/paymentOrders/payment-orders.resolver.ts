import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { CreatePaymentOrderInput } from './dto/create-payment-order.input'
import { UpdatePaymentOrderInput } from './dto/update-payment-order.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { PaymentOrderArgs } from './dto/payment-order.args'
import { AuthRoles } from '../auth/decorators/roles.decorator'
import { PaymentOrder } from './dto/payment-order.object'
import { User } from '../users/dto/user.object'
import { UsersService } from '../users/users.service'
import { PaymentOrdersModel } from './models/payment-orders.schema'
import { UsersProducts } from '../usersProducts/dto/users-products.object'
import { PaymentOrdersService } from './payment-orders.service'
import { Inject } from '@nestjs/common'
import { UsersProductsService } from '../usersProducts/users-products.service'
import { UsersProductsModel } from '../usersProducts/models/users-products.schema'
import { UserModel } from '../users/models/users.schema'
import { Roles } from '../users/enums/roles.enum'

@Resolver(() => PaymentOrder)
export class PaymentOrdersResolver extends BaseResolver<
	PaymentOrder,
	CreatePaymentOrderInput,
	UpdatePaymentOrderInput,
	PaymentOrderArgs
>(
	PaymentOrder,
	CreatePaymentOrderInput,
	UpdatePaymentOrderInput,
	PaymentOrderArgs
) {
	constructor(
		private readonly paymentOrdersService: PaymentOrdersService,
		@Inject(UsersProductsService.name)
		private readonly usersProductsService: UsersProductsService,
		@Inject(UsersService.name) private readonly usersService: UsersService
	) {
		super(paymentOrdersService)
	}

	@ResolveField('user', () => User, { nullable: true })
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async getUser(
		@Parent() paymentOrder: PaymentOrdersModel
	): Promise<UserModel> {
		return this.usersService.findOneById(paymentOrder.userId)
	}

	@ResolveField('product', () => UsersProducts, { nullable: true })
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async getProduct(
		@Parent() paymentOrder: PaymentOrdersModel
	): Promise<UsersProductsModel> {
		return this.usersProductsService.findOneById(paymentOrder.productId)
	}
}
