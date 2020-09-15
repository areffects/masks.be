import { Controller, Get } from '@nestjs/common'

@Controller('transactions')
export class TransactionsController {
	@Get()
	getHello(): string {
		return 'hello world111111'
	}
}
