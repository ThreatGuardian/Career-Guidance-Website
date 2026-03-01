import emailjs from '@emailjs/browser';

// EmailJS Credentials
const EMAILJS_SERVICE_ID = 'service_g8zyevq';
const EMAILJS_TEMPLATE_ID_REGISTRATION = 'template_3t7oi1o';
const EMAILJS_PUBLIC_KEY = '9xz2Cudlad-sH32df';

export const EmailService = {
  sendRegistrationConfirmation: async (data: {
    name: string;
    email: string;
    serviceType: string;
    date: string;
  }) => {
    try {
      const templateParams = {
        to_name: data.name,
        to_email: data.email,
        service_type: data.serviceType === 'assessment' ? 'Aptitude Test' : 'Career Counselling',
        registration_date: data.date,
        message: `Thank you for registering for our ${data.serviceType} service. We will contact you shortly to schedule your session.`
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_REGISTRATION,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Failed to send email:', error);
      // We don't want to block the UI if email fails, just log it
      return null;
    }
  },

  sendInquiryNotification: async (data: {
    name: string;
    phone: string;
    message: string;
  }) => {
    // You would need a separate template for this or reuse the generic one
    // const EMAILJS_TEMPLATE_ID_INQUIRY = 'YOUR_TEMPLATE_ID_INQUIRY';
    // ... implementation similar to above
  }
};
