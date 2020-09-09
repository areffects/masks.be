import { IsString, IsNumber } from 'class-validator'

export class UpdateTransactionDto {
	@IsString()
	user_id: string

	@IsString()
	type: string

	@IsNumber()
	amount: number

	@IsNumber()
	balance: number
}
