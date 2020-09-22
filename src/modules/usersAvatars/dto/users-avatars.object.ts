import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ObjectType()
export class UsersAvatarsObject {
	@Field(() => ID)
	_id: string

	@Field(() => ObjectIdScalar)
	userId: string

	@Field()
	name: string

	@Field()
	url: string
}
