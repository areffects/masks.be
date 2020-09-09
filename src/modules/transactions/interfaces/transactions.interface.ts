import { Document } from 'mongoose'

export interface ITransaction extends Document {
	readonly user_id: number
	readonly type: string
	readonly amount: number
}
