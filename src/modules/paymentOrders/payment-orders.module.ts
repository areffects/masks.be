import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersProductsModule } from '../usersProducts/users-products.module'
import {
	PaymentOrdersModel,
	PaymentOrdersSchema
} from './models/payment-orders.schema'
import { PaymentOrdersResolver } from './payment-orders.resolver'
import { PaymentOrdersService } from './payment-orders.service'

@Module({
	imports: [
		UsersProductsModule,
		MongooseModule.forFeature([
			{
				name: PaymentOrdersModel.name,
				schema: PaymentOrdersSchema
			}
		])
	],
	providers: [PaymentOrdersResolver, PaymentOrdersService]
})
export class PaymentOrdersModule {}
