import { Field, ObjectType } from '@nestjs/graphql'
import { Document } from 'mongoose'
import {} from '@nestjs/mongoose'
import { UserObject } from 'src/modules/users/dto/user.object'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ObjectType()
export class RatingObject extends Document {
	@Field(() => ObjectIdScalar)
	_id: string

	@Field(() => UserObject, { nullable: true })
	user: UserObject

	@Field()
	type: string

	@Field()
	stars: number
}
