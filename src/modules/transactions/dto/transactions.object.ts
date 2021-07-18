import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Transaction {
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

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
