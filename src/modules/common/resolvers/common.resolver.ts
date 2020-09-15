import { Type } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Document } from 'mongoose'
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

		@Query(() => [classRef], { name: `findAll${classRef.name}` })
		async findAll(): Promise<T[]> {
			return this.baseService.findAll()
		}

		// @Query(() => classRef, { name: `findOne${classRef.name}` })
		// async findOne(
		// 	@Args({ name: 'data', type: () => classRef })
		// 	data
		// ): Promise<T> {
		// 	return this.baseService.findOne(data)
		// }

		@Query(() => classRef, { name: `findOneById${classRef.name}` })
		async findOneById(
			@Args({ name: 'id', type: () => String })
			id: string
		): Promise<T> {
			return this.baseService.findOneById(id)
		}

		@Mutation(() => classRef, {
			name: `create${classRef.name}`
		})
		async create(
			@Args({ name: 'data', type: () => createClassRef })
			createData: C
		): Promise<T> {
			return this.baseService.create(createData)
		}

		@Mutation(() => classRef, { name: `update${classRef.name}` })
		async update(
			@Args({ name: 'id', type: () => String }) id: string,
			@Args({ name: 'data', type: () => updateClassRef }) updateData: U
		): Promise<T> {
			return this.baseService.update(id, updateData)
		}

		@Mutation(() => Boolean, { name: `delete${classRef.name}` })
		async delete(
			@Args({ name: 'id', type: () => String }) id: string
		): Promise<boolean> {
			return this.baseService.delete(id)
		}
	}
	return BaseResolverHost
}
