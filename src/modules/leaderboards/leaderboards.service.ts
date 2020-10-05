import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateLeaderInput } from './dto/create-leader.input'
import { InjectModel } from '@nestjs/mongoose'
import { BaseMongoService } from '../common/services/mongo.service'
import { UpdateLeaderInput } from './dto/update-leader.input'
import { LeaderboardModel } from './models/leaderboards.schema'

@Injectable()
export class LeaderboardsService extends BaseMongoService<
	LeaderboardModel,
	CreateLeaderInput,
	UpdateLeaderInput
> {
	constructor(
		@InjectModel(LeaderboardModel.name)
		private leaderboardModel: Model<LeaderboardModel>
	) {
		super(leaderboardModel)
	}
}
