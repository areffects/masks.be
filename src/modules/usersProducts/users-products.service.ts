import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UsersProducts } from './models/users-products.schema'
import { BaseMongoService } from '../common/services/mongo.service'
import { CreateUsersProductsInput } from './dto/create-users-products.input'
import { UpdateUsersProductsInput } from './dto/update-user-products.input'

@Injectable()
export class UsersProductsService extends BaseMongoService<
	UsersProducts,
	CreateUsersProductsInput,
	UpdateUsersProductsInput
> {
	constructor(
		@InjectModel(UsersProducts.name)
		private usersProductsModel: Model<UsersProducts>
	) {
		super(usersProductsModel)
	}
}
