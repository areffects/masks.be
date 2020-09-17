import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
	BadRequestException,
	UnauthorizedException,
	UsePipes
} from '@nestjs/common'
import { DATA } from '../common/constants/common'
import { ClassValidatorValidationPipe } from '../common/pipes/class-validator.validation.pipe'
import { CreateUserInput } from '../users/dto/create-user.input'
import { UserObject } from '../users/dto/user.object'
import { UsersService } from '../users/users.service'
import { TokenObject } from './dto/token.dto'
import { LoginUserObject } from './dto/login-user.dto'
import { AuthService } from './auth.service'

@Resolver(() => UserObject)
export class AuthResolver {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService
	) {}

	@Mutation(() => TokenObject, {
		name: `loginUser`
	})
	// @UseGuards(JwtAuthGuard)
	async login(
		@Args({ name: DATA, type: () => LoginUserObject }) user: LoginUserObject
	): Promise<TokenObject> {
		const checkedUser = await this.authService.checkUser(
			user.email,
			user.password
		)
		if (!checkedUser) {
			throw new UnauthorizedException('Invalid email or password!')
		}
		return this.authService.signUser(checkedUser)
	}

	@Mutation(() => UserObject, {
		name: `registerUser`
	})
	async register(
		@Args({ name: DATA, type: () => CreateUserInput })
		createData: CreateUserInput
	): Promise<UserObject> {
		const email = await this.usersService.findOne({ email: createData.email })
		if (email) {
			throw new BadRequestException({
				message: 'Email already registered!'
			})
		}
		const newUser = await this.usersService.create(createData)
		const { password, ...rest } = newUser.toJSON()
		return rest
	}
}
