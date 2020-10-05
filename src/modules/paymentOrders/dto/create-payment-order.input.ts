import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePaymentOrderInput {
	@Field()
	userId: string

	@Field()
	productId: string
}
