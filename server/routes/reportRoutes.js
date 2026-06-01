import express from 'express';
import { generateCareerReportFromGroq } from '../services/groqService.js';
import Assessment from '../models/Assessment.js';
import { generatePDFReport } from '../services/pdfService.js';

const router = express.Router();

router.post('/generate-report', async (req, res, next) => {
  try {
    const { profile, topCareers } = req.body;

    // Validate payload
    if (!profile || !topCareers) {
      return res.status(400).json({ error: 'Missing profile or topCareers in request body' });
    }
    
    if (!profile.riasec || !profile.personality || !profile.skills) {
      return res.status(400).json({ error: 'Malformed profile object' });
    }

    // Call service
    const report = await generateCareerReportFromGroq(profile, topCareers);
    
    return res.status(200).json(report);
  } catch (error) {
    next(error);
  }
});

router.get('/report/pdf/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find assessment
    const assessment = await Assessment.findById(id);
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    // Generate and stream PDF
    await generatePDFReport(assessment, res);
    
  } catch (error) {
    next(error);
  }
});

export default router;
