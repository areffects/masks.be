import { ArgsType, Field } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { Types } from 'mongoose'
import { ObjectIdScalar } from 'src/modules/common/scalars/objectId.scalar'

@ArgsType()
export class UserArgs {
	@Field(() => ObjectIdScalar, { nullable: true })
	_id: Types.ObjectId

	@Field({ nullable: true })
	userName: string

	@Field({ nullable: true })
	lastName: string

	@Field({ nullable: true })
	@IsEmail()
	email: string

	@Field({ nullable: true })
	password: string

	@Field({ nullable: true })
	role: string

	@Field({ nullable: true })
	status: string
}
