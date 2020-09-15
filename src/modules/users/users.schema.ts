import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
	@Prop()
	id: string

	@Prop({ required: true })
	user_id: number

	@Prop({ required: true })
	amount: number

	@Prop()
	balance: number
}

export const UserSchema = SchemaFactory.createForClass(User)
