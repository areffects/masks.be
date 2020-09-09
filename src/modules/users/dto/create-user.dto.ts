import {} from 'class-validator'

export class CreateUserDto {
	userName: string
	lastName: string
	email: string
	password: string
	role: string
	status: string
}
