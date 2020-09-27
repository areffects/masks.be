import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class UsersProductsArgs {
	@Field(() => ID)
	_id?: string

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
