import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { RatingObject } from './dto/ratings.object'
import { CreateRatingInput } from './dto/create-rating.input'
import { UpdateRatingInput } from './dto/update-rating.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { RatingsService } from './ratings.service'
import { UserObject } from '../users/dto/user.object'
import { UsersService } from '../users/users.service'
import { Rating } from './models/ratings.schema'
import { RatingArgs } from './dto/ratings.args'

@Resolver(() => RatingObject)
export class RatingsResolver extends BaseResolver<
	RatingObject,
	CreateRatingInput,
	UpdateRatingInput,
	RatingArgs
>(RatingObject, CreateRatingInput, UpdateRatingInput, RatingArgs) {
	constructor(
		private readonly usersService: UsersService,
		private readonly ratingsService: RatingsService
	) {
		super(ratingsService)
	}

	@ResolveField('user', () => UserObject)
	async getUser(@Parent() rating: Rating): Promise<UserObject> {
		return this.usersService.findOneById(rating.userId)
	}
}
