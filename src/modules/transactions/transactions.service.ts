import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { ITransaction } from './interfaces/transactions.interface'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Transaction } from './transactions.schema'

@Injectable()
export class TransactionService {
	constructor(
		@InjectModel(Transaction.name) private transactionModel: Model<ITransaction>
	) {}

	async create(
		createTransactionDto: CreateTransactionDto
	): Promise<ITransaction> {
		const createdCat = new this.transactionModel(createTransactionDto)
		return createdCat.save()
	}

	async findAll(): Promise<ITransaction[]> {
		return this.transactionModel.find().exec()
	}
}
