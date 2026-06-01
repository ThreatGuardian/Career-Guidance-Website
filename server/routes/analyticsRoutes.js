import express from 'express';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

const router = express.Router();

router.post('/track', async (req, res, next) => {
  try {
    const { eventType, userEmail, metadata } = req.body;

    if (!eventType || !userEmail) {
      return res.status(400).json({ error: 'Missing required tracking fields' });
    }

    await AnalyticsEvent.create({
      eventType,
      userEmail,
      metadata
    });

    res.status(201).json({ success: true });
  } catch (error) {
    // We intentionally don't want analytics tracking errors to crash or block the user experience,
    // but we'll still pass to the error handler to log it.
    console.error('Analytics tracking error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to track event' });
  }
});

export default router;
