import { Field, InputType } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType('updateTransactionInput')
export class UpdateTransactionInput {
	@Field(() => ObjectIdScalar)
	userId: Types.ObjectId

	@Field()
	type: string

	@Field()
	amount: number
}
