// Initialize Firebase Admin SDK
import admin from 'firebase-admin';
const serviceAccount = JSON.parse(process.env.GCLOUD_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'blog-89278.appspot.com',
});

// Initialize Firebase Storage
export const storage = admin.storage().bucket();