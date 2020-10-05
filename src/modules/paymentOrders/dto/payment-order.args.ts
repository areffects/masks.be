import { ArgsType, Field } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ArgsType()
export class PaymentOrderArgs {
	@Field(() => ObjectIdScalar, { nullable: true })
	_id: Types.ObjectId

	@Field({ nullable: true })
	userId: string

	@Field({ nullable: true })
	productId: string
}
