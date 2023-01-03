import S3 from 'aws-sdk/clients/s3';

require('dotenv').config();

const bucketName = process.env.AWS_BUCKET_DEV_NAME;
const bucketRegion = process.env.AWS_BUCKET_DEV_REGION;
const accessKeyId = process.env.AWS_IAM_USER_SERVER_DEV_ACCESS_KEY;
const secretAccessKey = process.env.AWS_IAM_USER_SERVER_DEV_SECRET_KEY;

// initialize the s3 object
const s3 = new S3({
  region: bucketRegion,
  accessKeyId,
  secretAccessKey,
});
