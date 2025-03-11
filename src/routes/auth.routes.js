import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
const router = express.Router();


router.post('/signup', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/verify-mobile', AuthController.verifyMobileNumber);
router.post('/reset-password-request', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);

export default router; 