import { Model } from 'mongoose'
import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common'
import { ITransaction } from './interfaces/transactions.interface'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Transaction } from './transactions.schema'

@Controller('transactions')
export class TransactionController {
	constructor(
		@InjectModel(Transaction.name) private transactionModel: Model<ITransaction>
	) {}

	@Get()
	async getAll(): Promise<ITransaction[]> {
		return this.transactionModel.find()
	}

	@Get(':id')
	async getOne(): Promise<ITransaction> {
		return this.transactionModel.findOne()
	}

	@Post()
	async create(
		@Body() body: CreateTransactionDto
	): Promise<ITransaction | any> {
		const createdCat = new this.transactionModel(body)
		return createdCat.save()
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateTransactionDto
	): Promise<ITransaction> {
		return this.transactionModel.updateOne({ _id: id }, body)
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<any> {
		return this.transactionModel.deleteOne({ _id: id })
	}
}
