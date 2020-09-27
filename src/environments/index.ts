import * as dotenv from 'dotenv'
dotenv.config()

// Environment
export const NODE_ENV: string = process.env.NODE_ENV || 'development'
export const PORT: number = parseInt(process.env.PORT, 10) || 4000
export const APP_PREFIX: string = process.env.APP_PREFIX || 'api/v1'
export const JWT_SECRET: string = process.env.JWT_SECRET || 'qwerty'

// MongoDB
export const MONGO_URI: string =
	process.env.MONGO_URI || 'mongodb://mongo/Masks'

// AWS CREDS
export const AWS_ID = process.env.AWS_ID || 'id'
export const AWS_SECRET = process.env.AWS_SECRET || 'secret'
export const AWS_REGION: string = process.env.AWS_REGION || 'us-east-1'
export const USERS_AVATARS_BUCKET_NAME =
	process.env.USERS_AVATARS_BUCKET_NAME || 'bucket'
