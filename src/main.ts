import { NestFactory } from '@nestjs/core'
import { Logger as SystemLogger, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

import { Logger } from './config/logger'

import { PORT } from './environments'
import { HttpExceptionFilter } from './modules/shared/filters/http.exception.filter'

async function bootstrap() {
	const isDev = process.env.NODE_ENV === 'development'
	const app = await NestFactory.create(
		AppModule,
		isDev ? {} : { logger: new Logger() }
	)
	app.useGlobalFilters(new HttpExceptionFilter())
	app.setGlobalPrefix('api/v1')
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)
	await app.listen(PORT)

	SystemLogger.log(`Application is running on: ${await app.getUrl()} 🚀`)

	// let currentApp = app
	if (module && module.hot) {
		module.hot.accept()

		module.hot.dispose(() => app.close())

		SystemLogger.log(`Hot-Module Replacement: started 🔥`)
	}
}

bootstrap().catch((error) => {
	SystemLogger.error(
		`❌  Error starting server, ${error}`,
		'',
		'Bootstrap',
		false
	)
	throw error
})
