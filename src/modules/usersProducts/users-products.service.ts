import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UsersProductsModel } from './models/users-products.schema'
import { BaseMongoService } from '../common/services/mongo.service'
import { CreateUsersProductsInput } from './dto/create-users-products.input'
import { UpdateUsersProductsInput } from './dto/update-user-products.input'

@Injectable()
export class UsersProductsService extends BaseMongoService<
	UsersProductsModel,
	CreateUsersProductsInput,
	UpdateUsersProductsInput
> {
	constructor(
		@InjectModel(UsersProductsModel.name)
		private usersProductsModel: Model<UsersProductsModel>
	) {
		super(usersProductsModel)
	}
}
