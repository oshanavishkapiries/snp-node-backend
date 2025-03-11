import dotenv from 'dotenv';
dotenv.config();

// Ensure required environment variables are present
if (!process.env.BREVO_SMTP_HOST || !process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASSWORD || !process.env.BREVO_FROM_EMAIL) {
  throw new Error('❌ Missing required Brevo SMTP configuration.');
}

// Brevo SMTP Configuration
const brevoConfig = {
  smtpHost: process.env.BREVO_SMTP_HOST,
  smtpPort: parseInt(process.env.BREVO_SMTP_PORT, 10) || 587, // Default to 587
  smtpUser: process.env.BREVO_SMTP_USER,
  smtpPassword: process.env.BREVO_SMTP_PASSWORD,
  fromEmail: process.env.BREVO_FROM_EMAIL,
};

export default brevoConfig;

/**
 * ==========================================
 * 📧 Sample Usage: Sending Email with Brevo
 * ==========================================
 *
 * 1️⃣ Install Nodemailer (if not already installed):
 * -----------------------------------------------
 * pnpm add nodemailer
 *
 * 2️⃣ Import Brevo Config & Nodemailer:
 * -----------------------------------------------
 * import nodemailer from 'nodemailer';
 * import brevoConfig from './brevoConfig.js';
 *
 * 3️⃣ Create and Configure the Transporter:
 * -----------------------------------------------
 * const transporter = nodemailer.createTransport({
 *   host: brevoConfig.smtpHost,
 *   port: brevoConfig.smtpPort,
 *   secure: brevoConfig.smtpPort === 465, // Use TLS if port is 465
 *   auth: {
 *     user: brevoConfig.smtpUser,
 *     pass: brevoConfig.smtpPassword,
 *   },
 * });
 *
 * 4️⃣ Send an Email:
 * -----------------------------------------------
 * async function sendEmail(to, subject, text) {
 *   try {
 *     const info = await transporter.sendMail({
 *       from: `"My App" <${brevoConfig.fromEmail}>`,
 *       to,
 *       subject,
 *       text,
 *     });
 *     console.log('✅ Email sent:', info.messageId);
 *   } catch (error) {
 *     console.error('❌ Error sending email:', error);
 *   }
 * }
 *
 * 🚀 Example Usage:
 * -----------------
 * sendEmail('recipient@example.com', 'Welcome!', 'Hello! This is a test email from Brevo SMTP.');
 *
 */
