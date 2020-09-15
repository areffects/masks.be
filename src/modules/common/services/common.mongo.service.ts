import { Injectable } from '@nestjs/common'
import { Document, FilterQuery, Model, Types } from 'mongoose'
import { ObjectId } from '../constants/common'

@Injectable()
abstract class BaseMongoService<T extends Document, C, U> {
	constructor(private readonly baseModel: Model<T>) {}

	async findAll(): Promise<T[]> {
		return this.baseModel.find().exec()
	}

	async findOne(data: FilterQuery<T>): Promise<T> {
		return this.baseModel.findOne(data).exec()
	}

	async findOneById(id: string): Promise<T> {
		return this.baseModel.findById(new ObjectId(id)).exec()
	}

	async create(data: C): Promise<T> {
		const created = new this.baseModel(data)
		return created.save()
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
