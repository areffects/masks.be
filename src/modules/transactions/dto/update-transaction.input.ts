import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsNumber } from 'class-validator'

@InputType('updateTransactionInput')
export class UpdateTransactionInput {
	@Field()
	@IsString()
	userId: string

	@Field()
	@IsString()
	type: string

	@Field()
	@IsNumber()
	amount: number

	@Field()
	@IsNumber()
	balance: number
}
