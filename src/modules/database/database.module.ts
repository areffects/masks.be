import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MONGO_URI } from 'src/environments'

@Module({
	imports: [
		MongooseModule.forRoot(
			'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
		)
	]
})
export class DatabaseModule {}
