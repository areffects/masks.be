import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from 'src/modules/common/constants/common'

@Schema()
export class Transaction extends Document {
	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true,
		default: () => new ObjectId()
	})
	_id: string

	@Prop({ required: true })
	userId: number

	@Prop()
	type: string

	@Prop({ required: true })
	amount: number

	@Prop()
	balance: number
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
