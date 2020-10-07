import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsEnum, IsOptional, Length, Matches } from 'class-validator'
import { Roles } from '../enums/roles.enum'

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true })
	@IsOptional()
	@Length(0, 10)
	userName: string

	@Field({ nullable: true })
	@IsOptional()
	@Length(0, 20)
	firstName?: string

	@Field({ nullable: true })
	@IsOptional()
	@Length(0, 20)
	lastName?: string

	@Field({ nullable: true })
	@IsOptional()
	@IsEmail()
	email?: string

	@Field({ nullable: true })
	@IsOptional()
	@IsEnum(Roles)
	role?: string

	/*
	-	at least 8 characters
	- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
	- Can contain special characters
 */
	@Field({ nullable: true })
	@IsOptional()
	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/, {
		message:
			'Password must have from 8 to 20 characters and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!'
	})
	password?: string
}
