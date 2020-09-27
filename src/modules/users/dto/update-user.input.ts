import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length, Matches } from 'class-validator'

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true })
	@Length(0, 20)
	firstName: string

	@Field({ nullable: true })
	@Length(0, 20)
	lastName: string

	@Field({ nullable: true })
	@IsEmail()
	email: string

	/*
	-	at least 8 characters
	- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
	- Can contain special characters
 */
	@Field({ nullable: true })
	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/)
	password: string
}
