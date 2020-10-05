import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
	LeaderboardModel,
	LeaderboardSchema
} from './models/leaderboards.schema'
import { LeaderboardsResolver } from './leaderboards.resolver'
import { LeaderboardsService } from './leaderboards.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: LeaderboardModel.name, schema: LeaderboardSchema }
		])
	],
	providers: [LeaderboardsResolver, LeaderboardsService]
})
export class LeaderboardsModule {}
