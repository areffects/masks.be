import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'
import { StatusesEnum } from '../enums/statuses.enum'
import { Roles } from '../enums/roles.enum'

@Schema({
	collection: 'users',
	timestamps: true,
	toJSON: {
		virtuals: true,
		transform: function (doc, ret) {
			delete ret.password
			return ret
		}
	}
})
export class UserModel extends Document {
	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true,
		default: () => new ObjectId()
	})
	_id: string

	@Prop({ unique: true })
	userName: string

	@Prop({ required: true })
	firstName: string

	@Prop({ required: true })
	lastName: string

	@Prop({
		unique: true,
		required: true,
		lowercase: true
	})
	email: string

	@Prop()
	phone?: string

	@Prop({ required: true })
	password: string

	@Prop({ enum: [Roles.ADMIN, Roles.USER], default: Roles.USER })
	role: Roles

	@Prop({ type: Types.ObjectId, index: true })
	avatarId: string

	@Prop({
		enum: [StatusesEnum.BANNED, StatusesEnum.OK, StatusesEnum.IN_PENDING],
		default: StatusesEnum.IN_PENDING
	})
	status: string
}

export const UserSchema = SchemaFactory.createForClass(UserModel)
