import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	Inject
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { UserModel } from 'src/modules/users/models/users.schema'
import { AuthService } from '../auth.service'
import {
	INVALID_USER,
	USER_DOESNT_EXIST,
	TOKEN_DOESNT_EXIST,
	INVALID_TOKEN
} from '../constants/errors'
import { ROLES } from '../constants/roles.constants'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		@Inject(JwtService.name) private jwtService: JwtService,
		@Inject(AuthService.name) private authService: AuthService,
		private reflector: Reflector
	) {}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext().req
	}

	async canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<string[]>('roles', context.getHandler())
		if (!roles || !roles.length) {
			return true
		}

		const request = this.getRequest(context)
		if (!request.headers.authorization) {
			throw new UnauthorizedException(TOKEN_DOESNT_EXIST)
		}
		const validatedUser: UserModel = await this.validateUser(
			request.headers.authorization
		)

		request.user = validatedUser

		const findedUser: UserModel = await this.authService.findUserByEmail(
			validatedUser.email
		)
		if (!findedUser) {
			throw new UnauthorizedException(USER_DOESNT_EXIST)
		}

		if (
			findedUser.role !== validatedUser.role ||
			findedUser.status !== validatedUser.status
		) {
			throw new UnauthorizedException(INVALID_USER)
		}

		const user: UserModel = request.user
		const roleMatch = roles.includes(user.role)
		const isRoleAll = roles.includes(ROLES.ALL)
		return roleMatch || isRoleAll
	}

	async validateUser(auth: string) {
		const [bearer, token] = auth.split(' ')
		if (bearer !== 'Bearer') {
			throw new UnauthorizedException(INVALID_TOKEN)
		}
		try {
			return await this.jwtService.verify(token)
		} catch (err) {
			throw new UnauthorizedException(INVALID_TOKEN)
		}
	}
}
