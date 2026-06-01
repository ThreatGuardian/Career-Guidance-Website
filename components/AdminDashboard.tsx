import React, { useState, useEffect } from 'react';
import { 
  Users, ClipboardList, FileText, PhoneCall, Activity, CheckCircle, Target, TrendingUp, LogOut, Loader2, AlertCircle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

interface Metrics {
  totalUsers: number;
  totalAssessments: number;
  totalReports: number;
  counsellingRequests: number;
  completionRate: number;
  avgReliability: number;
  topCareers: { career: string; count: number }[];
  monthlyGrowth: { name: string; Assessments: number }[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onLogout }) => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/admin/metrics', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            onLogout();
            return;
          }
          throw new Error('Failed to fetch metrics');
        }

        const data = await res.json();
        setMetrics(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [token, onLogout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-navy animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={onLogout}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, subValue, colorClass }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {subValue && <span className="text-sm font-medium text-gray-400">{subValue}</span>}
        </div>
      </div>
    </div>
  );

  const COLORS = ['#0f172a', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl text-brand-navy">Career Guidance Admin</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-medium transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="xl:col-span-2">
            <StatCard 
              icon={Users} title="Total Unique Users" 
              value={metrics.totalUsers} 
              colorClass="bg-blue-50 text-blue-600"
            />
          </div>
          <div className="xl:col-span-2">
            <StatCard 
              icon={ClipboardList} title="Total Assessments" 
              value={metrics.totalAssessments} 
              colorClass="bg-emerald-50 text-emerald-600"
            />
          </div>
          <div className="xl:col-span-2">
            <StatCard 
              icon={FileText} title="AI Reports Generated" 
              value={metrics.totalReports} 
              colorClass="bg-purple-50 text-purple-600"
            />
          </div>
          <div className="xl:col-span-2">
            <StatCard 
              icon={PhoneCall} title="Counselling Requests" 
              value={metrics.counsellingRequests} 
              colorClass="bg-amber-50 text-amber-600"
            />
          </div>
          <div className="xl:col-span-2">
            <StatCard 
              icon={CheckCircle} title="Completion Rate" 
              value={`${metrics.completionRate}%`} 
              subValue="of started"
              colorClass="bg-indigo-50 text-indigo-600"
            />
          </div>
          <div className="xl:col-span-2">
            <StatCard 
              icon={Target} title="Avg. Reliability Score" 
              value={`${metrics.avgReliability}/100`} 
              colorClass={metrics.avgReliability < 70 ? "bg-red-50 text-red-600" : "bg-teal-50 text-teal-600"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Growth Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-brand-accent" size={20} />
              Monthly Assessments Growth
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.monthlyGrowth} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Assessments" 
                    stroke="#0f172a" 
                    strokeWidth={3} 
                    dot={{ fill: '#0f172a', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: '#3b82f6' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Careers Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="text-brand-accent" size={20} />
              Most Recommended Careers
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.topCareers} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="career" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={150} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                    {metrics.topCareers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;