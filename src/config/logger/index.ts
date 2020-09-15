import { LoggerService } from '@nestjs/common'

export class Logger implements LoggerService {
	log(message: string) {
		return message
	}
	error(message: string, trace: string) {
		return { message, trace }
	}
	warn(message: string) {
		return message
	}
	debug(message: string) {
		return message
	}
	verbose(message: string) {
		return message
	}
}
