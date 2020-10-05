import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
	UsersProductsModel,
	UsersProductsSchema
} from './models/users-products.schema'
import { UsersProductsResolver } from './users-products.resolver'
import { UsersProductsService } from './users-products.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: UsersProductsModel.name, schema: UsersProductsSchema }
		])
	],
	providers: [UsersProductsResolver, UsersProductsService],
	exports: [UsersProductsService]
})
export class UsersProductsModule {}
