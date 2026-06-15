import emailjs from '@emailjs/browser';

// EmailJS Credentials — reads from env vars with fallback
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_g8zyevq';
const EMAILJS_TEMPLATE_ID_REGISTRATION = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTRATION || 'template_3t7oi1o';
const EMAILJS_TEMPLATE_ID_REPORT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REPORT || 'template_cyx10oq';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '9xz2Cudlad-sH32df';

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

  /**
   * Sends the AI Career Assessment report to the student's email.
   * Uses the dedicated report template (template_cyx10oq).
   */
  sendAssessmentReport: async (data: {
    to_name: string;
    to_email: string;
    profile_summary: string;
    strengths: string;
    growth_areas: string;
    learning_style: string;
    work_style: string;
    career_recommendations: string;
    top_careers: string;
  }) => {
    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_REPORT,
        data,
        EMAILJS_PUBLIC_KEY
      );
      console.log('Assessment report email sent:', response);
      return response;
    } catch (error) {
      console.error('Failed to send assessment report email:', error);
      throw error; // Re-throw so the caller can show an error message
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
