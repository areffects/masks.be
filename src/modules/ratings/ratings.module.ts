import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { Rating, RatingSchema } from './models/ratings.schema'
import { RatingsResolver } from './ratings.resolver'
import { RatingsService } from './ratings.service'

@Module({
	imports: [
		UsersModule,
		MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])
	],
	providers: [RatingsResolver, RatingsService]
})
export class RatingsModule {}
