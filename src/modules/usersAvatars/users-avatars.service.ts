import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UsersAvatars } from './models/users-avatars.schema'
import { BaseMongoService } from '../common/services/common.mongo.service'
import { CreateUsersAvatarsInput } from './dto/create-users-avatars.input'
import { UpdateUsersAvatarsInput } from './dto/update-user-avatars.input'

@Injectable()
export class UsersAvatarsService extends BaseMongoService<
	UsersAvatars,
	CreateUsersAvatarsInput,
	UpdateUsersAvatarsInput
> {
	constructor(
		@InjectModel(UsersAvatars.name)
		private userModel: Model<UsersAvatars>
	) {
		super(userModel)
	}
}
