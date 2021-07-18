import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SharedModule } from '../shared/shared.module'
import {
	UsersSocialsModel,
	UsersSocialsSchema
} from './models/users-socials.schema'
import { UsersSocialsResolver } from './users-socials.resolver'
import { UsersSocialsService } from './users-socials.service'

@Module({
	imports: [
		SharedModule,
		MongooseModule.forFeature([
			{
				name: UsersSocialsModel.name,
				schema: UsersSocialsSchema
			}
		])
	],
	providers: [UsersSocialsResolver, UsersSocialsService]
})
export class UsersSocialsModule {}
