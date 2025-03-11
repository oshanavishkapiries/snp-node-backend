import express from 'express';

// Import route modules
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

const router = express.Router();

// Define API routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);


// Default route
router.get('/', (req, res) => {
  res.json({ message: '🚀 API is working! Navigate to /api for available endpoints.' });
});

export default router;
