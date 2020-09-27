import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUsersProductsInput {
	@Field({ nullable: true })
	name: string

	@Field({ nullable: true })
	description: string

	@Field({ nullable: true })
	rate: number

	@Field({ nullable: true })
	type: string

	@Field({ nullable: true })
	downloads: number
}
