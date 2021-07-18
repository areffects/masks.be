import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'

@Schema({
	timestamps: true,
	collection: 'paymentCards'
})
export class PaymentCardsModel extends Document {
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
	@Prop({ unique: true, required: true })
	userId: string

	@Prop({ required: true })
	pin: string

	@Prop({ required: true })
	date: string
}

export const PaymentCardsSchema = SchemaFactory.createForClass(
	PaymentCardsModel
)
