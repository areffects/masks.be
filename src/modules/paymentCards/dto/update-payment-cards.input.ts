import { Field, InputType } from '@nestjs/graphql'
import { Length } from 'class-validator'

@InputType()
export class UpdatePaymentCardsInput {
	@Field({ nullable: true })
	@Length(0, 16)
	numbers: string

	@Field({ nullable: true })
	@Length(0, 4)
	pin: string

	@Field({ nullable: true })
	@Length(0, 10)
	date: string
}
