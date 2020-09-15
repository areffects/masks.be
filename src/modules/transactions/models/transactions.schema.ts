import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Transaction extends Document {
	@Prop()
	id: string

	@Prop()
	user_id: number

	@Prop({ required: true })
	amount: number

	@Prop()
	balance: number
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
