import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UsersProductsTypes } from '../enums/types.enums'

@ObjectType()
export class UsersProducts {
	@Field(() => ID)
	_id?: string

	@Field()
	name: string

	@Field()
	description: string

	@Field()
	cost: string

	@Field()
	rating: number

	@Field(() => UsersProductsTypes)
	type: UsersProductsTypes

	@Field()
	downloads: number

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
