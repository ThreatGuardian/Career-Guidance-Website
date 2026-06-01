import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configuration from Firebase Console
// Uses environment variables with fallback to hardcoded values for backward compatibility
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAc8osgmuAoG_aKG1oa1AcXA3VJTqiwM08",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "career-guidance-app-c04b9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "career-guidance-app-c04b9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "career-guidance-app-c04b9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "214738658934",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:214738658934:web:808ea03a1d329a9cc3a157"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);