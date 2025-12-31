# Project Known Issues & Debugging Notes

## Critical Bug: Admin Delete Functionality
**Status:** Pending / Deferred
**Description:** 
When logged in as Admin, clicking the "Delete" icon on a Blog Post, Notification, or Resource does not permanently remove the item from the database. The item reappears upon refreshing the page.

### Potential Causes to Investigate:
1.  **Firebase Security Rules:** 
    - The most likely culprit. If rules are set to `allow write: if false;` or have strict validation, the delete request is being rejected by Google servers.
    - **Fix:** Go to Firebase Console -> Firestore -> Rules and ensure it says: `allow write: if request.auth != null;`

2.  **API Error Handling:**
    - The error might be `permission-denied`, but the UI alert isn't showing the raw error code clearly enough.

3.  **State vs. DB Sync:**
    - The `refreshAllData()` function might be fetching cached data instead of live data from the server immediately after the delete attempt.

### Future Action Plan:
- [ ] Check Firebase Console Rules.
- [ ] Add `console.log` for the specific error code in `services/api.ts`.
- [ ] Verify Document IDs match exactly between UI and Database.
