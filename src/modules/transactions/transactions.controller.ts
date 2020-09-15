import { Controller, Get } from '@nestjs/common'

@Controller('transactions')
export class TransactionsController {
	@Get()
	getHello(): string {
		console.log('3333333 :>> ', 5123)
		return 'hello world111111'
	}
}
