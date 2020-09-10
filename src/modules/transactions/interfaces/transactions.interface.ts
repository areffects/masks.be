import { Document } from 'mongoose'

export interface ITransaction extends Document {
	readonly userId: string
	readonly type: string
	readonly amount: number
	readonly balance: number
}
