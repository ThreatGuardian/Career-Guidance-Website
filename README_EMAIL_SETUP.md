# Email Setup Instructions

To enable real email sending, we are using **EmailJS**. This allows you to send emails directly from the frontend without a backend server.

## Steps to Configure:

1.  **Create an Account:**
    *   Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account.

2.  **Add an Email Service:**
    *   In the EmailJS dashboard, go to the **Email Services** tab.
    *   Click **Add New Service**.
    *   Select **Gmail** (or your preferred provider).
    *   Connect your account and click **Create Service**.
    *   Copy the **Service ID** (e.g., `service_xyz123`).

3.  **Create an Email Template:**
    *   Go to the **Email Templates** tab.
    *   Click **Create New Template**.
    *   Design your email. You can use these variables in your template:
        *   `{{to_name}}` - The student's name
        *   `{{to_email}}` - The student's email
        *   `{{service_type}}` - "Aptitude Test" or "Career Counselling"
        *   `{{registration_date}}` - Date of registration
        *   `{{message}}` - The custom message
    *   Save the template.
    *   Copy the **Template ID** (e.g., `template_abc456`).

4.  **Get Your Public Key:**
    *   Go to the **Account** page (click your avatar in the top right).
    *   Copy the **Public Key** (e.g., `user_123456789`).

5.  **Update the Code:**
    *   Open the file `services/email.ts`.
    *   Replace the placeholder values with your actual IDs:

    ```typescript
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID_REGISTRATION = 'YOUR_TEMPLATE_ID_REGISTRATION';
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    ```

## Testing:
Once configured, try registering a new student on the website. You should receive an email at the address you provided in the form.
