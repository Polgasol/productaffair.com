"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
require('dotenv').config();
const bucketName = process.env.AWS_BUCKET_DEV_NAME;
const bucketRegion = process.env.AWS_BUCKET_DEV_REGION;
const accessKeyId = process.env.AWS_IAM_USER_SERVER_DEV_ACCESS_KEY;
const secretAccessKey = process.env.AWS_IAM_USER_SERVER_DEV_SECRET_KEY;
const s3 = new s3_1.default({
    region: bucketRegion,
    accessKeyId,
    secretAccessKey,
});
//# sourceMappingURL=s3.js.map