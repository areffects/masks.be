import { ArgsType, Field } from '@nestjs/graphql'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ArgsType()
export class UsersAvatarsArgs {
	@Field(() => ObjectIdScalar, { nullable: true })
	userId: string

	@Field({ nullable: true })
	name: string

	@Field({ nullable: true })
	url: string
}
