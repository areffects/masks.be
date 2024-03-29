import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { CreatePaymentCardsInput } from './dto/create-payment-cards.input'
import { UpdatePaymentCardsInput } from './dto/update-payment-cards.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { PaymentCardsService } from './payment-cards.service'
import { PaymentCardsArgs } from './dto/payment-cards.args'
import { PaymentCardsModel } from './models/payment-cards.schema'
import { AuthRoles } from '../auth/decorators/roles.decorator'
import { PaymentCards } from './dto/payment-cards.object'
import { User } from '../users/dto/user.object'
import { Roles } from '../users/enums/roles.enum'

@Resolver(() => PaymentCards)
export class PaymentCardsResolver extends BaseResolver<
	PaymentCards,
	CreatePaymentCardsInput,
	UpdatePaymentCardsInput,
	PaymentCardsArgs
>(
	PaymentCards,
	CreatePaymentCardsInput,
	UpdatePaymentCardsInput,
	PaymentCardsArgs
) {
	constructor(private readonly paymentCardsService: PaymentCardsService) {
		super(paymentCardsService)
	}

	@ResolveField('user', () => User)
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async getUser(@Parent() paymentCard: PaymentCardsModel): Promise<User> {
		return this.usersService.findOneById(paymentCard.userId)
	}
}
