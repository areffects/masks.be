import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'

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
export class UsersAvatars extends Document {
	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true,
		default: () => new ObjectId()
	})
	_id: string

	@Prop({ required: true })
	name: string

	@Prop({ required: true })
	url: string
}

export const UsersAvatarsSchema = SchemaFactory.createForClass(UsersAvatars)
