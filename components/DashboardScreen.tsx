import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Briefcase, FileText, ChevronRight, Loader2, AlertCircle, Download } from 'lucide-react';

interface AssessmentHistoryItem {
  _id: string;
  createdAt: string;
  userName: string;
  topCareers: Array<{ career: string; match: number; category: string }>;
}

interface DashboardScreenProps {
  userEmail: string;
  onBack: () => void;
  onViewReport: (fullAssessmentData: any) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ userEmail, onBack, onViewReport }) => {
  const [history, setHistory] = useState<AssessmentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHistory();
  }, [userEmail]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/assessments/${userEmail}`);
      if (!res.ok) throw new Error('Failed to fetch history');
      const data = await res.json();
      setHistory(data);
    } catch (err: any) {
      setError('Failed to load your assessments. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReport = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/assessments/report/${id}`);
      if (!res.ok) throw new Error('Failed to load full report');
      const fullData = await res.json();
      onViewReport(fullData);
    } catch (err) {
      alert('Failed to open report. Please try again.');
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-brand-navy text-white pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-brand-accent/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">My Assessments</h1>
          <p className="text-blue-100 text-lg">
            Track your career growth and review past AI analyses.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
          
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Loader2 size={40} className="animate-spin mb-4 text-brand-accent" />
              <p>Loading your history...</p>
            </div>
          ) : error ? (
            <div className="py-12 flex flex-col items-center justify-center text-red-500">
              <AlertCircle size={40} className="mb-4" />
              <p>{error}</p>
              <button 
                onClick={fetchHistory}
                className="mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : history.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">No Assessments Yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-8">
                You haven't taken a career assessment yet. Head back to the home page to start your discovery journey.
              </p>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-brand-navy text-white rounded-xl font-semibold hover:bg-brand-accent transition-colors shadow-lg shadow-brand-navy/20"
              >
                Take Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <Clock className="text-brand-accent" size={24} />
                <h2 className="text-2xl font-bold text-brand-navy">History</h2>
                <span className="ml-auto bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                  {history.length} Record{history.length !== 1 ? 's' : ''}
                </span>
              </div>

              {history.map((item) => (
                <div 
                  key={item._id}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border-2 border-gray-100 hover:border-brand-accent/30 transition-all hover:shadow-lg bg-white"
                >
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
                      <Clock size={16} />
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={20} className="text-brand-navy" />
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.topCareers[0]?.career || 'Analysis Pending'}
                      </h3>
                    </div>
                    {item.topCareers.length > 1 && (
                      <p className="text-sm text-gray-500 mt-1 pl-7">
                        + {item.topCareers[1]?.career}, {item.topCareers[2]?.career}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button
                      onClick={() => {
                        window.open(`/api/report/pdf/${item._id}`, '_blank');
                      }}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:text-brand-navy hover:border-gray-300 rounded-xl font-medium transition-all group-hover:-translate-y-0.5"
                    >
                      <Download size={18} />
                      <span className="hidden sm:inline">PDF</span>
                    </button>

                    <button
                      onClick={() => handleOpenReport(item._id)}
                      disabled={loadingId === item._id}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-50 text-brand-navy hover:bg-brand-accent hover:text-white rounded-xl font-semibold transition-all group-hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {loadingId === item._id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          View Full Report <ChevronRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
