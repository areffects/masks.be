import { registerEnumType } from '@nestjs/graphql'

export enum UsersProductsTypes {
	'COMMERCIAL',
	'PUBLIC'
}

registerEnumType(UsersProductsTypes, {
	name: 'UsersProductsTypes'
})
