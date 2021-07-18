import { registerEnumType } from '@nestjs/graphql'

export enum Roles {
	USER = 'user',
	ADMIN = 'admin',
	DISTRIBUTOR = 'distributor',
	SUPERADMIN = 'superAdmin'
}

registerEnumType(Roles, {
	name: 'RolesEnum'
})
