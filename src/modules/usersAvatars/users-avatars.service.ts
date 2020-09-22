import { v4 } from 'uuid'
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UsersAvatars } from './models/users-avatars.schema'
import { BaseMongoService } from '../common/services/common.mongo.service'
import { CreateUsersAvatarsInput } from './dto/create-users-avatars.input'
import { UpdateUsersAvatarsInput } from './dto/update-user-avatars.input'
import { createWriteStream } from 'fs'
@Injectable()
export class UsersAvatarsService extends BaseMongoService<
	UsersAvatars,
	CreateUsersAvatarsInput,
	UpdateUsersAvatarsInput
> {
	constructor(
		@InjectModel(UsersAvatars.name)
		private usersAvatarsModel: Model<UsersAvatars>
	) {
		super(usersAvatarsModel)
	}

	async uploadFile({ createReadStream, filename }) {
		const generatedUuid = v4().substr(0, 10)

		return new Promise((resolve, reject) =>
			createReadStream()
				.pipe(createWriteStream(`./uploads/${generatedUuid}${filename}`))
				.on('finish', () => resolve(true))
				.on('error', () => reject(false))
		)
	}
}
