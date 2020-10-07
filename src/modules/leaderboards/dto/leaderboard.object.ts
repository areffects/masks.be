import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/modules/users/dto/user.object'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'
import { RatingTypesEnum } from '../enums/types.enums'

@ObjectType()
export class Leaderboard {
	@Field(() => ObjectIdScalar)
	_id: string

	@Field(() => User, { nullable: true })
	user: User

	@Field(() => RatingTypesEnum)
	type: RatingTypesEnum

	@Field()
	stars: number
}
