import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('transactionObject')
export class TransactionObject {
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
