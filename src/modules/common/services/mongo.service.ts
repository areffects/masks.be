import { Injectable } from '@nestjs/common'
import { CreateQuery, Document, Model } from 'mongoose'
import { ObjectId } from '../constants/common'

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class BaseMongoService<T extends Document, C, U> {
	constructor(private readonly baseModel: Model<T>) {}

	async findAll(data: any, ...props): Promise<T[]> {
		if (data._id) {
			data._id = new ObjectId(data._id)
		}
		return this.baseModel.find(data, ...props).exec()
	}

	async findOne(data: any, ...props): Promise<T> {
		if (data._id) {
			data._id = new ObjectId(data._id)
		}
		return this.baseModel.findOne(data, ...props).exec()
	}

	async findOneById(id: string, ...props): Promise<T> {
		return this.baseModel.findById(new ObjectId(id), ...props)
	}

	async create(data: CreateQuery<C>, ...props): Promise<T> {
		return this.baseModel.create(data, ...props)
	}

	async update(id: string, data: U, ...props): Promise<T> {
		return this.baseModel
			.findByIdAndUpdate(new ObjectId(id), data, ...props)
			.exec()
	}

	async delete(id: string, ...props): Promise<boolean> {
		const a = await this.baseModel
			.findByIdAndDelete(new ObjectId(id), ...props)
			.exec()
		return !!a
	}

	async deleteAll(ids: string[], ...props): Promise<boolean> {
		const a = await this.baseModel
			.deleteMany(
				{ _id: { $in: ids.map((id) => new ObjectId(id)) } } as any,
				...props
			)
			.exec()
		return !!a
	}
}
export { BaseMongoService }
