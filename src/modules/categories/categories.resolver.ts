import { Resolver } from '@nestjs/graphql'
import { Categories } from './dto/categories.object'
import { UpdateCategoryInput } from './dto/update-category.input'
import BaseResolver from '../common/resolvers/common.resolver'
import { CategoriesArgs } from './dto/categories.args'
import { CreateCategoryInput } from './dto/create-category.input'
import { CategoriesService } from './categories.service'

@Resolver(() => Categories)
export class CategoriesResolver extends BaseResolver<
	Categories,
	CreateCategoryInput,
	UpdateCategoryInput,
	CategoriesArgs
>(Categories, CreateCategoryInput, UpdateCategoryInput, CategoriesArgs) {
	constructor(private readonly categoriesService: CategoriesService) {
		super(categoriesService)
	}
}
