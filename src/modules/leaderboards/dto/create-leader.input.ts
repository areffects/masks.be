import { Field, InputType } from '@nestjs/graphql'

import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'
import { RatingTypesEnum } from '../enums/types.enums'

@InputType()
export class CreateLeaderInput {
	@Field(() => ObjectIdScalar)
	userId: string

	@Field(() => RatingTypesEnum)
	type: RatingTypesEnum

	@Field()
	stars: number
}
