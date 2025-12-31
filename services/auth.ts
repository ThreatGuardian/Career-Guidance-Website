import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

export const AuthService = {
  // Sign in with Email and Password
  login: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  // Sign out
  logout: async () => {
    return await signOut(auth);
  },

  // Subscribe to auth state changes (Logged In / Logged Out)
  subscribe: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user immediately
  getCurrentUser: () => {
    return auth.currentUser;
  }
};