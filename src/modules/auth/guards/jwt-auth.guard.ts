import {
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(@Inject(JwtService.name) private jwtService: JwtService) {
		super()
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext().req
	}

	async canActivate(context: ExecutionContext) {
		const request = this.getRequest(context)
		if (!request.headers.authorization) {
			return false
		}
		request.user = await this.validateUser(request.headers.authorization)
		return true
	}

	async validateUser(auth: string) {
		const [bearer, token] = auth.split(' ')
		if (bearer !== 'Bearer') {
			throw new UnauthorizedException('Invalid token')
		}
		try {
			return await this.jwtService.verify(token)
		} catch (err) {
			throw new UnauthorizedException('Invalid token')
		}
	}
}
