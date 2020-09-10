import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { TransactionsModule } from './modules/transactions/transactions.module'
import { DatabaseModule } from './modules/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { MongooseModule } from '@nestjs/mongoose'
import { MONGO_URI } from './environments'

@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forRoot(MONGO_URI),
		AuthModule,
		TransactionsModule,
		UsersModule
		// GraphQLModule.forRoot({}),
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
