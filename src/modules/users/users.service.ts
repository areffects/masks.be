import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './models/users.schema'
import { UserObject } from './dto/user.object'
import { BaseMongoService } from '../common/services/common.mongo.service'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService extends BaseMongoService<
	UserObject,
	CreateUserInput,
	UpdateUserInput
> {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<UserObject>
	) {
		super(userModel)
	}
}
