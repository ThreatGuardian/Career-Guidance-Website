import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';

// Module-level state for OTP flow
let confirmationResult: ConfirmationResult | null = null;
let recaptchaVerifier: RecaptchaVerifier | null = null;

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
  },

  // --- Phone OTP Auth ---

  // Setup invisible reCAPTCHA verifier
  setupRecaptcha: (containerId: string) => {
    try {
      // Clear any existing verifier
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        recaptchaVerifier = null;
      }
      
      recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          // Reset on expiry
          recaptchaVerifier = null;
        }
      });
      
      return recaptchaVerifier;
    } catch (error) {
      console.error('Failed to setup reCAPTCHA:', error);
      throw error;
    }
  },

  // Send OTP to phone number
  sendOTP: async (phoneNumber: string) => {
    if (!recaptchaVerifier) {
      throw new Error('reCAPTCHA not initialized. Call setupRecaptcha first.');
    }
    
    try {
      confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      return confirmationResult;
    } catch (error: any) {
      // Reset reCAPTCHA on failure so user can retry
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        recaptchaVerifier = null;
      }
      throw error;
    }
  },

  // Verify OTP code
  verifyOTP: async (code: string) => {
    if (!confirmationResult) {
      throw new Error('No OTP was sent. Call sendOTP first.');
    }
    
    try {
      const result = await confirmationResult.confirm(code);
      confirmationResult = null;
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Clear OTP state (for cleanup / retry)
  clearOTPState: () => {
    confirmationResult = null;
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
  }
};