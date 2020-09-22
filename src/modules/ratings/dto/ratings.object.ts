import { Field, ObjectType } from '@nestjs/graphql'
import { UserObject } from 'src/modules/users/dto/user.object'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ObjectType()
export class RatingObject {
	@Field(() => ObjectIdScalar)
	_id: string

	@Field(() => UserObject, { nullable: true })
	user: UserObject

	@Field()
	type: string

	@Field()
	stars: number
}
