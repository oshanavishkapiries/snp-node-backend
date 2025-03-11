import pkg from "@aws-sdk/client-s3";
const { PutObjectCommand, GetObjectCommand, GetSignedUrlCommand } = pkg;
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3.config.js";

// Upload file to S3
export const uploadToS3 = async ({ bucket, key, fileContent, contentType }) => {
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
    });

    await s3Client.send(command);
    console.log(`✅ File uploaded successfully to ${bucket}/${key}`);
  } catch (error) {
    console.error("❌ Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};

// Retrieve file from S3
export const retrieveFromS3 = async ({ bucket, key }) => {
  try {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const response = await s3Client.send(command);

    // Convert stream to buffer
    const streamToBuffer = async (stream) => {
      const chunks = [];
      for await (const chunk of stream) chunks.push(chunk);
      return Buffer.concat(chunks);
    };

    const data = await streamToBuffer(response.Body);
    console.log(`✅ File retrieved from S3: ${key}`);
    return data;
  } catch (error) {
    console.error("❌ Error retrieving file from S3:", error);
    throw new Error("Failed to retrieve file from S3");
  }
};

// Generate a signed URL for file access
export const generateSignedUrl = async ({ bucket, key, expiresIn = 3600 }) => {
  try {
    const command = new GetSignedUrlCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    console.log(`✅ Signed URL generated: ${url}`);
    return url;
  } catch (error) {
    console.error("❌ Error generating signed URL:", error);
    throw new Error("Failed to generate signed URL");
  }
};

// Example usage (uncomment to test):
// (async () => {
//   try {
//     // Upload example
//     await uploadToS3({
//       bucket: 'your-bucket-name',
//       key: 'example/file.txt',
//       fileContent: 'Hello, S3!',
//       contentType: 'text/plain',
//     });

//     // Retrieve example
//     const fileData = await retrieveFromS3({
//       bucket: 'your-bucket-name',
//       key: 'example/file.txt',
//     });
//     console.log('Retrieved file content:', fileData.toString());

//     // Generate signed URL example
//     const signedUrl = await generateSignedUrl({
//       bucket: 'your-bucket-name',
//       key: 'example/file.txt',
//     });
//     console.log('Signed URL:', signedUrl);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();
