import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CategoriesModel } from './models/categories.schema'
import { BaseMongoService } from '../common/services/mongo.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Injectable()
export class CategoriesService extends BaseMongoService<
	CategoriesModel,
	CreateCategoryInput,
	UpdateCategoryInput
> {
	constructor(
		@InjectModel(CategoriesModel.name)
		private categoriesModel: Model<CategoriesModel>
	) {
		super(categoriesModel)
	}
}
