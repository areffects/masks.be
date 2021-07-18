import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ErrorObjectType {
	@Field()
	error: boolean

	@Field()
	message: string
}
