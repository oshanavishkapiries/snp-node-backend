import logger from '../utils/logger.utils.js';

/**
 * Express Middleware for HTTP request logging.
 *
 * Logs incoming requests using a structured logger and also prints them to the console.
 * This helps in monitoring API traffic and debugging request-related issues.
 */
const httpLogger = (req, res, next) => {
  // Log structured message using Winston logger
  logger.info({ message: `HTTP Request - ${req.method} ${req.url}`, requestId: req.headers['x-request-id'] || null });

  // Print a simple request log to console
  console.log(`🌐 HTTP ${req.method} ${req.url}`);

  next(); // Pass control to the next middleware
};

export default httpLogger;

/**
 * ==========================================
 * 🌐 Sample Usage: Using HTTP Logger in Express
 * ==========================================
 *
 * 1️⃣ Install Winston for Structured Logging (if not already installed):
 * ---------------------------------------------------
 * pnpm add winston
 *
 * 2️⃣ Import `httpLogger` and Apply It as Middleware:
 * ---------------------------------------------------
 * import express from 'express';
 * import httpLogger from './middlewares/httpLogger.js';
 *
 * const app = express();
 *
 * // Apply HTTP Logger Middleware
 * app.use(httpLogger);
 *
 * // Sample Route
 * app.get('/', (req, res) => {
 *   res.send('Hello, world! 🌍');
 * });
 *
 * // Start Server
 * app.listen(3000, () => {
 *   console.log('🚀 Server running on http://localhost:3000');
 * });
 *
 * 3️⃣ Expected Logs on Request:
 * ---------------------------------------------------
 * 🌐 HTTP GET /
 * ✅ [INFO] HTTP Request - GET /
 *
 */