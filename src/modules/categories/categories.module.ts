import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesService } from './categories.service'
import { Categories, CategoriesSchema } from './models/categories.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Categories.name, schema: CategoriesSchema }
		])
	],
	providers: [CategoriesResolver, CategoriesService],
	exports: [CategoriesService]
})
export class CategoriesModule {}
