import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ObjectId } from '../../common/constants/common'
import { RatingTypesEnum } from '../enums/types.enums'

@Schema({
	timestamps: true,
	collection: 'leaderboards'
})
export class LeaderboardModel extends Document {
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
	type: RatingTypesEnum

	@Prop()
	stars: number
}

export const LeaderboardSchema = SchemaFactory.createForClass(LeaderboardModel)
