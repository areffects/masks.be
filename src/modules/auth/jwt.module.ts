import { Global, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JWT_SECRET } from '../../environments'
import { JwtModule } from '@nestjs/jwt'

@Global()
@Module({
	imports: [
		PassportModule,
		JwtModule.register({ secret: JWT_SECRET, signOptions: { expiresIn: '6h' } })
	],
	providers: [],
	exports: [JwtModule]
})
export class CustomJwtModule {}
