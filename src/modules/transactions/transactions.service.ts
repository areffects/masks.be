import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { InjectModel } from '@nestjs/mongoose'
import { Transaction } from './models/transactions.schema'
import { BaseMongoService } from '../common/services/common.mongo.service'
import { UpdateTransactionInput } from './dto/update-transaction.input'

@Injectable()
export class TransactionsService extends BaseMongoService<
	Transaction,
	CreateTransactionInput,
	UpdateTransactionInput
> {
	constructor(
		@InjectModel(Transaction.name)
		private transactionModel: Model<Transaction>
	) {
		super(transactionModel)
	}
}
