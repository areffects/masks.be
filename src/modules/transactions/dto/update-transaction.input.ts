import { Field, InputType } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType('updateTransactionInput')
export class UpdateTransactionInput {
	@Field(() => ObjectIdScalar, { nullable: true })
	userId: Types.ObjectId

	@Field({ nullable: true })
	type: string

	@Field({ nullable: true })
	amount: number
}
