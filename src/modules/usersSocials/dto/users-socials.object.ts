import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ObjectType()
export class UsersSocials {
	@Field(() => ID)
	_id?: string

	@Field(() => ObjectIdScalar)
	userId: string

	@Field()
	name: string

	@Field({ nullable: true })
	url: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
