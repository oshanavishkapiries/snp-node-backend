import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// Load Firebase Service Account JSON File
let firebaseConfig = {};
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const filePath = process.env.FIREBASE_SERVICE_ACCOUNT;
    firebaseConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error('❌ Failed to load Firebase service account JSON:', error.message);
    process.exit(1);
  }
}

const ENV = {
  // General App Settings
  PORT: parseInt(process.env.PORT, 10) || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Security
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,

  // CORS Configuration
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,

  // Database Type
  DATABASE_TYPE: process.env.DATABASE_TYPE || 'postgres',

  // PostgreSQL Configuration
  PG_USER: process.env.PG_USER,
  PG_HOST: process.env.PG_HOST,
  PG_DB: process.env.PG_DB,
  PG_PASS: process.env.PG_PASS,
  PG_PORT: parseInt(process.env.PG_PORT, 10) || 5432,

  // Redis Configuration
  // REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  // REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  // AWS_REDIS_ENDPOINT: process.env.AWS_REDIS_ENDPOINT,

  // AWS S3 Configuration
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION || 'ap-south-1',
  AWS_LOG_BUCKET: process.env.AWS_LOG_BUCKET,

  // Dialog SMS Configuration
  DIALOG_BASE_URL: process.env.DIALOG_BASE_URL,
  DIALOG_USERNAME: process.env.DIALOG_USERNAME,
  DIALOG_PASSWORD: process.env.DIALOG_PASSWORD,
  LOGIN_ENDPOINT: process.env.LOGIN_ENDPOINT,
  SMS_ENDPOINT: process.env.SMS_ENDPOINT,

  // Firebase Configuration (Loaded from JSON File)
  FIREBASE_SERVICE_ACCOUNT: firebaseConfig,

  // Brevo SMTP Configuration
  BREVO_SMTP_HOST: process.env.BREVO_SMTP_HOST,
  BREVO_SMTP_PORT: parseInt(process.env.BREVO_SMTP_PORT, 10) || 587,
  BREVO_SMTP_USER: process.env.BREVO_SMTP_USER,
  BREVO_SMTP_PASSWORD: process.env.BREVO_SMTP_PASSWORD,
  BREVO_FROM_EMAIL: process.env.BREVO_FROM_EMAIL,
};

export default ENV;
