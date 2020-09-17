import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { CustomJwtModule } from './jwt.module'

@Module({
	imports: [UsersModule, CustomJwtModule],
	providers: [AuthService, AuthResolver],
	exports: [AuthService, CustomJwtModule]
})
export class AuthModule {}
