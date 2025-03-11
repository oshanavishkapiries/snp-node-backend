import winston from "winston";
import { uploadToS3 } from "../utils/s3.utils.js";
import path from "path";
import fs from "fs";

// Define log directories and S3 bucket details
const logFolder = path.resolve("logs");
const s3Bucket = process.env.AWS_LOG_BUCKET;
const environment = process.env.NODE_ENV || "development";

// Ensure local log folder exists
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder, { recursive: true });
}

// Define custom format for console logging with string icons
const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
  const icons = {
    info: "ℹ️ ",
    error: "❌",
    warn: "⚠️ ",
    http: "🌐",
  };

  const icon = icons[level] || "📄";
  return `${timestamp} ${icon} ${level.toUpperCase()}: ${message}`;
});

// Define Winston transports for local and console logging
const transports = [
  new winston.transports.File({
    filename: path.join(logFolder, "info.log"),
    level: "info",
  }),
  new winston.transports.File({
    filename: path.join(logFolder, "error.log"),
    level: "error",
  }),
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      consoleFormat
    ),
  }),
];

// Create the logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports,
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logFolder, "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logFolder, "rejections.log"),
    }),
  ],
});

// Function to upload logs to S3
const uploadLogsToS3 = async () => {
  try {
    const logFiles = ["info.log", "error.log", "exceptions.log", "rejections.log"];
    for (const file of logFiles) {
      const filePath = path.join(logFolder, file);

      if (fs.existsSync(filePath)) {
        const logContent = fs.readFileSync(filePath);
        const s3Key = `logs/${environment}/${new Date().toISOString()}_${file}`;

        // Use uploadToS3 function correctly
        await uploadToS3({
          bucket: s3Bucket,
          key: s3Key,
          fileContent: logContent,
          contentType: "text/plain",
        });

        console.log(`✅ Log file uploaded to S3: ${s3Key}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error uploading logs to S3:`, error);
  }
};

// Periodically upload logs to S3 (e.g., every 24 hours)
setInterval(uploadLogsToS3, 24 * 60 * 60 * 1000); // 24 hours

export default logger;

// Example usage:
// logger.info("Application started successfully.");
// logger.warn("This is a warning log.");
// logger.error("An error occurred.");
