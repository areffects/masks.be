import { Field, InputType } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType('createTransactionInput')
export class CreateTransactionInput {
	@Field(() => ObjectIdScalar)
	userId: Types.ObjectId

	@Field()
	type: string

	@Field()
	amount: number
}
