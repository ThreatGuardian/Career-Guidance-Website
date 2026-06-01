import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePDFReport = (assessment, res) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });

      // Send headers for streaming
      res.setHeader('Content-Type', 'application/pdf');
      const dateStr = assessment.createdAt ? new Date(assessment.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      res.setHeader('Content-Disposition', `attachment; filename="Career_Assessment_Report_${dateStr}.pdf"`);
      
      doc.pipe(res);

      // --- REGISTER FONTS ---
      const fontPath = path.join(__dirname, '..', 'fonts');
      doc.registerFont('Inter-Regular', path.join(fontPath, 'Inter-Regular.ttf'));
      doc.registerFont('Inter-SemiBold', path.join(fontPath, 'Inter-SemiBold.ttf'));
      doc.registerFont('Inter-Bold', path.join(fontPath, 'Inter-Bold.ttf'));

      // Default Font
      doc.font('Inter-Regular');

      // --- STYLES & COLORS ---
      const colors = {
        navy: '#0f172a',
        accent: '#3b82f6',
        grayText: '#475569',
        lightGray: '#f1f5f9',
        white: '#ffffff',
        emerald: '#10b981',
        amber: '#f59e0b',
        purple: '#8b5cf6',
      };

      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 50;

      // ==========================================
      // PAGE 1: COVER PAGE
      // ==========================================
      doc.rect(0, 0, pageWidth, pageHeight).fill(colors.navy);
      doc.circle(pageWidth, 0, 300).fillOpacity(0.1).fill(colors.accent);
      doc.circle(0, pageHeight, 200).fillOpacity(0.1).fill(colors.purple);
      doc.fillOpacity(1);

      doc.moveDown(12);
      doc.font('Inter-Bold').fontSize(36).fillColor(colors.white).text('Professional Career', { align: 'left', indent: margin });
      doc.fontSize(36).text('Assessment Report', { align: 'left', indent: margin });
      
      doc.moveDown(2);
      doc.font('Inter-Regular').fontSize(16).fillColor(colors.accent).text('Comprehensive Psychometric Analysis', { align: 'left', indent: margin });
      
      doc.moveDown(4);
      doc.font('Inter-SemiBold').fontSize(18).fillColor(colors.white).text(`Prepared for: ${assessment.userName || assessment.userEmail}`, { align: 'left', indent: margin });
      
      doc.moveDown(0.5);
      const reportDate = assessment.createdAt ? new Date(assessment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString();
      doc.font('Inter-Regular').fontSize(14).fillColor(colors.grayText).text(`Date: ${reportDate}`, { align: 'left', indent: margin });

      // ==========================================
      // PAGE 2: CANDIDATE PROFILE
      // ==========================================
      doc.addPage();
      doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Candidate Profile');
      doc.rect(margin, doc.y + 10, 50, 4).fill(colors.accent);
      doc.moveDown(2);

      const drawProfileField = (label, value, x, y) => {
        doc.font('Inter-SemiBold').fontSize(10).fillColor(colors.grayText).text(label.toUpperCase(), x, y);
        doc.font('Inter-Regular').fontSize(14).fillColor(colors.navy).text(value || 'N/A', x, y + 15);
      };

      const startY = doc.y;
      const col1 = margin;
      const col2 = margin + 250;

      drawProfileField('Full Name', assessment.userName, col1, startY);
      drawProfileField('Date of Birth', assessment.dob, col2, startY);
      drawProfileField('Email Address', assessment.userEmail, col1, startY + 50);
      drawProfileField('Mobile Number', assessment.mobile, col2, startY + 50);
      drawProfileField('Gender', assessment.gender, col1, startY + 100);
      drawProfileField('City', assessment.city, col2, startY + 100);
      drawProfileField('School / College', assessment.school, col1, startY + 150);
      drawProfileField('Class / Year', assessment.classYear, col2, startY + 150);
      drawProfileField('Academic Stream', assessment.stream, col1, startY + 200);
      drawProfileField('Parent Name', assessment.parentName, col2, startY + 200);
      drawProfileField('Parent Mobile', assessment.parentMobile, col1, startY + 250);

      // ==========================================
      // PAGE 3: EXECUTIVE SUMMARY
      // ==========================================
      doc.addPage();
      doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Executive Summary', margin, margin);
      doc.rect(margin, doc.y + 10, 50, 4).fill(colors.accent);
      
      let currentY = doc.y + 40;
      if (assessment.reliability && assessment.reliability.level === 'Low') {
        doc.roundedRect(margin, currentY, pageWidth - (margin * 2), 60, 8).fill('#fef2f2');
        doc.font('Inter-Bold').fontSize(12).fillColor('#991b1b').text(`Reliability Warning: Score ${assessment.reliability.score}/100`, margin + 15, currentY + 15);
        doc.font('Inter-Regular').fontSize(10).fillColor('#991b1b').text('This assessment was completed very quickly. AI results may not be fully accurate.', margin + 15, currentY + 35);
        currentY += 80;
      }

      const cardWidth = (pageWidth - (margin * 2) - 20) / 2;
      
      // Holland Code
      doc.roundedRect(margin, currentY, cardWidth, 100, 8).fill(colors.lightGray);
      doc.font('Inter-SemiBold').fontSize(12).fillColor(colors.grayText).text('HOLLAND CODE', margin + 15, currentY + 15);
      doc.font('Inter-Bold').fontSize(36).fillColor(colors.accent).text(assessment.hollandCode || 'N/A', margin + 15, currentY + 40);

      // Stanine
      doc.roundedRect(margin + cardWidth + 20, currentY, cardWidth, 100, 8).fill(colors.lightGray);
      doc.font('Inter-SemiBold').fontSize(12).fillColor(colors.grayText).text('STANINE SCORE', margin + cardWidth + 35, currentY + 15);
      doc.font('Inter-Bold').fontSize(36).fillColor(colors.purple).text(assessment.stanineScore?.toString() || 'N/A', margin + cardWidth + 35, currentY + 40);
      doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText).text('/ 9', margin + cardWidth + 70, currentY + 60);

      currentY += 130;

      // Matches
      doc.font('Inter-Bold').fontSize(16).fillColor(colors.navy).text('Top Career Pathways', margin, currentY);
      currentY += 30;

      const top3 = (assessment.topCareers || []).slice(0, 3);
      top3.forEach((career, index) => {
        doc.roundedRect(margin, currentY, pageWidth - (margin * 2), 60, 8).fill('#ffffff').stroke(colors.lightGray);
        doc.circle(margin + 30, currentY + 30, 15).fill(colors.accent);
        doc.font('Inter-Bold').fontSize(14).fillColor(colors.white).text((index + 1).toString(), margin + 25, currentY + 25);
        doc.font('Inter-Bold').fontSize(14).fillColor(colors.navy).text(career.career, margin + 60, currentY + 15);
        doc.font('Inter-Regular').fontSize(10).fillColor(colors.grayText).text(career.category, margin + 60, currentY + 35);
        doc.roundedRect(pageWidth - margin - 80, currentY + 15, 65, 30, 15).fill('#ecfdf5');
        doc.font('Inter-Bold').fontSize(12).fillColor(colors.emerald).text(`${career.match}%`, pageWidth - margin - 65, currentY + 25);
        currentY += 75;
      });

      // ==========================================
      // PAGE 4: RIASEC PROFILE
      // ==========================================
      doc.addPage();
      doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Psychometric Profile: RIASEC', margin, margin);
      doc.rect(margin, doc.y + 10, 50, 4).fill(colors.accent);
      doc.moveDown(2);

      const drawBarChart = (title, dataObj, color, maxValue = 100) => {
        if (!dataObj) return;
        doc.font('Inter-Bold').fontSize(16).fillColor(colors.navy).text(title);
        doc.moveDown(1);
        
        const chartY = doc.y;
        const labels = Object.keys(dataObj);
        const maxBarWidth = pageWidth - (margin * 2) - 120;
        
        labels.forEach((label, i) => {
          if (label === '_id') return;
          const score = dataObj[label] || 0;
          const yPos = chartY + (i * 45);
          
          doc.font('Inter-SemiBold').fontSize(12).fillColor(colors.navy).text(label, margin, yPos + 5, { width: 100 });
          doc.roundedRect(margin + 105, yPos, maxBarWidth, 20, 10).fill(colors.lightGray);
          
          const filledWidth = (score / maxValue) * maxBarWidth;
          if (filledWidth > 0) {
            doc.roundedRect(margin + 105, yPos, filledWidth, 20, 10).fill(color);
          }
          
          doc.font('Inter-Bold').fontSize(12).fillColor(colors.grayText).text(`${Math.round(score)}%`, margin + 115 + maxBarWidth, yPos + 5);
        });
        
        doc.y = chartY + (labels.length * 45) + 20;
      };

      const riasecObj = assessment.riasec && assessment.riasec.toJSON ? assessment.riasec.toJSON() : (assessment.riasec || {});
      drawBarChart('Interests & Work Environments', riasecObj, colors.accent);

      // ==========================================
      // PAGE 5: BIG FIVE PERSONALITY
      // ==========================================
      doc.addPage();
      doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Personality Analysis (Big 5)', margin, margin);
      doc.rect(margin, doc.y + 10, 50, 4).fill(colors.purple);
      doc.moveDown(2);

      const personalityObj = assessment.personality && assessment.personality.toJSON ? assessment.personality.toJSON() : (assessment.personality || {});
      drawBarChart('Core Personality Traits', personalityObj, colors.purple);

      // ==========================================
      // PAGE 6: SKILLS & APTITUDE
      // ==========================================
      doc.addPage();
      doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Skills & Aptitude Profile', margin, margin);
      doc.rect(margin, doc.y + 10, 50, 4).fill(colors.emerald);
      doc.moveDown(2);

      const skillsObj = assessment.skills && assessment.skills.toJSON ? assessment.skills.toJSON() : (assessment.skills || {});
      const sortedSkills = Object.entries(skillsObj).sort((a, b) => b[1] - a[1]).slice(0, 10);
      const topSkillsObj = {};
      sortedSkills.forEach(([k, v]) => topSkillsObj[k] = v);

      drawBarChart('Top Assessed Skills', topSkillsObj, colors.emerald);

      // ==========================================
      // PAGE 7: STANINE SCORE REPORT
      // ==========================================
      doc.addPage();
      doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Stanine Score Details', margin, margin);
      doc.rect(margin, doc.y + 10, 50, 4).fill(colors.amber);
      doc.moveDown(2);

      doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText)
         .text('The Stanine (Standard Nine) score is a method of scaling test scores on a nine-point standard scale. It provides a quick way to see where you stand compared to a standard population.', { align: 'justify' });
      
      doc.moveDown(2);
      
      const stanineY = doc.y;
      const blockWidth = (pageWidth - (margin * 2)) / 9;
      for (let i = 1; i <= 9; i++) {
        const isCurrent = i === assessment.stanineScore;
        const bColor = isCurrent ? colors.amber : colors.lightGray;
        const tColor = isCurrent ? colors.white : colors.grayText;
        
        doc.roundedRect(margin + ((i - 1) * blockWidth), stanineY, blockWidth - 4, 40, 4).fill(bColor);
        doc.font('Inter-Bold').fontSize(16).fillColor(tColor).text(i.toString(), margin + ((i - 1) * blockWidth), stanineY + 12, { width: blockWidth - 4, align: 'center' });
      }

      doc.y = stanineY + 70;
      doc.font('Inter-SemiBold').fontSize(14).fillColor(colors.navy).text(`Your Score: ${assessment.stanineScore || 'N/A'}`);
      doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText).text('This indicates your overall composite aptitude based on Skills, Interests, and Personality.');

      // ==========================================
      // PAGE 8: CAREER RECOMMENDATIONS (DEEP DIVE)
      // ==========================================
      if (assessment.aiReport) {
        doc.addPage();
        doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Career Pathways Analysis', margin, margin);
        doc.rect(margin, doc.y + 10, 50, 4).fill(colors.accent);
        doc.moveDown(2);

        doc.font('Inter-Bold').fontSize(16).fillColor(colors.navy).text('Why These Careers Fit');
        doc.moveDown(0.5);
        doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText).text(assessment.aiReport.careerFitNarrative || 'N/A', { align: 'justify', lineGap: 4 });
        
        doc.moveDown(2);
        
        doc.font('Inter-Bold').fontSize(16).fillColor(colors.navy).text('Ideal Work Environment & Learning Style');
        doc.moveDown(0.5);
        doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText).text(assessment.aiReport.learningStyle || 'N/A', { align: 'justify', lineGap: 4 });

        // ==========================================
        // PAGE 9: DEVELOPMENT PLAN
        // ==========================================
        doc.addPage();
        doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Strategic Development Plan', margin, margin);
        doc.rect(margin, doc.y + 10, 50, 4).fill(colors.emerald);
        doc.moveDown(2);

        doc.font('Inter-Bold').fontSize(16).fillColor(colors.navy).text('Your Key Strengths');
        doc.moveDown(0.5);
        (assessment.aiReport.strengths || []).forEach(s => {
          doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText).text(`• ${s}`);
        });

        doc.moveDown(1.5);

        doc.font('Inter-Bold').fontSize(16).fillColor(colors.navy).text('Areas for Development');
        doc.moveDown(0.5);
        (assessment.aiReport.developmentAreas || []).forEach(d => {
          doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText).text(`• ${d}`);
        });

        doc.moveDown(1.5);

        doc.font('Inter-Bold').fontSize(16).fillColor(colors.navy).text('Academic & Upskilling Recommendations');
        doc.moveDown(0.5);
        (assessment.aiReport.academicRecommendations || []).forEach(a => {
          doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText).text(`• ${a}`);
        });

        // ==========================================
        // PAGE 10: COUNSELLOR SUMMARY
        // ==========================================
        doc.addPage();
        doc.font('Inter-Bold').fontSize(24).fillColor(colors.navy).text('Counsellor Summary & Next Steps', margin, margin);
        doc.rect(margin, doc.y + 10, 50, 4).fill(colors.purple);
        doc.moveDown(2);

        doc.font('Inter-Regular').fontSize(14).fillColor(colors.grayText).text(assessment.aiReport.conclusion || 'N/A', { align: 'justify', lineGap: 6 });
        
        doc.moveDown(4);
        
        // Sign-off
        doc.font('Inter-SemiBold').fontSize(16).fillColor(colors.navy).text('Bhagwan Pandekar', margin, doc.y);
        doc.font('Inter-Regular').fontSize(12).fillColor(colors.grayText).text('Expert Career Counsellor');
        
        doc.moveDown(0.5);
        doc.text('contact@bhagwanpandekar.com');
        doc.text('+91 9876543210');
      }

      // Finalize
      doc.end();

      res.on('finish', () => resolve());
      doc.on('error', (err) => reject(err));
      
    } catch (error) {
      reject(error);
    }
  });
};
