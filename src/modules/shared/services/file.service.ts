import {
	Injectable,
	InternalServerErrorException,
	Logger
} from '@nestjs/common'
import { parse } from 'path'
import { S3 } from 'aws-sdk'
import { readFileSync } from 'fs'
import { AWS_ID, AWS_SECRET } from 'src/environments'
import { v4 } from 'uuid'

export const REGION = 'us-east-2'

@Injectable()
export class FileService {
	getS3Instance() {
		return new S3({
			accessKeyId: AWS_ID,
			secretAccessKey: AWS_SECRET,
			signatureVersion: 'v4'
		})
	}
	generateName({ filename }) {
		const { ext } = parse(filename)
		return v4().substr(0, 8).concat(ext)
	}

	async getPresignedUrl({ bucketName, fileName }) {
		const s3 = this.getS3Instance()
		const signedUrlExpireSeconds = 60 * 5
		const url = s3.getSignedUrl('getObject', {
			Bucket: bucketName,
			Key: fileName,
			Expires: signedUrlExpireSeconds
		})
		return url
	}

	async uploadToS3File({ bucketName, fileName, fullPath }) {
		// Read content from the file
		const fileContent = readFileSync(fullPath)
		const s3 = this.getS3Instance()
		const params = {
			Bucket: bucketName,
			Key: fileName, // File name you want to save as in S3
			Body: fileContent,
			CreateBucketConfiguration: {
				// Set your region here
				LocationConstraint: REGION
			}
		}

		// Uploading files to the bucket
		try {
			const s3Uploaded = await s3.upload(params).promise()
			Logger.log(s3Uploaded)
		} catch (err) {
			throw err
		}
	}

	createBucket({ bucketName }) {
		const s3 = this.getS3Instance()

		const params = {
			Bucket: bucketName,
			CreateBucketConfiguration: {
				// Set your region here
				LocationConstraint: REGION
			}
		}
		s3.createBucket(params, function (err, data) {
			if (err) {
				throw new InternalServerErrorException(err)
			} else {
				Logger.log('Bucket Created Successfully', data.Location)
			}
		})
	}
}
