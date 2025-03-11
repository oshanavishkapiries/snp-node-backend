import dotenv from 'dotenv';
import app from './app.js';
import logger from './src/utils/logger.utils.js';
import { initializeDatabase } from './src/config/database.js';
import { initializeModels } from './src/models/index.js';

dotenv.config();

// Function to validate required environment variables
const validateEnv = () => {
  const requiredEnvKeys = [
    'PORT',
    'NODE_ENV',
    'ENCRYPTION_KEY',
    'DATABASE_TYPE',
    'PG_USER',
    'PG_HOST',
    'PG_DB',
    'PG_PASS',
    'PG_PORT',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_REGION',
    'AWS_LOG_BUCKET',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    // 'REDIS_HOST',
    // 'REDIS_PORT',
    'BREVO_SMTP_HOST',
    'BREVO_SMTP_PORT',
    'BREVO_SMTP_USER',
    'BREVO_SMTP_PASSWORD',
    'BREVO_FROM_EMAIL',
    'DIALOG_BASE_URL',
    'DIALOG_USERNAME',
    'DIALOG_PASSWORD',
    'LOGIN_ENDPOINT',
    'SMS_ENDPOINT',
  ];

  const missingKeys = requiredEnvKeys.filter((key) => !process.env[key]);

  if (missingKeys.length > 0) {
    logger.error('❌ Missing required environment variables:', missingKeys.join(', '));
    console.log('🔍 Ensure your .env file is properly set up and dotenv is correctly loaded.');
    process.exit(1);
  }
};

// Start the application
const startServer = async () => {
  try {
  //  validateEnv();

    // Initialize Database
    await initializeDatabase();
    
    // Initialize Models
    await initializeModels();

    // Start Express server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      logger.info(`✅ Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

// Execute server startup
startServer();
