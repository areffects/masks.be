import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { CustomJwtModule } from './jwt.module'
import { RolesGuard } from './guards/roles.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
	imports: [CustomJwtModule],
	providers: [
		AuthService,
		AuthResolver,
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		}
	],
	exports: [AuthService, CustomJwtModule]
})
export class AuthModule {}
