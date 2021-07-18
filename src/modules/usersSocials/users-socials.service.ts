import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseMongoService } from '../common/services/mongo.service'
import { CreateUsersSocialsInput } from './dto/create-users-socials.input'
import { UpdateUsersSocialsInput } from './dto/update-users-socials.input'
import { UsersSocialsModel } from './models/users-socials.schema'
@Injectable()
export class UsersSocialsService extends BaseMongoService<
	UsersSocialsModel,
	CreateUsersSocialsInput,
	UpdateUsersSocialsInput
> {
	constructor(
		@InjectModel(UsersSocialsModel.name)
		private usersAvatarsModel: Model<UsersSocialsModel>
	) {
		super(usersAvatarsModel)
	}
}
