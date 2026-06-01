# Incomplete Tasks

This file tracks the pending implementation details and configuration placeholders found in the project.

## 1. Services
- [ ] **Contact Notification (`services/email.ts`)**: Implement `sendInquiryNotification`. The function is currently stubbed out (contains `// ... implementation similar to above`) and requires its own EmailJS template ID and actual `emailjs.send()` integration.

## 2. Environment Variables & Configuration
- [ ] **EmailJS Setup (`.env.local`)**: Replace the placeholder variables with your actual EmailJS credentials:
  - `VITE_EMAILJS_SERVICE_ID=your_service_id_here`
  - `VITE_EMAILJS_TEMPLATE_ID=your_template_id_here`
  - `VITE_EMAILJS_PUBLIC_KEY=your_public_key_here`
- [ ] **JWT Secret (`.env.local`)**: Change the `JWT_SECRET` placeholder (`super_secure_jwt_secret_key_change_me_in_production`) to a securely generated random string for production server security.

## 3. Firebase 
- [ ] **Firebase Setup (`lib/firebase.ts`)**: Ensure you have configured all necessary `VITE_FIREBASE_*` environment variables in your deployment environment. Currently, it defaults to hardcoded demo/placeholder values if the `.env` variables are missing.

## 4. Admin Role / Auth
- [ ] **Admin Console Passwords**: The test admin password hash is hardcoded in the `.env.local`. Create an admin registration flow or a more robust password management system rather than relying exclusively on the localized `.env.local` hardcoded hash for scaling.
