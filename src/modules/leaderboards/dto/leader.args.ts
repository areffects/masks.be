import { ArgsType, Field } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'
import { RatingTypesEnum } from '../enums/types.enums'

@ArgsType()
export class LeaderArgs {
	@Field(() => ObjectIdScalar, { nullable: true })
	_id: Types.ObjectId

	@Field(() => ObjectIdScalar, { nullable: true })
	userId: Types.ObjectId

	@Field(() => RatingTypesEnum, { nullable: true })
	type: RatingTypesEnum

	@Field({ nullable: true })
	stars: number
}
