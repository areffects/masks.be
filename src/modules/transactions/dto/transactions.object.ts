import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Document } from 'mongoose'
import {} from '@nestjs/mongoose'

@ObjectType('transactionObject')
export class TransactionObject extends Document {
	@Field(() => ID)
	_id: string

	@Field()
	userId: string

	@Field()
	type: string

	@Field()
	amount: number

	@Field()
	balance: number
}
