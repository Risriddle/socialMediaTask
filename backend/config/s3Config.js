const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();


const s3 = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    httpOptions: {
        timeout: 50000, 
    }
});



const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadToS3(file) {
    const fileKey = `uploads/${uuidv4()}_${file.originalname}`;

    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3.send(new PutObjectCommand(uploadParams));
        return `https://${process.env.S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileKey}`;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
}

module.exports = { upload, uploadToS3 };
