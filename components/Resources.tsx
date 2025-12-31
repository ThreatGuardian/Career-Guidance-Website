import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Calendar, Award, FileText, ExternalLink } from 'lucide-react';
import { ExamInfo, ScholarshipInfo } from '../types';

const exams: ExamInfo[] = [
  { name: 'JEE Main & Advanced', category: 'Engineering', date: 'January / April' },
  { name: 'NEET (UG)', category: 'Medical', date: 'May' },
  { name: 'MHT-CET', category: 'Engineering/Pharmacy', date: 'May' },
  { name: 'CLAT', category: 'Law', date: 'December' },
  { name: 'NATA', category: 'Architecture', date: 'April / June' },
  { name: 'NDA', category: 'Defence', date: 'April / September' },
];

const scholarships: ScholarshipInfo[] = [
  { name: 'National Talent Search Exam (NTSE)', eligibility: 'Class 10th', deadline: 'September' },
  { name: 'KVPY Fellowship', eligibility: 'Science Stream (11th/12th)', deadline: 'August' },
  { name: 'Inspire Scholarship', eligibility: 'Top 1% in 12th Board', deadline: 'October' },
  { name: 'G.O.I. Scholarship', eligibility: 'Minority Communities', deadline: 'November' },
];

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exams' | 'scholarships'>('exams');

  return (
    <section id="resources" className="py-20 bg-brand-light/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Student Resource Hub" 
          subtitle="Stay updated with important entrance exams and scholarship opportunities."
        />

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur p-1.5 rounded-full shadow-sm border border-gray-200 inline-flex">
              <button
                onClick={() => setActiveTab('exams')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'exams' 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'text-gray-600 hover:text-brand-navy'
                }`}
              >
                Entrance Exams
              </button>
              <button
                onClick={() => setActiveTab('scholarships')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'scholarships' 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'text-gray-600 hover:text-brand-navy'
                }`}
              >
                Scholarships
              </button>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-white/50 overflow-hidden min-h-[400px]">
            
            {activeTab === 'exams' && (
              <div className="p-6 md:p-8 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-brand-accent" size={24} />
                  <h3 className="text-xl font-heading font-bold text-gray-800">Key Entrance Exams</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-sm uppercase text-gray-500 font-semibold tracking-wider">
                        <th className="py-4 px-4">Exam Name</th>
                        <th className="py-4 px-4">Category</th>
                        <th className="py-4 px-4">Tentative Month</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {exams.map((exam, i) => (
                        <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-brand-navy">{exam.name}</td>
                          <td className="py-4 px-4 text-gray-600">{exam.category}</td>
                          <td className="py-4 px-4 text-gray-600">
                            <span className="inline-flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded text-xs font-medium">
                              <Calendar size={12} /> {exam.date}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'scholarships' && (
              <div className="p-6 md:p-8 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-brand-accent" size={24} />
                  <h3 className="text-xl font-heading font-bold text-gray-800">Scholarship Opportunities</h3>
                </div>
                <div className="grid gap-4">
                  {scholarships.map((sch, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-100 rounded-xl hover:border-brand-accent/30 hover:shadow-md transition-all bg-white/50">
                      <div>
                        <h4 className="font-bold text-lg text-brand-navy mb-1">{sch.name}</h4>
                        <p className="text-sm text-gray-600">Eligibility: {sch.eligibility}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 uppercase font-semibold">Deadline</p>
                          <p className="text-sm font-medium text-brand-slate">{sch.deadline}</p>
                        </div>
                        <button className="p-2 text-brand-accent hover:bg-blue-50 rounded-full transition-colors" aria-label="More Info">
                            <ExternalLink size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic bg-white/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
              * Dates and eligibility criteria are subject to change by respective conducting bodies. Please consult officially.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;