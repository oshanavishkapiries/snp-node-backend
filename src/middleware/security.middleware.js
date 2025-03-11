import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import express from 'express';

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);

// Helmet Configuration
export const helmetMiddleware = helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  hsts: true,
  hidePoweredBy: true,
  xssFilter: true,
  noSniff: true,
});

// Compression Middleware
export const compressionMiddleware = compression();

// Rate Limiting Configuration
export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
});

// JSON Body Parsing Middleware with size limit
export const jsonBodyParserMiddleware = express.json({ limit: '100kb' });
