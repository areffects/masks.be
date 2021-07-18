import { Field, ObjectType } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'
import { User } from 'src/modules/users/dto/user.object'
import { UsersProducts } from 'src/modules/usersProducts/dto/users-products.object'

@ObjectType()
export class PaymentOrder {
	@Field(() => ObjectIdScalar)
	_id: Types.ObjectId

	@Field(() => User, { nullable: true })
	user: User

	@Field(() => UsersProducts, { nullable: true })
	product: UsersProducts

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}
