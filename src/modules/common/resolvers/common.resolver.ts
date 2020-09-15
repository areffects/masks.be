import { Type } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Document, Model } from 'mongoose'
import { BaseMongoService } from '../services/common.mongo.service'

export default function BaseResolver<
	T extends Type<unknown>,
	C extends Type<unknown>,
	U extends Type<unknown>
>(classRef: T, createClassRef?: C, updateClassRef?: U): any {
	@Resolver({ isAbstract: true })
	abstract class BaseResolverHost {
		constructor(
			private readonly baseService: BaseMongoService<T & Document, C, U>
		) {}

		@Query((type) => [classRef], { name: `findAll${classRef.name}` })
		async findAll(): Promise<T[]> {
			return this.baseService.findAll()
		}

		@Query((type) => classRef, { name: `findOne${classRef.name}` })
		async findOne(): Promise<T> {
			return this.baseService.findOne()
		}

		@Mutation((type) => classRef, {
			name: `create${classRef.name}`
		})
		async create(
			@Args({ name: 'data', type: () => createClassRef })
			createData: C
		): Promise<T> {
			return this.baseService.create(createData)
		}

		@Mutation((returns) => classRef, { name: `update${classRef.name}` })
		async update(
			@Args({ name: 'id', type: () => String }) id: string,
			@Args({ name: 'data', type: () => updateClassRef }) updateData: U
		): Promise<T> {
			return this.baseService.update(id, updateData)
		}

		@Mutation((returns) => classRef, { name: `delete${classRef.name}` })
		async delete(@Args('id') id: string): Promise<T> {
			return this.baseService.delete(id)
		}
	}
	return BaseResolverHost
}
