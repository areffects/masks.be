import { Field, InputType } from '@nestjs/graphql'
import { Length } from 'class-validator'

@InputType()
export class CreatePaymentCardsInput {
	@Field()
	@Length(0, 16)
	numbers: string

	@Field()
	@Length(0, 4)
	pin: string

	@Field()
	@Length(0, 10)
	date: string
}
