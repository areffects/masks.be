import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'

@Schema({
	timestamps: true,
	collection: 'categories'
})
export class CategoriesModel extends Document {
	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true,
		default: () => new ObjectId()
	})
	_id: string

	@Prop({ required: true })
	name: string
}

export const CategoriesSchema = SchemaFactory.createForClass(CategoriesModel)
