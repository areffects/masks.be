import { Module } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { MongooseModule } from '@nestjs/mongoose'
import {
	TransactionModel,
	TransactionSchema
} from './models/transactions.schema'
import { TransactionsResolver } from './transactions.resolver'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TransactionModel.name, schema: TransactionSchema }
		])
	],
	providers: [TransactionsResolver, TransactionsService]
})
export class TransactionsModule {}
