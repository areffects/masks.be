import { Injectable } from '@nestjs/common'
import { Document, FilterQuery, Model } from 'mongoose'
import { ObjectId } from '../constants/common'

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class BaseMongoService<T extends Document, C, U> {
	constructor(private readonly baseModel: Model<T>) {}

	async findAll(): Promise<T[]> {
		return this.baseModel.find().exec()
	}

	async findOne(data: FilterQuery<T>, select = {}): Promise<T> {
		return this.baseModel.findOne(data, select).exec()
	}

	async findOneById(id: string): Promise<T> {
		return this.baseModel.findById(new ObjectId(id))
	}

	async create(data: any): Promise<T> {
		return this.baseModel.create(data)
	}

	async update(id: string, data: U): Promise<T> {
		return this.baseModel.findByIdAndUpdate(new ObjectId(id), data).exec()
	}

	async delete(id: string): Promise<boolean> {
		const a = await this.baseModel.findByIdAndDelete(new ObjectId(id)).exec()
		return !!a
	}
}
export { BaseMongoService }
