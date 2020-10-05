import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { InjectModel } from '@nestjs/mongoose'
import { TransactionModel } from './models/transactions.schema'
import { BaseMongoService } from '../common/services/mongo.service'
import { UpdateTransactionInput } from './dto/update-transaction.input'

@Injectable()
export class TransactionsService extends BaseMongoService<
	TransactionModel,
	CreateTransactionInput,
	UpdateTransactionInput
> {
	constructor(
		@InjectModel(TransactionModel.name)
		private transactionModel: Model<TransactionModel>
	) {
		super(transactionModel)
	}
}
