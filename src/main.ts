import { NestFactory } from '@nestjs/core'
import { Logger as SystemLogger } from '@nestjs/common'

import { AppModule } from './app.module'

import { Logger } from './config/logger'

import { PORT, APP_PREFIX } from './environments'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { logger: new Logger() })
	app.setGlobalPrefix('api/v1');
	await app.listen(PORT)
	SystemLogger.log(`Application is running on: ${await app.getUrl()} 🚀`);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
		SystemLogger.log(`Hot-Module Replacement: started 🔥`);
	}
}

bootstrap().catch(error => {
	SystemLogger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false)
	throw error
})
