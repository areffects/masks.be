import BaseResolver from '../common/resolvers/common.resolver'
import { Resolver } from '@nestjs/graphql'
import { TransactionObject } from './dto/transactions.object'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'
import { TransactionsService } from './transactions.service'
import { TransactionsArgs } from './dto/transactions.args'

@Resolver(() => TransactionObject)
export class TransactionsResolver extends BaseResolver<
	TransactionObject,
	CreateTransactionInput,
	UpdateTransactionInput,
	TransactionsArgs
>(
	TransactionObject,
	CreateTransactionInput,
	UpdateTransactionInput,
	TransactionsArgs
) {
	constructor(private readonly transactionsService: TransactionsService) {
		super(transactionsService)
	}
}
