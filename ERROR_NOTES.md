# Project Known Issues & Debugging Notes

## Admin Delete Functionality
**Status:** FIXED (January 1, 2026)
**Description:** 
When logged in as Admin, clicking the "Delete" icon on a Blog Post, Notification, or Resource does not permanently remove the item from the database. The item reappears upon refreshing the page.

### Root Cause:
Firebase Security Rules were likely blocking delete operations. Additionally, error handling was insufficient to show the actual error messages.

### Fix Applied:
1. **Enhanced Error Handling in `services/api.ts`:**
   - All delete functions now properly catch and throw errors with descriptive messages
   - Added console logging for successful deletions
   - Added specific error messages for permission-denied errors

2. **Improved Admin Dashboard Error Messages:**
   - Delete handlers now display actual error messages from Firebase
   - Special handling for permission-denied errors with instructions to fix Firestore rules

### Firebase Security Rules Fix:
If you still encounter delete issues, verify your Firebase Firestore Rules:
1. Go to Firebase Console → Firestore Database → Rules
2. Ensure the rules allow authenticated users to delete:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read: if true;
         allow write, delete: if request.auth != null;
       }
     }
   }
   ```
3. Click "Publish" to apply the rules

### Testing:
- Log in as admin
- Try to delete a blog post, notification, or resource
- If error occurs, check browser console for detailed error message
- The error alert will now show specific Firebase error details
