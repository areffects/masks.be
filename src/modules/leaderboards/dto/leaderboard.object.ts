import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/modules/users/dto/user.object'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ObjectType()
export class Leaderboard {
	@Field(() => ObjectIdScalar)
	_id: string

	@Field(() => User, { nullable: true })
	user: User

	@Field()
	type: string

	@Field()
	stars: number
}
