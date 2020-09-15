import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Document } from 'mongoose'

@ObjectType('transactionObject')
export class TransactionObject extends Document {
	@Field(() => ID)
	_id: string

	@Field({ nullable: true })
	userId: string

	@Field()
	type: string

	@Field()
	amount: number

	@Field()
	balance: number
}
