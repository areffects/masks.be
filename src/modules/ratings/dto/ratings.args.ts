import { ArgsType, Field } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ArgsType()
export class RatingArgs {
	@Field(() => ObjectIdScalar, { nullable: true })
	_id: Types.ObjectId

	@Field(() => ObjectIdScalar, { nullable: true })
	userId: Types.ObjectId

	@Field({ nullable: true })
	type: string

	@Field({ nullable: true })
	stars: number
}
