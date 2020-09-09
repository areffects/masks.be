import * as dotenv from 'dotenv'
dotenv.config()

// Environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'
const PORT: number = parseInt(process.env.PORT, 10) || 4000
const APP_PREFIX: string = process.env.APP_PREFIX || 'api/v1'

// MongoDB
const MONGO_URI: string =
	process.env.MONGO_URI || 'mongodb://localhost:27017/Masks'

export { NODE_ENV, APP_PREFIX, PORT, MONGO_URI }
