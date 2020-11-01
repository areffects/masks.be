import {
	Injectable,
	InternalServerErrorException,
	Logger
} from '@nestjs/common'
import { parse } from 'path'
import { S3 } from 'aws-sdk'
import { AWS_REGION } from 'src/environments'
import { v4 } from 'uuid'
import { IFullFileName } from '../contracts/file.interface'

@Injectable()
export class FileService {
	readonly s3: S3

	constructor() {
		this.s3 = new S3({
			region: AWS_REGION,
			signatureVersion: 'v4'
		})
	}

	generateName({ fileName }) {
		const { ext } = parse(fileName)
		return v4().substr(0, 8).concat(ext)
	}

	getFullFileName({ user, filename, uid }: IFullFileName) {
		const fileName = filename || uid
		const generatedFileName = this.generateName({
			fileName
		})
		return `${user.userName}.${generatedFileName}`
	}

	async getPresignedUrl({ bucketName, fileName }) {
		const signedUrlExpireSeconds = 20
		return this.s3.getSignedUrl('getObject', {
			Bucket: bucketName,
			Key: fileName,
			Expires: signedUrlExpireSeconds
		})
	}

	async uploadToS3File({ createReadStream, bucketName, fileName }) {
		// Read content from the file
		// const fileContent = readFileSync(fullPath)
		const params = {
			Bucket: bucketName,
			Key: fileName, // File name you want to save as in S3
			Body: createReadStream()
		}

		// Uploading files to the bucket
		try {
			const s3Uploaded = await this.s3.upload(params).promise()
			Logger.log(s3Uploaded)
		} catch (err) {
			throw err
		}
	}

	createBucket({ bucketName }) {
		const params = {
			Bucket: bucketName,
			CreateBucketConfiguration: {
				// Set your region here
				LocationConstraint: AWS_REGION
			}
		}
		this.s3.createBucket(params, function (err, data) {
			if (err) {
				throw new InternalServerErrorException(err)
			} else {
				Logger.log('Bucket Created Successfully', data.Location)
			}
		})
	}
}
