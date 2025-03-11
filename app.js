import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import logger from './src/utils/logger.utils.js';
import httpLogger from './src/middleware/http-logger.middleware.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.disable('x-powered-by');
app.use(httpLogger); // Log all HTTP requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure HTTP headers
app.use(compression()); // Enable response compression
app.use(bodyParser.json()); // For JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded requests


// Rate limiting
const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX || 100, // Limit requests per IP
  message: { error: 'Too many requests. Please try again later.' },
});
app.use(rateLimitMiddleware);

// Health-Check route
app.get('/health-check', (req, res) => {
  res.status(200).json({ message: '✅ Server is up & running!' });
  console.log(`ℹ️  GET /health-check route accessed`);
});

// Import and initialize routes
import routes from './src/routes/index.js';
app.use('/api', routes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(`❌ Server error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
