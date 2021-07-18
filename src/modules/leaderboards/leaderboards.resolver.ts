import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Leaderboard } from './dto/leaderboard.object'
import { CreateLeaderInput } from './dto/create-leader.input'
import { UpdateLeaderInput } from './dto/update-leader.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { User } from '../users/dto/user.object'
import { UsersService } from '../users/users.service'
import { LeaderboardModel } from './models/leaderboards.schema'
import { LeaderArgs } from './dto/leader.args'
import { AuthRoles } from '../auth/decorators/roles.decorator'
import { LeaderboardsService } from './leaderboards.service'
import { UserModel } from '../users/models/users.schema'
import { Roles } from '../users/enums/roles.enum'

@Resolver(() => Leaderboard)
export class LeaderboardsResolver extends BaseResolver<
	Leaderboard,
	CreateLeaderInput,
	UpdateLeaderInput,
	LeaderArgs
>(Leaderboard, CreateLeaderInput, UpdateLeaderInput, LeaderArgs) {
	constructor(
		private readonly usersService: UsersService,
		private readonly leaderboardsService: LeaderboardsService
	) {
		super(leaderboardsService)
	}

	@ResolveField('user', () => User)
	@AuthRoles(Roles.ADMIN, Roles.USER)
	async getUser(@Parent() leaderboard: LeaderboardModel): Promise<UserModel> {
		return this.usersService.findOneById(leaderboard.userId)
	}
}
