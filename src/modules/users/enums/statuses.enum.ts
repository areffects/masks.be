import { registerEnumType } from '@nestjs/graphql'

export enum StatusesEnum {
	OK = 'ok',
	IN_PENDING = 'in_pending',
	BANNED = 'banned'
}

registerEnumType(StatusesEnum, {
	name: 'StatusesEnum'
})
