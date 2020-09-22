import { compareSync } from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UserObject } from '../users/dto/user.object'
import { TokenObject } from './dto/token.dto'
import { User } from '../users/models/users.schema'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async findUserByEmail(email: string): Promise<User> {
		return this.usersService.findOne({
			email
		})
	}

	async checkUser(email: string, password: string): Promise<UserObject> {
		const user = await this.findUserByEmail(email)
		if (user) {
			if (compareSync(password, user.password)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password, ...result } = user.toJSON()
				return result
			}
		}
		return null
	}

	async signUser(user: any): Promise<TokenObject> {
		const token = await this.jwtService.sign(user)
		return {
			token
		}
	}
}
