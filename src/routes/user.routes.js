import express from 'express';
import userController from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Apply admin authorization middleware to all routes
router.use(authorize(['ADMIN']));

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Create new user
router.post('/', userController.createUser);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

// Update user password
router.patch('/:id/password', userController.updateUserPassword);

// Toggle user status
router.patch('/:id/toggle-status', userController.toggleUserStatus);

export default router;
