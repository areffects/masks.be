import { NestFactory } from '@nestjs/core'
import { Logger as SystemLogger, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

import { Logger } from './config/logger'

import { PORT } from './environments'

async function bootstrap() {
	const isDev = process.env.NODE_ENV === 'development'
	const app = await NestFactory.create(
		AppModule,
		isDev ? {} : { logger: new Logger() }
	)

	app.setGlobalPrefix('api/v1')
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			skipMissingProperties: true
		})
	)
	await app.listen(PORT)

	SystemLogger.log(`Application is running on: ${await app.getUrl()} 🚀`)

	// let currentApp = app
	if (module && module.hot) {
		module.hot.accept()
		// module.hot.accept('./app.module.ts', () => {
		// 	// app.removeListener('request', currentApp);
		// 	//   server.on('request', app);
		// 	currentApp = app
		// })
		module.hot.dispose(() => app.close())
		// module.hot.status((status) => {
		// 	console.log('status :>> ', status)
		// 	// if (status === 'idle') {
		// 	// 	module.hot.check(true, console.log)
		// 	// }
		// 	if (status === 'ready') {
		// 		// module.hot.apply({ onAccepted: console.log }, console.log)
		// 		// module.hot.addStatusHandler((status) => console.log('STATUS: ', status))
		// 	}
		// })
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
