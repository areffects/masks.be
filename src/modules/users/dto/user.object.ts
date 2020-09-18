import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Document } from 'mongoose'
import {} from '@nestjs/mongoose'
import { IsEmail } from 'class-validator'

@ObjectType()
export class UserObject extends Document {
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
