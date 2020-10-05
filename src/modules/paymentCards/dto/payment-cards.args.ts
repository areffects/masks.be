import { ArgsType, Field } from '@nestjs/graphql'
import { Length } from 'class-validator'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ArgsType()
export class PaymentCardsArgs {
	@Field(() => ObjectIdScalar, { nullable: true })
	_id: Types.ObjectId

	@Field({ nullable: true })
	@Length(0, 16)
	numbers: string

	@Field({ nullable: true })
	@Length(0, 4)
	pin: string

	@Field({ nullable: true })
	@Length(0, 10)
	date: string
}
