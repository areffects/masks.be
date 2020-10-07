import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { UsersAvatars } from 'src/modules/usersAvatars/dto/users-avatars.object'

@ObjectType()
export class User {
	@Field(() => ID)
	_id: string

	@Field()
	userName: string

	@Field()
	firstName: string

	@Field()
	lastName: string

	@Field()
	@IsEmail()
	email: string

	@Field()
	role: string

	@Field(() => UsersAvatars, { nullable: true })
	avatar: UsersAvatars

	@Field()
	status: string
}
