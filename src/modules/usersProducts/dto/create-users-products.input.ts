import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUsersProductsInput {
	@Field()
	name: string

	@Field()
	description: string

	@Field()
	rate: number

	@Field()
	type: string

	@Field()
	downloads: number
}
