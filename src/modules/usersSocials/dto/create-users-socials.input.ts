import { Field, InputType } from '@nestjs/graphql'

import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType()
export class CreateUsersSocialsInput {
	@Field(() => ObjectIdScalar)
	userId: string

	@Field()
	name: string
}
