import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Categories {
	@Field(() => ID)
	_id?: string

	@Field()
	name: string
}
