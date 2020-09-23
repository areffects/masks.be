import { Field, InputType } from '@nestjs/graphql'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType('updateTransactionInput')
export class UpdateTransactionInput {
	@Field(() => ObjectIdScalar)
	userId: string

	@Field()
	type: string

	@Field()
	amount: number
}
