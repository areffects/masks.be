import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { USERS_PRODUCTS_SCREENSHOTS_BUCKET_NAME } from 'src/environments'
import { FileService } from 'src/modules/shared/services/file.service'
import { ObjectId } from '../../common/constants/common'

@Schema({
	timestamps: true,
	collection: 'usersProductsScreenshots'
})
export class UsersProductsScreenshotsModel extends Document {
	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true,
		default: () => new ObjectId()
	})
	_id: string

	@Prop({ required: true })
	name: string

	@Prop({
		type: Types.ObjectId,
		index: true,
		required: true
	})
	userId: string

	@Prop({
		get() {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const { name } = this
			const fileService = new FileService()
			return fileService.getPresignedUrl({
				bucketName: USERS_PRODUCTS_SCREENSHOTS_BUCKET_NAME,
				fileName: name
			})
		}
	})
	url: string
}

export const UsersProductsScreenshotsSchema = SchemaFactory.createForClass(
	UsersProductsScreenshotsModel
)
