import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsDefined, IsNumber } from 'class-validator'

@InputType()
export class CreateTransactionInput {
	@Field()
	@IsDefined()
	@IsString()
	userId: string

	@Field()
	@IsDefined()
	@IsString()
	type: string

	@Field()
	@IsDefined()
	@IsNumber()
	amount: number
}
