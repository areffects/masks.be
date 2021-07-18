import { UserModel } from 'src/modules/users/models/users.schema'

export interface IFullFileName {
	user: UserModel
	filename: string
	uid: string
}
