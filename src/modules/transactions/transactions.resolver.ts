import BaseResolver from '../common/resolvers/common.resolver'
import { Resolver } from '@nestjs/graphql'
import { Transaction } from './dto/transactions.object'
import { CreateTransactionInput } from './dto/create-transaction.input'
import { UpdateTransactionInput } from './dto/update-transaction.input'
import { TransactionsService } from './transactions.service'
import { TransactionsArgs } from './dto/transactions.args'

@Resolver(() => Transaction)
export class TransactionsResolver extends BaseResolver<
	Transaction,
	CreateTransactionInput,
	UpdateTransactionInput,
	TransactionsArgs
>(
	Transaction,
	CreateTransactionInput,
	UpdateTransactionInput,
	TransactionsArgs
) {
	constructor(private readonly transactionsService: TransactionsService) {
		super(transactionsService)
	}
}
