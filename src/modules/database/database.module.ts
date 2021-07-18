import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MONGO_URI } from '../../environments'

@Module({
	imports: [
		MongooseModule.forRoot(MONGO_URI, {
			useFindAndModify: false,
			autoIndex: true,
			autoCreate: true,
			useCreateIndex: true
		})
	]
})
export class DatabaseModule {}
