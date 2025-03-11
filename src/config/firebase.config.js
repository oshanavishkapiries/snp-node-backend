import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Ensure Firebase service account file path is set
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('❌ Missing Firebase service account file path in environment variables.');
}

// Load Firebase service account JSON file
let serviceAccount;
try {
  serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT, 'utf8'));
} catch (error) {
  throw new Error(`❌ Failed to load Firebase service account JSON: ${error.message}`);
}

// Initialize Firebase Admin SDK (Avoid multiple initializations)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

console.log('✅ Firebase Admin SDK initialized successfully!');

export default admin;

/**
 * ==========================
 * 🔥 Sample Firebase Usage 🔥
 * ==========================
 * 
 * 1️⃣ Verify an ID Token (Authenticate User):
 * -----------------------------------------
 * import admin from './firebase-admin.js';
 * 
 * async function verifyToken(idToken) {
 *   try {
 *     const decodedToken = await admin.auth().verifyIdToken(idToken);
 *     console.log('✅ User verified:', decodedToken);
 *     return decodedToken;
 *   } catch (error) {
 *     console.error('❌ Error verifying token:', error);
 *     return null;
 *   }
 * }
 * 
 * 2️⃣ Create a New User:
 * -----------------------------------------
 * async function createUser(email, password) {
 *   try {
 *     const user = await admin.auth().createUser({
 *       email,
 *       password,
 *     });
 *     console.log('✅ New user created:', user.uid);
 *     return user;
 *   } catch (error) {
 *     console.error('❌ Error creating user:', error);
 *     return null;
 *   }
 * }
 * 
 * 3️⃣ Access Firestore Database:
 * -----------------------------------------
 * import admin from './firebase-admin.js';
 * 
 * async function getUserProfile(uid) {
 *   try {
 *     const db = admin.firestore();
 *     const userDoc = await db.collection('users').doc(uid).get();
 *     if (!userDoc.exists) {
 *       console.log('❌ User not found');
 *       return null;
 *     }
 *     console.log('✅ User profile:', userDoc.data());
 *     return userDoc.data();
 *   } catch (error) {
 *     console.error('❌ Error fetching user profile:', error);
 *     return null;
 *   }
 * }
 * 
 * 🚀 Example Usage:
 * -----------------
 * const user = await createUser('test@example.com', 'securePassword123');
 * if (user) {
 *   const profile = await getUserProfile(user.uid);
 * }
 */
