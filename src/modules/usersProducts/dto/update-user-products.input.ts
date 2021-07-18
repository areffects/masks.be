import { Field, InputType } from '@nestjs/graphql'
import { UsersProductsTypes } from '../enums/types.enums'

@InputType()
export class UpdateUsersProductsInput {
	@Field({ nullable: true })
	name: string

	@Field({ nullable: true })
	category: string

	@Field({ nullable: true })
	description: string

	@Field(() => UsersProductsTypes, { nullable: true })
	type: UsersProductsTypes
}
