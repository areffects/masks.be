import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { InjectModel } from '@nestjs/mongoose'
import { UserModel } from './models/users.schema'
import { BaseMongoService } from '../common/services/mongo.service'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService extends BaseMongoService<
	UserModel,
	CreateUserInput,
	UpdateUserInput
> {
	constructor(
		@InjectModel(UserModel.name)
		private userModel: Model<UserModel>
	) {
		super(userModel)
	}
}
