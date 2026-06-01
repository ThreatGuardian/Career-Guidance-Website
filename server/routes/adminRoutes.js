import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { requireAdmin } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Assessment from '../models/Assessment.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';

const router = express.Router();

// 1. Admin Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      return res.status(500).json({ error: 'Server configuration error: Admin credentials not set' });
    }

    if (email !== adminEmail) {
      return res.status(401).json({ error: 'Authentication failed', message: 'Invalid credentials' });
    }

    // Since the env var has single quotes around it due to Vite escaping, we should clean it
    const cleanHash = adminPasswordHash.replace(/^'|'$/g, '');
    const isMatch = await bcrypt.compare(password, cleanHash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Authentication failed', message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

// 2. Admin Dashboard Metrics (Protected)
router.get('/metrics', requireAdmin, async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAssessments = await Assessment.countDocuments();
    const totalReports = await AnalyticsEvent.countDocuments({ eventType: 'REPORT_GENERATED' });
    const counsellingRequests = await AnalyticsEvent.countDocuments({ eventType: 'COUNSELLING_FORM_SUBMITTED' });

    // Aggregate average reliability
    const reliabilityAgg = await Assessment.aggregate([
      { $match: { "reliability.score": { $exists: true } } },
      { $group: { _id: null, avgScore: { $avg: "$reliability.score" } } }
    ]);
    const avgReliability = reliabilityAgg.length > 0 ? Math.round(reliabilityAgg[0].avgScore) : 0;

    // Assessment Completion Rate
    const starts = await AnalyticsEvent.countDocuments({ eventType: 'ASSESSMENT_STARTED' });
    const completions = await AnalyticsEvent.countDocuments({ eventType: 'ASSESSMENT_COMPLETED' });
    const completionRate = starts > 0 ? Math.round((completions / starts) * 100) : 0;

    // Most Recommended Careers
    const topCareersAgg = await Assessment.aggregate([
      { $unwind: "$topCareers" },
      { $group: { _id: "$topCareers.career", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Monthly Growth (Assessment starts in the last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyGrowth = await AnalyticsEvent.aggregate([
      { 
        $match: { 
          eventType: 'ASSESSMENT_COMPLETED',
          createdAt: { $gte: sixMonthsAgo }
        } 
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Map month numbers to short names for chart
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedGrowth = monthlyGrowth.map(m => ({
      name: monthNames[m._id - 1],
      Assessments: m.count
    }));

    res.status(200).json({
      totalUsers,
      totalAssessments,
      totalReports,
      counsellingRequests,
      completionRate,
      avgReliability,
      topCareers: topCareersAgg.map(c => ({ career: c._id, count: c.count })),
      monthlyGrowth: formattedGrowth
    });
  } catch (error) {
    next(error);
  }
});

export default router;
