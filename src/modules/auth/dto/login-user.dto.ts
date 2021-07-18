import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginUserObject {
	@Field()
	email: string

	@Field()
	password: string
}
