import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UserObject } from '../users/dto/user.object'
import { TokenObject } from './dto/token.dto'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async checkUser(email: string, password: string): Promise<UserObject> {
		const user = await this.usersService.findOne({
			email,
			password
		})
		if (user && user.password === password) {
			const { password, ...result } = user.toJSON()
			return result
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
