import {
	Injectable,
	CacheOptionsFactory,
	CacheModuleOptions
} from '@nestjs/common'

@Injectable()
export class CacheService implements CacheOptionsFactory {
	createCacheOptions(): CacheModuleOptions {
		return {
			ttl: 5, // Seconds
			max: 10 // Maximum number of items in cache
		}
	}
}
