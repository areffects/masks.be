import { IsString, IsNumber } from 'class-validator'

export class UpdateTransactionDto {
	@IsString()
	userId: string

	@IsString()
	type: string

	@IsNumber()
	amount: number

	@IsNumber()
	balance: number
}
