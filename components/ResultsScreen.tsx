import React, { useState, useEffect } from 'react';
import { UserProfile } from '../services/scoringEngine';
import { TopCareer } from '../services/careerMatching';
import { generateCareerReport, AIReport } from '../lib/aiReport';
import { trackAnalyticsEvent } from '../lib/analytics';
import emailjs from '@emailjs/browser';
import { Briefcase, Brain, Activity, ArrowLeft, Sparkles, ChevronRight, Target, Flame, Loader2, AlertCircle, BookOpen, GraduationCap, TrendingUp, Lightbulb, Send, CheckCircle2, FileText } from 'lucide-react';

interface ResultsScreenProps {
  userProfile: UserProfile;
  topCareers: TopCareer[];
  userData: any;
  answers?: Record<string, number>;
  onBookClick: () => void;
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ userProfile, topCareers, userData, answers, onBookClick, onBack }) => {
  const userId = userData.email;
  const userName = userData.name;
  const [report, setReport] = useState<AIReport | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  
  // Email states
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Scroll to top on mount and check cache
  useEffect(() => {
    window.scrollTo(0, 0);
    const cached = localStorage.getItem(`ai_report_${userId}`);
    if (cached) {
      try {
        setReport(JSON.parse(cached));
      } catch(e) {}
    }
  }, [userId]);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setError('');
    try {
      // 1. Generate Report
      const result = await generateCareerReport(userId, userProfile, topCareers);
      setReport(result);
      
      trackAnalyticsEvent('REPORT_GENERATED', userId);
      
      // 2. Persist to MongoDB permanently
      if (userName && answers) {
        try {
          const res = await fetch('/api/assessments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userEmail: userId,
              userName,
              dob: userData.dob,
              gender: userData.gender,
              mobile: userData.mobile,
              school: userData.school,
              classYear: userData.classYear,
              stream: userData.stream,
              city: userData.city,
              parentName: userData.parentName,
              parentMobile: userData.parentMobile,
              answers,
              riasec: userProfile.riasec,
              personality: userProfile.personality,
              skills: userProfile.skills,
              reliability: userProfile.reliability,
              hollandCode: userProfile.hollandCode,
              stanineScore: userProfile.stanineScore,
              topCareers,
              aiReport: result
            })
          });
          const data = await res.json();
          if (res.ok && data.assessmentId) {
            setAssessmentId(data.assessmentId);
          }
        } catch (dbErr) {
          console.error("Failed to save to MongoDB, but report generated successfully.", dbErr);
        }
      }

      // 3. scroll to report section
      setTimeout(() => {
        document.getElementById('ai-report-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Failed to generate report.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = async () => {
    if (!report) return;
    
    setIsSendingEmail(true);
    setEmailError('');
    setEmailSuccess(false);
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured. Please add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env.local file.');
      }
      
      const templateParams = {
        to_email: userId, // Assessment login saves email as userId
        profile_summary: report.conclusion,
        strengths: report.strengths.join(', '),
        growth_areas: report.developmentAreas.join(', '),
        learning_style: report.learningStyle,
        work_style: report.academicRecommendations.join(', '),
        career_recommendations: report.careerFitNarrative,
        why_these_fit: report.careerFitNarrative,
      };
      
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setEmailSuccess(true);
      
      trackAnalyticsEvent('EMAIL_SENT', userId);
      
      // Hide success message after 5 seconds
      setTimeout(() => setEmailSuccess(false), 5000);
    } catch (err: any) {
      setEmailError(err.message || 'Failed to send email. Please try again.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 85) return 'text-emerald-500 bg-emerald-50 border-emerald-200';
    if (match >= 75) return 'text-amber-500 bg-amber-50 border-amber-200';
    return 'text-blue-500 bg-blue-50 border-blue-200';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-brand-accent';
    if (score >= 40) return 'bg-blue-400';
    return 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-brand-navy text-white pt-16 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-brand-accent/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-emerald-500/30">
              <Sparkles size={24} className="text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold">Your Career Matches</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            We've analysed your interests, personality, and skills. Here are the career paths that align best with your unique profile.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-20 space-y-8">
        
        {/* Reliability Warning Banner */}
        {userProfile.reliability?.level === 'Low' && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-md flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
            <AlertCircle size={24} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800">Low Reliability Score ({userProfile.reliability.score}/100)</h3>
              <p className="text-red-700 text-sm mt-1">
                We noticed your assessment was completed extremely quickly or had a very repetitive pattern of answers. 
                The AI recommendations below may not be entirely accurate. We recommend taking the assessment again in the future for best results.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Top Careers */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Briefcase size={24} className="text-brand-accent" />
                  <h2 className="text-2xl font-bold text-brand-navy">Top 10 Recommendations</h2>
                </div>
                {!report && (
                  <button 
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-gradient-to-r from-brand-accent to-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100"
                  >
                    {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    {isGenerating ? 'Analyzing...' : 'Generate AI Report'}
                  </button>
                )}
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 border border-red-100">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                {topCareers.map((career, index) => {
                  const isTop3 = index < 3;
                  return (
                    <div 
                      key={career.id}
                      onClick={() => trackAnalyticsEvent('TOP_CAREER_CLICKED', userId, { career: career.career })}
                      className={`relative overflow-hidden rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-lg group cursor-pointer ${
                        isTop3 ? 'border-brand-accent/20 bg-gradient-to-r from-blue-50/50 to-transparent' : 'border-gray-100 bg-white hover:border-blue-200'
                      }`}
                    >
                      {/* Match Score Badge */}
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                        <div className={`px-4 py-2 rounded-xl font-bold text-lg border ${getMatchColor(career.match)}`}>
                          {career.match}% Match
                        </div>
                      </div>

                      <div className="p-5 md:p-6 pr-40">
                        <div className="flex items-center gap-4 mb-1">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                            isTop3 ? 'bg-brand-accent text-white shadow-md' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800">{career.career}</h3>
                        </div>
                        <div className="flex items-center gap-2 ml-12 text-sm font-medium text-gray-500">
                          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                          {career.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Breakdown */}
          <div className="space-y-6">
            
            {/* RIASEC Profile */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Target size={20} className="text-emerald-500" />
                <h3 className="text-lg font-bold text-brand-navy">Interests (RIASEC)</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { key: 'R', label: 'Realistic (Doer)' },
                  { key: 'I', label: 'Investigative (Thinker)' },
                  { key: 'A', label: 'Artistic (Creator)' },
                  { key: 'S', label: 'Social (Helper)' },
                  { key: 'E', label: 'Enterprising (Persuader)' },
                  { key: 'C', label: 'Conventional (Organizer)' },
                ].map((item) => {
                  const score = userProfile.riasec[item.key] || 0;
                  return (
                    <div key={item.key}>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="text-brand-navy">{score}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getProgressBarColor(score)} transition-all duration-1000`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Personality (Big 5) */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Brain size={20} className="text-purple-500" />
                <h3 className="text-lg font-bold text-brand-navy">Personality</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { key: 'Openness', label: 'Openness to Experience' },
                  { key: 'Conscientiousness', label: 'Conscientiousness' },
                  { key: 'Extraversion', label: 'Extraversion' },
                  { key: 'Agreeableness', label: 'Agreeableness' },
                  { key: 'EmotionalStability', label: 'Emotional Stability' },
                ].map((item) => {
                  const score = userProfile.personality[item.key as keyof typeof userProfile.personality] || 0;
                  return (
                    <div key={item.key}>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="text-brand-navy">{score}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getProgressBarColor(score)} transition-all duration-1000`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Assessed Skills */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Flame size={20} className="text-orange-500" />
                <h3 className="text-lg font-bold text-brand-navy">Assessed Strengths</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(userProfile.skills) as [string, number][])
                  .filter(([_, score]) => score >= 60)
                  .sort((a, b) => b[1] - a[1])
                  .map(([skill, _]) => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 uppercase tracking-wide"
                    >
                      {skill.replace(/_/g, ' ')}
                    </span>
                  ))}
              </div>
            </div>

          </div>
        </div>

        {/* AI Report Section */}
        {report && (
          <div id="ai-report-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Report Header */}
            <div className="bg-gradient-to-br from-brand-navy to-blue-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Sparkles size={24} className="text-yellow-400" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold">AI Career Analysis</h2>
                </div>
                <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mb-8">
                  {report.conclusion}
                </p>

                {/* Email Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={handleSendEmail}
                    disabled={isSendingEmail || emailSuccess}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-medium transition-all backdrop-blur-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSendingEmail ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : emailSuccess ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : (
                      <Send size={18} />
                    )}
                    {isSendingEmail ? 'Sending...' : emailSuccess ? 'Sent successfully!' : 'Email me this report'}
                  </button>
                  
                  {emailError && (
                    <div className="text-red-300 text-sm bg-red-900/40 px-3 py-2 rounded-lg border border-red-500/30">
                      {emailError}
                    </div>
                  )}

                  {assessmentId && (
                    <button
                      onClick={() => window.open(`/api/report/pdf/${assessmentId}`, '_blank')}
                      className="flex items-center gap-2 bg-white hover:bg-gray-50 text-brand-navy border border-transparent px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md"
                    >
                      <FileText size={18} />
                      Download PDF
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Strengths & Growth */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                  <TrendingUp className="text-emerald-500" /> Key Strengths
                </h3>
                <ul className="space-y-3 mb-8">
                  {report.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                  <Activity className="text-amber-500" /> Areas for Growth
                </h3>
                <ul className="space-y-3">
                  {report.developmentAreas.map((g, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning & Work Style */}
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-[calc(50%-1rem)]">
                  <h3 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                    <BookOpen className="text-blue-500" /> Learning Style
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{report.learningStyle}</p>
                </div>
                
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-[calc(50%-1rem)]">
                  <h3 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                    <Briefcase className="text-purple-500" /> Academic Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {report.academicRecommendations.map((rec, i) => (
                      <li key={i} className="text-gray-700 leading-relaxed flex items-start gap-2">
                        <span className="text-purple-500">•</span> {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Career Recommendations Deep Dive */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-3">
                <Lightbulb className="text-brand-accent" size={28} /> 
                Career Recommendations Deep Dive
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Career Fit Narrative</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">{report.careerFitNarrative}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Escalation CTA */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-brand-navy rounded-3xl p-10 md:p-12 text-center text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
          <div className="relative z-10">
            <GraduationCap size={48} className="mx-auto mb-6 text-brand-accent opacity-90" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Need deeper guidance?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Our expert counsellors can help you interpret these results and build a concrete action plan for your future.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => {
                  trackAnalyticsEvent('COUNSELLING_CLICKED', userId);
                  onBookClick();
                }}
                className="bg-brand-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-accent/90 transition-all hover:scale-105 shadow-lg shadow-brand-accent/30"
              >
                Book Career Counselling
              </button>
              <button 
                onClick={() => {
                  trackAnalyticsEvent('COUNSELLING_CLICKED', userId);
                  onBookClick();
                }}
                className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                Explore Full Aptitude Test
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResultsScreen;
