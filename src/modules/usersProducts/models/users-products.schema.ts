import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'
import { UsersProductsTypes } from '../enums/types.enums'

@Schema({
	timestamps: true,
	collection: 'usersProducts'
})
export class UsersProductsModel extends Document {
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
	description: string

	@Prop()
	rate: number

	@Prop()
	type: UsersProductsTypes

	@Prop()
	downloads: number
}

export const UsersProductsSchema = SchemaFactory.createForClass(
	UsersProductsModel
)
