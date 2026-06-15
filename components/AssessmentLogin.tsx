import React, { useState } from 'react';
import { Mail, User, ArrowRight, ArrowLeft, Shield, Calendar, Phone, MapPin, BookOpen, GraduationCap, Users } from 'lucide-react';

interface AssessmentLoginProps {
  onLoginSuccess: (userData: any) => void;
  onBack: () => void;
}

const AssessmentLogin: React.FC<AssessmentLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    mobile: '',
    school: '',
    classYear: '',
    city: '',
    stream: '',
    parentName: '',
    parentMobile: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    const requiredFields = ['name', 'email', 'dob', 'gender', 'mobile', 'school', 'classYear', 'city'];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData].trim()) {
        setError(`Please fill in all required fields. (${field} is missing)`);
        return;
      }
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const cleanedEmail = formData.email.trim().toLowerCase();

    // Directly proceed to assessment (no eligibility check needed)
    onLoginSuccess({
      ...formData,
      email: cleanedEmail,
      name: formData.name.trim()
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white flex items-center justify-center p-4 relative py-12">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-navy mb-6 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-navy to-brand-accent p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold mb-2">
              Candidate Registration
            </h1>
            <p className="text-white/80 text-sm leading-relaxed">
              Please provide your details for the Professional Career Report.
            </p>
          </div>

          {/* Body */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="col-span-1 md:col-span-2 text-brand-navy font-bold text-lg border-b pb-2">Personal Information</div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><User size={18} /></div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><Mail size={18} /></div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><Calendar size={18} /></div>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent text-gray-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><User size={18} /></div>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent text-gray-700">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><Phone size={18} /></div>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><MapPin size={18} /></div>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

                {/* Academic Info */}
                <div className="col-span-1 md:col-span-2 text-brand-navy font-bold text-lg border-b pb-2 mt-4">Academic Information</div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">School / College *</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><BookOpen size={18} /></div>
                    <input type="text" name="school" value={formData.school} onChange={handleChange} placeholder="School / College" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Class / Year *</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><GraduationCap size={18} /></div>
                    <input type="text" name="classYear" value={formData.classYear} onChange={handleChange} placeholder="e.g. 10th Standard, B.Tech 2nd Year" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Stream (Optional)</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><GraduationCap size={18} /></div>
                    <input type="text" name="stream" value={formData.stream} onChange={handleChange} placeholder="e.g. Science, Commerce, Arts" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

                {/* Parent Info */}
                <div className="col-span-1 md:col-span-2 text-brand-navy font-bold text-lg border-b pb-2 mt-4">Parent / Guardian Information (Optional)</div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Name</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><Users size={18} /></div>
                    <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Parent Name" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Mobile</label>
                  <div className="flex rounded-xl border-2 border-gray-200 focus-within:border-brand-accent overflow-hidden transition-colors bg-white">
                    <div className="flex items-center justify-center pl-4 pr-3 text-gray-400"><Phone size={18} /></div>
                    <input type="tel" name="parentMobile" value={formData.parentMobile} onChange={handleChange} placeholder="Parent Mobile" className="flex-1 py-3.5 pr-4 text-base outline-none bg-transparent" />
                  </div>
                </div>

              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-brand-navy text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-lg shadow-brand-navy/20 mt-8"
              >
                {loading ? 'Checking...' : 'Proceed to Assessment'} <ArrowRight size={20} />
              </button>

              <div className="flex items-center justify-center text-xs text-gray-400 pt-4">
                <div className="flex items-center gap-1">
                  <Shield size={12} /> Your information is secure and used only for your report
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentLogin;
