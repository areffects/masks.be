import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'
import { ADMIN, USER } from '../constants/roles'
import { BANNED, IN_PENDING, OK } from '../constants/statuses'

@Schema({
	timestamps: true,
	toJSON: {
		virtuals: true,
		transform: function (doc, ret) {
			delete ret.password
			return ret
		}
	}
})
export class User extends Document {
	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true,
		default: () => new ObjectId()
	})
	_id: string

	@Prop({ required: true })
	userName: string

	@Prop({ unique: true, required: true })
	lastName: string

	@Prop({
		unique: true,
		required: true,
		lowercase: true
	})
	email: string

	@Prop({ required: true })
	password: string

	@Prop({ enum: [USER, ADMIN], default: USER })
	role: string

	@Prop({ type: Types.ObjectId, index: true })
	avatarId: string

	@Prop({ enum: [BANNED, OK, IN_PENDING], default: IN_PENDING })
	status: string
}

export const UserSchema = SchemaFactory.createForClass(User)
