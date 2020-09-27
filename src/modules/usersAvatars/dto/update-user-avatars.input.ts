import { Field, InputType } from '@nestjs/graphql'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@InputType()
export class UpdateUsersAvatarsInput {
	@Field(() => ObjectIdScalar, { nullable: true })
	userId: string

	@Field({ nullable: true })
	name: string
}
