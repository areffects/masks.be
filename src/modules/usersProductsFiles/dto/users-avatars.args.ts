import { ArgsType, Field } from '@nestjs/graphql'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ArgsType()
export class UsersAvatarsArgs {
	@Field(() => ObjectIdScalar)
	userId: string

	@Field()
	name: string

	@Field()
	url: string
}
