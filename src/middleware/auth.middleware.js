import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../config/db.config.js';  
import { verifyToken, extractTokenFromHeader } from '../utils/jwt.utils.js';
import User from '../models/User.js';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// Function to generate new tokens
export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Middleware to verify access token
export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.error(`❌ No token provided`);
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(`❌ Invalid or expired access token`,error);
    return res.status(403).json({ message: 'Invalid or expired access token' });
  }
};

// Endpoint to refresh tokens
export const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    // Check if refresh token exists in the database
    const storedToken = await db.models.tokens.findOne({ where: { token: refreshToken } });
    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Verify and decode the refresh token
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: decoded.userId });

    // Update the refresh token in the database
    await db.models.tokens.update({ token: newRefreshToken }, { where: { token: refreshToken } });

    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error(`❌ Error refreshing token:`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Authenticate user using JWT token
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);

    if (!user || !user.is_active) {
      return res.status(401).json({ message: 'User not found or inactive' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Check if user has required role
 * @param {string[]} allowedRoles - Array of allowed roles
 */
export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions' });
    }

    next();
  };
};

// Example Usage in Routes
// import { authMiddleware, refreshTokenHandler } from './middleware/auth.middleware.js';
//
// app.get('/protected-route', authMiddleware, (req, res) => {
//   res.json({ message: 'This is a protected route', user: req.user });
// });
//
// app.post('/auth/refresh-token', refreshTokenHandler);