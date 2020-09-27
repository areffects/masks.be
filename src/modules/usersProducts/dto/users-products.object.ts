import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UsersProducts {
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

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
