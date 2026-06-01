import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      ref: 'User',
      index: true,
    },
    userName: {
      type: String,
      required: true,
    },
    answers: {
      type: Map,
      of: Number,
      required: true,
    },
    dob: String,
    gender: String,
    mobile: String,
    school: String,
    classYear: String,
    stream: String,
    city: String,
    parentName: String,
    parentMobile: String,
    hollandCode: String,
    stanineScore: Number,
    riasec: {
      R: Number, I: Number, A: Number, S: Number, E: Number, C: Number
    },
    personality: {
      Openness: Number,
      Conscientiousness: Number,
      Extraversion: Number,
      Agreeableness: Number,
      EmotionalStability: Number
    },
    skills: {
      type: Map,
      of: Number
    },
    reliability: {
      score: Number,
      level: String
    },
    topCareers: [
      {
        id: String,
        career: String,
        category: String,
        match: Number
      }
    ],
    aiReport: {
      strengths: [String],
      developmentAreas: [String],
      learningStyle: String,
      academicRecommendations: [String],
      careerFitNarrative: String,
      conclusion: String
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;
