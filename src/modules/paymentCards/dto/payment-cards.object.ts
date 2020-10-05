import { Field, ObjectType } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'
import { User } from 'src/modules/users/dto/user.object'

@ObjectType()
export class PaymentCards {
	@Field(() => ObjectIdScalar)
	_id: Types.ObjectId

	@Field(() => User, { nullable: true })
	user: User

	@Field()
	numbers: string

	@Field()
	pin: string

	@Field()
	date: string
}
