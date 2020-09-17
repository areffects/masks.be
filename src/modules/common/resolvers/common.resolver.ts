import { Type, UsePipes } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'
import { Document } from 'mongoose'
import { CreateUserInput } from 'src/modules/users/dto/create-user.input'
import { UserObject } from 'src/modules/users/dto/user.object'
import { DATA } from '../constants/common'
import { ClassValidatorValidationPipe } from '../pipes/class-validator.validation.pipe'
import { BaseMongoService } from '../services/common.mongo.service'

export default function BaseResolver<T, C, U>(
	classRef: any,
	createClassRef: any,
	updateClassRef: any
): any {
	@Resolver()
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
		@UsePipes(new ClassValidatorValidationPipe(createClassRef))
		async create(
			@Args({ name: DATA, type: () => createClassRef })
			createData: C
		): Promise<T> {
			return this.baseService.create(createData)
		}

		@Mutation(() => classRef, { name: `update${classRef.name}` })
		@UsePipes(new ClassValidatorValidationPipe(updateClassRef))
		async update(
			@Args({ name: 'id', type: () => String }) id: string,
			@Args({ name: DATA, type: () => updateClassRef }) updateData: U
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
