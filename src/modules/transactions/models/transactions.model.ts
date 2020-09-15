import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Document } from 'mongoose'

@ObjectType()
export class TransactionModel extends Document {
	@Field(() => ID)
	id: string

	@Field()
	userId: string

	@Field()
	type: string

	@Field()
	amount: number

	@Field()
	balance: number
}
