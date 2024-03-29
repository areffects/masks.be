import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersAvatarsResolver } from './users-avatars.resolver'
import { UsersAvatarsService } from './users-avatars.service'
import {
	UsersAvatarsModel,
	UsersAvatarsSchema
} from './models/users-avatars.schema'
import { SharedModule } from '../shared/shared.module'

@Module({
	imports: [
		SharedModule,
		MongooseModule.forFeature([
			{
				name: UsersAvatarsModel.name,
				schema: UsersAvatarsSchema
			}
		])
	],
	providers: [UsersAvatarsResolver, UsersAvatarsService],
	exports: [UsersAvatarsService]
})
export class UsersAvatarsModule {}
