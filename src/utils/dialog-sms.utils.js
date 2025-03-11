import axios from 'axios';
import dialogConfig from '../config/dialog-sms.config.js';

// Function to send an SMS via Dialog API
export const sendSms = async ({ to, message }) => {
  try {
    // Authenticate and get a token (if required, based on Dialog's API)
    const authResponse = await axios.post(`${dialogConfig.baseUrl}${dialogConfig.loginEndpoint}`, {
      username: dialogConfig.username,
      password: dialogConfig.password,
    });
    const authToken = authResponse.data.token;

    // Send SMS request
    const smsResponse = await axios.post(
      `${dialogConfig.baseUrl}${dialogConfig.smsEndpoint}`,
      {
        to,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`✅ SMS sent successfully to ${to}`);
    return smsResponse.data;
  } catch (error) {
    console.error(`❌ Error sending SMS:`, error);
    throw new Error('Failed to send SMS');
  }
};

// Example usage:
// (async () => {
//   try {
//     const response = await sendSms({ to: '+1234567890', message: 'Hello, this is a test message!' });
//     console.log('SMS API Response:', response);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();
