import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@ObjectType()
export class UserObject {
	@Field(() => ID)
	_id: string

	@Field()
	userName: string

	@Field()
	lastName: string

	@Field()
	@IsEmail()
	email: string

	@Field()
	password: string

	@Field()
	role: string

	@Field({ nullable: true })
	avatarId: string

	@Field()
	status: string
}
