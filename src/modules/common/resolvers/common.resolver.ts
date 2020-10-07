import { UsePipes } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateQuery, Document } from 'mongoose'
import { AuthRoles } from 'src/modules/auth/decorators/roles.decorator'
import { Roles } from 'src/modules/users/enums/roles.enum'
import { DATA, ObjectId } from '../constants/common'
import { ClassValidatorValidationPipe } from '../pipes/class-validator.validation.pipe'
import { BaseMongoService } from '../services/mongo.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BaseResolver<T, C, U, ARG>(
	classRef: any,
	createClassRef: any,
	updateClassRef: any,
	argClassRef?: any,
	defaultRoles = [Roles.ADMIN, Roles.USER]
): any {
	@Resolver()
	abstract class BaseResolverHost {
		constructor(
			private readonly baseService: BaseMongoService<T & Document, C, U>
		) {}

		@Query(() => [classRef], { name: `findAll${classRef.name}` })
		@AuthRoles(...defaultRoles)
		async findAll(
			@Args({ type: () => argClassRef })
			data
		): Promise<T[]> {
			if (data._id) {
				data._id = new ObjectId(data._id)
			}
			return this.baseService.findAll(data)
		}

		@Query(() => classRef, { name: `findOne${classRef.name}` })
		@AuthRoles(...defaultRoles)
		async findOne(
			@Args({ type: () => argClassRef })
			data
		): Promise<T> {
			if (data._id) {
				data._id = new ObjectId(data._id)
			}
			return this.baseService.findOne(data)
		}

		@Query(() => classRef, { name: `findOneById${classRef.name}` })
		@AuthRoles(...defaultRoles)
		async findOneById(
			@Args({ name: 'id', type: () => String })
			id: string
		): Promise<T> {
			return this.baseService.findOneById(id)
		}

		@Mutation(() => classRef, {
			name: `create${classRef.name}`
		})
		@AuthRoles(...defaultRoles)
		@UsePipes(new ClassValidatorValidationPipe(createClassRef))
		async create(
			@Args({ name: DATA, type: () => createClassRef })
			createData: CreateQuery<C>
		): Promise<T> {
			return this.baseService.create(createData)
		}

		@Mutation(() => classRef, { name: `update${classRef.name}` })
		@UsePipes(new ClassValidatorValidationPipe(updateClassRef))
		@AuthRoles(...defaultRoles)
		async update(
			@Args({ name: 'id', type: () => String }) id: string,
			@Args({ name: DATA, type: () => updateClassRef }) updateData: U
		): Promise<T> {
			return this.baseService.update(id, updateData)
		}

		@Mutation(() => Boolean, { name: `delete${classRef.name}` })
		@AuthRoles(...defaultRoles)
		async delete(
			@Args({ name: 'id', type: () => String }) id: string
		): Promise<boolean> {
			return this.baseService.delete(id)
		}
	}
	return BaseResolverHost
}
