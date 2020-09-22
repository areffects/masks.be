import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateRatingInput } from './dto/create-rating.input'
import { InjectModel } from '@nestjs/mongoose'
import { BaseMongoService } from '../common/services/common.mongo.service'
import { UpdateRatingInput } from './dto/update-rating.input'
import { Rating } from './models/ratings.schema'

@Injectable()
export class RatingsService extends BaseMongoService<
	Rating,
	CreateRatingInput,
	UpdateRatingInput
> {
	constructor(
		@InjectModel(Rating.name)
		private ratingModel: Model<Rating>
	) {
		super(ratingModel)
	}
}
