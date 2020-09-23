import * as dotenv from 'dotenv'
dotenv.config()

// Environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'
const PORT: number = parseInt(process.env.PORT, 10) || 4000
const APP_PREFIX: string = process.env.APP_PREFIX || 'api/v1'
const JWT_SECRET: string = process.env.JWT_SECRET || 'qwerty'

// MongoDB
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://mongo/Masks'

const AWS_ID = process.env.AWS_ID || 'id'
const AWS_SECRET = process.env.AWS_SECRET || 'secret'

const USERS_AVATARS_BUCKET_NAME =
	process.env.USERS_AVATARS_BUCKET_NAME || 'bucket'

export {
	NODE_ENV,
	APP_PREFIX,
	PORT,
	MONGO_URI,
	JWT_SECRET,
	AWS_ID,
	AWS_SECRET,
	USERS_AVATARS_BUCKET_NAME
}
