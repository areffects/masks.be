import { Document, Model } from 'mongoose'

abstract class BaseMongoService<T extends Document, C, U> {
	constructor(private readonly baseModel: Model<T>) {}

	async findAll(): Promise<T[]> {
		return this.baseModel.find().exec()
	}

	async findOne(): Promise<T> {
		return this.baseModel.findOne().exec()
	}

	async findOneById(id: string): Promise<T> {
		return this.baseModel.findById(id).exec()
	}

	async delete(id: string): Promise<T> {
		return this.baseModel.findByIdAndDelete(id).exec()
	}

	async update(id: string, data: U): Promise<T> {
		return this.baseModel.findByIdAndUpdate(id, data).exec()
	}

	async create(data: C): Promise<T> {
		console.log(data)
		const createdCat = new this.baseModel(data)
		return createdCat.save()
	}
}
export { BaseMongoService }
