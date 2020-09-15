import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { TransactionsModule } from './modules/transactions/transactions.module'
import { DatabaseModule } from './modules/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		TransactionsModule,
		// UsersModule,
		GraphQLModule.forRoot({
			playground: {
				settings: {
					'editor.theme': 'light'
				}
			},
			installSubscriptionHandlers: true,
			autoSchemaFile: 'schema.gql'
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
