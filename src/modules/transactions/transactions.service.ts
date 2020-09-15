import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { InjectModel } from '@nestjs/mongoose'
import { Transaction } from './models/transactions.schema'
import { TransactionObject } from './dto/transactions.object'
import { BaseMongoService } from '../common/services/common.mongo.service'
import { UpdateTransactionInput } from './dto/update-transaction.input'

@Injectable()
export class TransactionsService extends BaseMongoService<
	TransactionObject,
	CreateTransactionInput,
	UpdateTransactionInput
> {
	constructor(
		@InjectModel(Transaction.name)
		private transactionModel: Model<TransactionObject>
	) {
		super(transactionModel)
	}
}
