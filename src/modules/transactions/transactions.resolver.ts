import { Type } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { TransactionObject } from './dto/transactions.object'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'

import BaseResolver from '../common/resolvers/common.resolver'
import { TransactionsService } from './transactions.service'

@Resolver(() => TransactionObject)
export class TransactionsResolver extends BaseResolver<
	Type<TransactionObject>,
	Type<CreateTransactionInput>,
	Type<UpdateTransactionInput>
>(TransactionObject, CreateTransactionInput, UpdateTransactionInput) {
	constructor(private readonly transactionsService: TransactionsService) {
		super(transactionsService)
	}
}
