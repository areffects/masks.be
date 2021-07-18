import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseMongoService } from '../common/services/mongo.service'
import { UpdateUsersProductsScreenshotsInput } from './dto/update-users-products-screenshots.input'
import { UsersProductsScreenshotsModel } from './models/users-products-screenshots.schema'
import { CreateUsersProductsScreenshotsInput } from './dto/create-users-products-screenshots.input'

@Injectable()
export class UsersProductsScreenshotsService extends BaseMongoService<
	UsersProductsScreenshotsModel,
	CreateUsersProductsScreenshotsInput,
	UpdateUsersProductsScreenshotsInput
> {
	constructor(
		@InjectModel(UsersProductsScreenshotsModel.name)
		private usersProductsScreenshotsModel: Model<UsersProductsScreenshotsModel>
	) {
		super(usersProductsScreenshotsModel)
	}
}
