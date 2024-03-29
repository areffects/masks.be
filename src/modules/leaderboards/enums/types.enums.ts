import { registerEnumType } from '@nestjs/graphql'

export enum RatingTypesEnum {
	'PATCHES',
	'3D',
	'READY_EFFECT',
	'TOP_RATED',
	'TOP_DOWNLOADS'
}

registerEnumType(RatingTypesEnum, {
	name: 'RatingTypesEnum'
})
