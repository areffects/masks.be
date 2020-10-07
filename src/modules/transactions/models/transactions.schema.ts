import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'

@Schema({
	timestamps: true,
	collection: 'transactions'
})
export class TransactionModel extends Document {
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
	userId: number

	@Prop()
	type: string

	@Prop({ required: true })
	amount: number

	@Prop()
	balance: number
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionModel)
