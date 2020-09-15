import { Field, InputType } from '@nestjs/graphql'

@InputType('updateTransactionInput')
export class UpdateTransactionInput {
	@Field()
	userId: string

	@Field()
	type: string

	@Field()
	amount: number
}
