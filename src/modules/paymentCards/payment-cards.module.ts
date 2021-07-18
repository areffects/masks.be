import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
	PaymentCardsModel,
	PaymentCardsSchema
} from './models/payment-cards.schema'
import { PaymentCardsResolver } from './payment-cards.resolver'
import { PaymentCardsService } from './payment-cards.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: PaymentCardsModel.name,
				schema: PaymentCardsSchema
			}
		])
	],
	providers: [PaymentCardsResolver, PaymentCardsService],
	exports: [PaymentCardsService]
})
export class PaymentCardsModule {}
