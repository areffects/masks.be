import { Field, InputType } from '@nestjs/graphql'
import { UsersProductsTypes } from '../enums/types.enums'

@InputType()
export class CreateUsersProductsInput {
	@Field()
	name: string

	@Field()
	category: string
	
	@Field()
	description: string

	@Field(() => UsersProductsTypes, { nullable: true })
	type: UsersProductsTypes

	@Field()
	cost: number
}
