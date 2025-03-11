import admin from '../config/firebase.config.js';

// Function to send a push notification
export const sendPushNotification = async ({ token, title, body, data = {} }) => {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      data,
      token,
    };

    const response = await admin.messaging().send(message);
    console.log(`✅ Push notification sent successfully to token: ${token}`);
    return response;
  } catch (error) {
    console.error(`❌ Error sending push notification:`, error);
    throw new Error('Failed to send push notification');
  }
};

// Example usage:
// (async () => {
//   try {
//     const response = await sendPushNotification({
//       token: 'your-device-token',
//       title: 'Test Notification',
//       body: 'This is a test push notification!',
//       data: { key1: 'value1', key2: 'value2' },
//     });
//     console.log('Push Notification Response:', response);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();
