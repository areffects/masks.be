import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePaymentOrderInput {
	@Field()
	userId: string

	@Field()
	productId: string
}
