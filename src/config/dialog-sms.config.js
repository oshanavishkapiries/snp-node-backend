import dotenv from 'dotenv';

dotenv.config();

// Ensure required environment variables are present
if (!process.env.DIALOG_BASE_URL || !process.env.DIALOG_USERNAME || !process.env.DIALOG_PASSWORD) {
  throw new Error('❌ Missing required Dialog SMS configuration.');
}

// Dialog SMS Configuration
const dialogConfig = {
  baseUrl: process.env.DIALOG_BASE_URL, // Dialog SMS API base URL
  username: process.env.DIALOG_USERNAME, // Dialog API Username
  password: process.env.DIALOG_PASSWORD, // Dialog API Password
  loginEndpoint: process.env.LOGIN_ENDPOINT, // API login endpoint
  smsEndpoint: process.env.SMS_ENDPOINT, // API endpoint for sending SMS
};

export default dialogConfig;

/**
 * ==========================================
 * 📲 Sample Usage: Sending SMS with Dialog API
 * ==========================================
 *
 * 1️⃣ Install Axios (if not already installed):
 * -----------------------------------------------
 * pnpm add axios
 *
 * 2️⃣ Import Dialog Config & Axios:
 * -----------------------------------------------
 * import axios from 'axios';
 * import dialogConfig from './dialogConfig.js';
 *
 * 3️⃣ Function to Send an SMS:
 * -----------------------------------------------
 * async function sendSMS(to, message) {
 *   try {
 *     const response = await axios.post(
 *       `${dialogConfig.baseUrl}${dialogConfig.smsEndpoint}`,
 *       {
 *         username: dialogConfig.username,
 *         password: dialogConfig.password,
 *         to,
 *         message,
 *       },
 *       { headers: { 'Content-Type': 'application/json' } }
 *     );
 *     
 *     console.log('✅ SMS sent successfully:', response.data);
 *     return response.data;
 *   } catch (error) {
 *     console.error('❌ Error sending SMS:', error.response?.data || error.message);
 *     return null;
 *   }
 * }
 *
 * 🚀 Example Usage:
 * -----------------
 * sendSMS('+94712345678', 'Hello! This is a test SMS from Dialog API.');
 *
 */
