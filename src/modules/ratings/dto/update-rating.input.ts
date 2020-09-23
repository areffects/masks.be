import { Field, InputType } from '@nestjs/graphql'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType()
export class UpdateRatingInput {
	@Field(() => ObjectIdScalar)
	userId: string

	@Field()
	type: string

	@Field()
	stars: number
}
