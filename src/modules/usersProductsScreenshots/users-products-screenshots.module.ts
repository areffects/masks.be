import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
	UsersProductsScreenshotsModel,
	UsersProductsScreenshotsSchema
} from './models/users-products-screenshots.schema'
import { SharedModule } from '../shared/shared.module'
import { UsersProductsScreenshotsResolver } from './users-products-screenshots.resolver'
import { UsersProductsScreenshotsService } from './users-products-screenshots.service'

@Module({
	imports: [
		SharedModule,
		MongooseModule.forFeature([
			{
				name: UsersProductsScreenshotsModel.name,
				schema: UsersProductsScreenshotsSchema
			}
		])
	],
	providers: [UsersProductsScreenshotsResolver, UsersProductsScreenshotsService]
})
export class UsersProductsScreenshotsModule {}
