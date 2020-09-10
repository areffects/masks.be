import { IsString, IsDefined, IsNumber } from 'class-validator'

export class CreateTransactionDto {
	@IsDefined()
	@IsString()
	userId: string

	@IsDefined()
	@IsString()
	type: string

	@IsDefined()
	@IsNumber()
	amount: number

	@IsDefined()
	@IsNumber()
	balance: number
}
