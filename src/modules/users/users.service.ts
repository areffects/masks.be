import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './models/users.schema'
import { BaseMongoService } from '../common/services/mongo.service'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService extends BaseMongoService<
	User,
	CreateUserInput,
	UpdateUserInput
> {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<User>
	) {
		super(userModel)
	}
}
