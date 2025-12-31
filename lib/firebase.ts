import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAc8osgmuAoG_aKG1oa1AcXA3VJTqiwM08",
  authDomain: "career-guidance-app-c04b9.firebaseapp.com",
  projectId: "career-guidance-app-c04b9",
  storageBucket: "career-guidance-app-c04b9.firebasestorage.app",
  messagingSenderId: "214738658934",
  appId: "1:214738658934:web:808ea03a1d329a9cc3a157"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);