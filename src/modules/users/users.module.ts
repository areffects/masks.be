import { genSalt, hash } from 'bcryptjs'
import { Global, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModel, UserSchema } from './models/users.schema'
import { UsersResolver } from './users.resolver'
import { v4 } from 'uuid'
import { UsersAvatarsModule } from '../usersAvatars/users-avatars.module'

@Global()
@Module({
	imports: [
		UsersAvatarsModule,
		MongooseModule.forFeatureAsync([
			{
				name: UserModel.name,
				useFactory: function () {
					const schema = UserSchema
					schema.pre<UserModel>('save', async function (next) {
						// eslint-disable-next-line @typescript-eslint/no-this-alias
						const user = this
						const salt = await genSalt(10)
						const hashedPassword = await hash(user.password, salt)
						user.password = hashedPassword
						user.userName = user.userName || v4().substr(0, 10)
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
