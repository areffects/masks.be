import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'

@Schema({
	timestamps: true,
	collection: 'paymentOrders'
})
export class PaymentOrdersModel extends Document {
	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true,
		default: () => new ObjectId()
	})
	_id: string

	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true
	})
	@Prop({ required: true })
	userId: string

	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true
	})
	@Prop({ required: true })
	productId: string
}

export const PaymentOrdersSchema = SchemaFactory.createForClass(
	PaymentOrdersModel
)
