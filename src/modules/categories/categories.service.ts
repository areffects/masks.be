import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Categories } from './models/categories.schema'
import { BaseMongoService } from '../common/services/mongo.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Injectable()
export class CategoriesService extends BaseMongoService<
	Categories,
	CreateCategoryInput,
	UpdateCategoryInput
> {
	constructor(
		@InjectModel(Categories.name)
		private categoriesModel: Model<Categories>
	) {
		super(categoriesModel)
	}
}
