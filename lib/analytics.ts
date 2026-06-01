export type AnalyticsEventType = 
  | 'ASSESSMENT_STARTED'
  | 'ASSESSMENT_COMPLETED'
  | 'REPORT_GENERATED'
  | 'EMAIL_SENT'
  | 'COUNSELLING_CLICKED'
  | 'COUNSELLING_FORM_SUBMITTED'
  | 'TOP_CAREER_CLICKED';

export const trackAnalyticsEvent = (eventType: AnalyticsEventType, userEmail: string, metadata?: Record<string, any>) => {
  // Fire and forget
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      eventType,
      userEmail,
      metadata
    })
  }).catch(err => {
    // Silently fail if analytics tracking fails to not disrupt user experience
    console.debug('Failed to track analytics event', err);
  });
};
