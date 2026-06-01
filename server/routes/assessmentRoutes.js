import express from 'express';
import User from '../models/User.js';
import Assessment from '../models/Assessment.js';

const router = express.Router();

// 1. Check Retake Eligibility (30 days policy)
router.get('/check-eligibility/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    // Allow Admin to bypass the 30-day wait for testing
    if (email === process.env.ADMIN_EMAIL) {
      return res.status(200).json({ eligible: true, message: 'Admin bypass active.' });
    }

    const lastAssessment = await Assessment.findOne({ userEmail: email }).sort({ createdAt: -1 });

    if (!lastAssessment) {
      return res.status(200).json({ eligible: true });
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (lastAssessment.createdAt > thirtyDaysAgo) {
      const daysUntilEligible = Math.ceil((lastAssessment.createdAt.getTime() - thirtyDaysAgo.getTime()) / (1000 * 3600 * 24));
      return res.status(200).json({ 
        eligible: false, 
        message: `You can take your next assessment in ${daysUntilEligible} days.`,
        daysRemaining: daysUntilEligible
      });
    }

    return res.status(200).json({ eligible: true });
  } catch (error) {
    next(error);
  }
});

// 2. Save Assessment
router.post('/', async (req, res, next) => {
  try {
    const { 
      userName, userEmail, answers, riasec, personality, skills, 
      topCareers, aiReport, 
      dob, gender, mobile, school, classYear, stream, city, parentName, parentMobile, 
      hollandCode, stanineScore 
    } = req.body;

    if (!userEmail || !userName) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Verify eligibility again on backend
    const lastAssessment = await Assessment.findOne({ userEmail }).sort({ createdAt: -1 });
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Bypass for Admin
    if (userEmail !== process.env.ADMIN_EMAIL && lastAssessment && lastAssessment.createdAt > thirtyDaysAgo) {
      return res.status(403).json({ error: 'Retake policy violation: Assessment taken within last 30 days.' });
    }

    // Upsert User
    let user = await User.findOne({ email: userEmail });
    if (!user) {
      user = await User.create({ name: userName, email: userEmail });
    }

    // Save Assessment
    const newAssessment = await Assessment.create({
      userEmail,
      userName,
      answers,
      riasec,
      personality,
      skills,
      topCareers,
      aiReport,
      dob, gender, mobile, school, classYear, stream, city, parentName, parentMobile,
      hollandCode, stanineScore
    });

    res.status(201).json({ message: 'Assessment saved successfully', assessmentId: newAssessment._id });
  } catch (error) {
    next(error);
  }
});

// 3. Get User Assessments (Dashboard)
router.get('/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const assessments = await Assessment.find({ userEmail: email })
      .sort({ createdAt: -1 })
      .select('createdAt userName topCareers'); // Only return necessary fields for dashboard list

    res.status(200).json(assessments);
  } catch (error) {
    next(error);
  }
});

// 4. Get Specific Assessment Report
router.get('/report/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const assessment = await Assessment.findById(id);

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    res.status(200).json(assessment);
  } catch (error) {
    next(error);
  }
});

export default router;
