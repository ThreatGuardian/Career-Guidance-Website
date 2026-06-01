import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import reportRoutes from './routes/reportRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local in the root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet());
app.use(cors()); // Allow frontend to call the API directly if needed
app.use(express.json({ limit: '1mb' })); // Limit payload size

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
const generateReportLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit AI generation to 20 per hour per IP
  message: 'AI generation rate limit exceeded. Please try again later.'
});

app.use('/api/', apiLimiter);

// Routes
app.use('/api/generate-report', generateReportLimiter); // Apply stricter limit
app.use('/api', reportRoutes); // POST /api/generate-report
app.use('/api/assessments', assessmentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running securely' });
});

// Centralized Error Handler (must be after routes)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
