import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreatePaymentCardsInput } from './dto/create-payment-cards.input'
import { InjectModel } from '@nestjs/mongoose'
import { PaymentCardsModel } from './models/payment-cards.schema'
import { BaseMongoService } from '../common/services/mongo.service'
import { UpdatePaymentCardsInput } from './dto/update-payment-cards.input'

@Injectable()
export class PaymentCardsService extends BaseMongoService<
	PaymentCardsModel,
	CreatePaymentCardsInput,
	UpdatePaymentCardsInput
> {
	constructor(
		@InjectModel(PaymentCardsModel.name)
		private paymentCardsModel: Model<PaymentCardsModel>
	) {
		super(paymentCardsModel)
	}
}
