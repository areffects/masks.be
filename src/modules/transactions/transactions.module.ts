import { Module } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Transaction, TransactionSchema } from './models/transactions.schema'
import { TransactionsResolver } from './transactions.resolver'
import { TransactionsController } from './transactions.controller'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Transaction.name, schema: TransactionSchema }
		])
	],
	controllers: [TransactionsController],
	providers: [TransactionsResolver, TransactionsService]
})
export class TransactionsModule {}
