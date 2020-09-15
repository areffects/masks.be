import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { InjectModel } from '@nestjs/mongoose'
import { Transaction } from './users.schema'
import { Transaction as TransactionModel } from './models/transactions.model'
import { BaseMongoService } from '../common/services/common.mongo.service'
import { UpdateTransactionInput } from './dto/update-transaction.input'

@Injectable()
export class UsersService extends BaseMongoService<
	UserModel,
	CreateTransactionInput,
	UpdateTransactionInput
> {
	constructor(
		@InjectModel(Transaction.name)
		private transactionModel: Model<TransactionModel>
	) {
		super(transactionModel)
	}
}
