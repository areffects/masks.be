import { genSalt, hash } from 'bcryptjs'
import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './models/users.schema'
import { UsersResolver } from './users.resolver'

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: User.name,
				useFactory: function () {
					const schema = UserSchema
					schema.pre<User>('save', async function (next) {
						// eslint-disable-next-line @typescript-eslint/no-this-alias
						const user = this
						const salt = await genSalt(10)
						const hashedPassword = await hash(user.password, salt)
						user.password = hashedPassword
						next()
					})
					return schema
				}
			}
		])
	],
	providers: [UsersResolver, UsersService],
	exports: [UsersService]
})
export class UsersModule {}
