import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Document } from 'mongoose'

@ObjectType()
export class TransactionModel extends Document {
	@Field((type) => ID)
	id?: string

	@Field()
	userId: string

	@Field()
	type: string

	@Field()
	amount: number

	@Field()
	balance: number
}
