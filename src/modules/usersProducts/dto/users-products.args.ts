import { ArgsType, Field, ID } from '@nestjs/graphql'
import { UsersProductsTypes } from '../enums/types.enums'

@ArgsType()
export class UsersProductsArgs {
	@Field(() => ID, { nullable: true })
	_id?: string

	@Field({ nullable: true })
	name: string

	@Field({ nullable: true })
	category: string

	@Field({ nullable: true })
	description: string

	@Field({ nullable: true })
	rating: number

	@Field({ nullable: true })
	cost: number

	@Field(() => UsersProductsTypes, { nullable: true })
	type: UsersProductsTypes

	@Field({ nullable: true })
	downloads: number
}
