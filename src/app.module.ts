import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { TransactionsModule } from './modules/transactions/transactions.module'
import { DatabaseModule } from './modules/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { GraphQLModule } from '@nestjs/graphql'
import { LeaderboardsModule } from './modules/leaderboards/leaderboards.module'
import { UsersAvatarsModule } from './modules/usersAvatars/users-avatars.module'
import { UsersProductsModule } from './modules/usersProducts/users-products.module'
import { PaymentCardsModule } from './modules/paymentCards/payment-cards.module'
import { PaymentOrdersModule } from './modules/paymentOrders/payment-orders.module'

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		TransactionsModule,
		UsersModule,
		LeaderboardsModule,
		PaymentCardsModule,
		PaymentOrdersModule,
		UsersProductsModule,
		UsersAvatarsModule,
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
