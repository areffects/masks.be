import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseMongoService } from '../common/services/mongo.service'
import { CreateUsersAvatarsInput } from './dto/create-users-avatars.input'
import { UpdateUsersAvatarsInput } from './dto/update-user-avatars.input'
import { UsersAvatarsModel } from './models/users-avatars.schema'
@Injectable()
export class UsersAvatarsService extends BaseMongoService<
	UsersAvatarsModel,
	CreateUsersAvatarsInput,
	UpdateUsersAvatarsInput
> {
	constructor(
		@InjectModel(UsersAvatarsModel.name)
		private usersAvatarsModel: Model<UsersAvatarsModel>
	) {
		super(usersAvatarsModel)
	}
}
