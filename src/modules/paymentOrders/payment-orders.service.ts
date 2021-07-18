import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseMongoService } from '../common/services/mongo.service'
import { PaymentOrdersModel } from './models/payment-orders.schema'
import { CreatePaymentOrderInput } from './dto/create-payment-order.input'
import { UpdatePaymentOrderInput } from './dto/update-payment-order.input'

@Injectable()
export class PaymentOrdersService extends BaseMongoService<
	PaymentOrdersModel,
	CreatePaymentOrderInput,
	UpdatePaymentOrderInput
> {
	constructor(
		@InjectModel(PaymentOrdersModel.name)
		private paymentOrdersModel: Model<PaymentOrdersModel>
	) {
		super(paymentOrdersModel)
	}
}
