import nodemailer from 'nodemailer';
import brevoConfig from '../config/brevo-smtp.config.js';

// Initialize nodemailer transporter with Brevo SMTP settings
const transporter = nodemailer.createTransport({
  host: brevoConfig.smtpHost,
  port: brevoConfig.smtpPort,
  secure: brevoConfig.smtpPort === 465, // Use secure connection for port 465
  auth: {
    user: brevoConfig.smtpUser,
    pass: brevoConfig.smtpPassword,
  },
});

// Function to send an email
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: brevoConfig.fromEmail,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Error sending email:`, error);
    throw new Error('Failed to send email');
  }
};

// Example usage:
// (async () => {
//   try {
//     await sendEmail({
//       to: 'recipient@example.com',
//       subject: 'Test Email',
//       text: 'This is a test email.',
//       html: '<p>This is a test email.</p>',
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();
