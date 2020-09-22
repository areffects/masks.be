import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'

@Schema({ timestamps: true })
export class Rating extends Document {
	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true,
		default: () => new ObjectId()
	})
	_id: string

	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true
	})
	userId: string

	@Prop()
	type: string

	@Prop()
	stars: number
}

export const RatingSchema = SchemaFactory.createForClass(Rating)