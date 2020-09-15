import { NotFoundException, Type } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { Document } from 'mongoose'
import { AuthenticationError, PubSub } from 'apollo-server-express'
import { TransactionModel } from './models/transactions.model'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'

import BaseResolver from '../common/resolvers/common.resolver'
import { TransactionsService } from './transactions.service'

@Resolver((of) => TransactionModel)
export class TransactionsResolver extends BaseResolver<
	Type<TransactionModel>,
	Type<CreateTransactionInput>,
	Type<UpdateTransactionInput>
>(TransactionModel, CreateTransactionInput, UpdateTransactionInput) {
	constructor(private readonly transactionsService: TransactionsService) {
		super(transactionsService)
	}
}
