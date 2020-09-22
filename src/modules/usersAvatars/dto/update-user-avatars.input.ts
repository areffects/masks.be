import { Field, InputType } from '@nestjs/graphql'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType()
export class UpdateUsersAvatarsInput {
	@Field(() => ObjectIdScalar)
	userId: string

	@Field()
	name: string

	@Field()
	url: string
}