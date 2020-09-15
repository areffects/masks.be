import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTransactionInput {
	@Field()
	userId: string

	@Field()
	type: string

	@Field()
	amount: number
}
