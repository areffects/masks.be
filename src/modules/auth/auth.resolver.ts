import { Args, Query, Mutation, Resolver } from '@nestjs/graphql'
import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { DATA } from '../common/constants/common'
import { CreateUserInput } from '../users/dto/create-user.input'
import { User } from '../users/dto/user.object'
import { UsersService } from '../users/users.service'
import { TokenObject } from './dto/token.dto'
import { LoginUserObject } from './dto/login-user.dto'
import { AuthService } from './auth.service'
import { INVALID_EMAIL } from './constants/errors'
import { CurrentUser } from './decorators/current-user.decorator'
import { UserModel } from '../users/models/users.schema'
import { AuthRoles } from './decorators/roles.decorator'
import { ROLES } from './constants/roles.constants'

@Resolver(() => User)
export class AuthResolver {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService
	) {}

	@Mutation(() => TokenObject, {
		name: `loginUser`
	})
	async login(
		@Args({ name: DATA, type: () => LoginUserObject }) user: LoginUserObject
	): Promise<TokenObject> {
		const checkedUser = await this.authService.checkUser(
			user.email,
			user.password
		)
		if (!checkedUser) {
			throw new UnauthorizedException(INVALID_EMAIL)
		}
		return this.authService.signUser(checkedUser)
	}

	@Mutation(() => User, {
		name: `registerUser`
	})
	async register(
		@Args({ name: DATA, type: () => CreateUserInput })
		createData: CreateUserInput
	): Promise<User> {
		const email = await this.usersService.findOne({ email: createData.email })
		if (email) {
			throw new BadRequestException('Email already registered!')
		}
		const newUser = await this.usersService.create(createData)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = newUser.toJSON()
		return rest
	}
}
