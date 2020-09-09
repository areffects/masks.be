import { Module } from '@nestjs/common'
import { TransactionService } from './transactions.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Transaction, TransactionSchema } from './transactions.schema'
import { TransactionController } from './transactions.controller'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Transaction.name, schema: TransactionSchema }
		])
	],
	controllers: [TransactionController],
	providers: [TransactionService]
})
export class TransactionsModule {}
