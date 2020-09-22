import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { TransactionsModule } from './modules/transactions/transactions.module'
import { DatabaseModule } from './modules/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { GraphQLModule } from '@nestjs/graphql'
import { RatingsModule } from './modules/ratings/ratings.module'

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		TransactionsModule,
		UsersModule,
		RatingsModule,
		GraphQLModule.forRoot({
			playground: {
				settings: {
					'editor.theme': 'light'
				}
			},
			context: ({ req }) => ({ req }),
			installSubscriptionHandlers: true,
			autoSchemaFile: 'schema.gql'
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
