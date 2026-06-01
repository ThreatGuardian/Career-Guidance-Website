import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: [
        'ASSESSMENT_STARTED',
        'ASSESSMENT_COMPLETED',
        'REPORT_GENERATED',
        'EMAIL_SENT',
        'COUNSELLING_CLICKED',
        'COUNSELLING_FORM_SUBMITTED',
        'TOP_CAREER_CLICKED'
      ],
      index: true
    },
    userEmail: {
      type: String,
      required: true,
      index: true
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);
export default AnalyticsEvent;
