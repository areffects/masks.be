import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length, Matches } from 'class-validator'

@InputType()
export class CreateUserInput {
	@Field({ nullable: true })
	@Length(0, 10)
	userName: string

	@Field()
	@Length(0, 20)
	firstName: string

	@Field()
	@Length(0, 20)
	lastName: string

	@Field()
	@IsEmail()
	email: string

	/*
	-	at least 8 characters
	- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
	- Can contain special characters
 	*/
	@Field()
	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/)
	password?: string
}
