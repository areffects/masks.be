import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'

@Injectable()
export class ClassValidatorValidationPipe implements PipeTransform {
	constructor(private schema) {}

	async transform(value: any) {
		const schema = new this.schema()
		Object.keys(value).forEach((key) => {
			schema[key] = value[key]
		})
		const error = await validate(schema)
		if (error.length) {
			throw new BadRequestException(error)
		}
		return value
	}
}
