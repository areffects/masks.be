import { Field, InputType } from '@nestjs/graphql'

import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType()
export class CreateRatingInput {
	@Field(() => ObjectIdScalar)
	userId: string

	@Field()
	type: string

	@Field()
	stars: number
}
