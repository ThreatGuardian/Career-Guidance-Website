import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Calendar, Award, FileText, ExternalLink, GraduationCap, ChevronRight, Building2, Wallet, Briefcase, Map, ArrowDown, CheckCircle2, Compass } from 'lucide-react';
import { ScholarshipInfo, CareerPath } from '../types';
import { CAREER_PATHS, DETAILED_EXAMS } from './ResourceData';
import CareerPathExplorer from './CareerPathExplorer';

const scholarships: ScholarshipInfo[] = [
  { name: 'National Talent Search Exam (NTSE)', eligibility: 'Class 10th', deadline: 'September' },
  { name: 'KVPY Fellowship', eligibility: 'Science Stream (11th/12th)', deadline: 'August' },
  { name: 'Inspire Scholarship', eligibility: 'Top 1% in 12th Board', deadline: 'October' },
  { name: 'G.O.I. Scholarship', eligibility: 'Minority Communities', deadline: 'November' },
];

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'career' | 'exams' | 'scholarships' | 'guide'>('career');
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [showRoadmap, setShowRoadmap] = useState(false);

  return (
    <section id="resources" className="py-20 bg-brand-light/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Student Resource Hub" 
          subtitle="Explore career paths, entrance exams, and scholarship opportunities."
        />

        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/80 backdrop-blur p-1.5 rounded-full shadow-sm border border-gray-200 inline-flex flex-wrap justify-center gap-1">
              <button
                onClick={() => setActiveTab('career')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'career' 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'text-gray-600 hover:text-brand-navy'
                }`}
              >
                Career Explorer
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'guide' 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'text-gray-600 hover:text-brand-navy'
                }`}
              >
                <Compass size={16} /> Interactive Guide
              </button>
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

          {/* --- TAB 4: INTERACTIVE GUIDE --- */}
          {activeTab === 'guide' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CareerPathExplorer />
            </div>
          )}

          {/* --- TAB 1: CAREER EXPLORER --- */}
          {activeTab === 'career' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {!selectedCareer ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CAREER_PATHS.map((career) => (
                    <div 
                      key={career.id}
                      onClick={() => setSelectedCareer(career)}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-accent/30 hover:-translate-y-1 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-navy mb-4 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                        <career.icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{career.category}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{career.description}</p>
                      <div className="flex items-center text-brand-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Explore Path <ChevronRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
                  <div className="bg-brand-navy text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                        <selectedCareer.icon size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedCareer.category}</h3>
                        <p className="text-blue-200 text-sm mt-1">Career Overview & Opportunities</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                       <button 
                        onClick={() => setShowRoadmap(!showRoadmap)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${showRoadmap ? 'bg-white text-brand-navy' : 'bg-brand-accent text-white hover:bg-brand-accent/90'}`}
                      >
                        {showRoadmap ? <FileText size={16}/> : <Map size={16}/>}
                        {showRoadmap ? 'View Details' : 'View Roadmap'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCareer(null); setShowRoadmap(false); }}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Change Path
                      </button>
                    </div>
                  </div>
                  
                  
                  {showRoadmap ? (
                    <div className="p-6 md:p-8 bg-gray-50/50">
                        <div className="max-w-3xl mx-auto">
                            <h4 className="text-xl font-bold text-brand-navy mb-8 text-center">Your Journey to {selectedCareer.category}</h4>
                            <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200"></div>

                                <div className="space-y-8">
                                    {selectedCareer.roadmap?.map((step, index) => (
                                        <div key={index} className="relative flex gap-6 group animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                            {/* Icon/Number */}
                                            <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center shadow-sm group-hover:border-brand-accent transition-colors">
                                                <span className="text-xl font-bold text-brand-navy group-hover:text-brand-accent">{index + 1}</span>
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1 bg-white p-5 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                                                <h5 className="font-bold text-lg text-brand-navy mb-1">{step.step}</h5>
                                                <p className="text-gray-600 text-sm">{step.details}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                 <div className="mt-8 text-center animate-in fade-in duration-700 delay-500">
                                    <div className="inline-flex items-center gap-2 text-brand-accent font-medium bg-blue-50 px-4 py-2 rounded-full">
                                        <CheckCircle2 size={18} />
                                        <span>Goal Achieved!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  ) : (
                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-brand-navy mb-3 flex items-center gap-2">
                          <GraduationCap size={20} className="text-brand-accent" /> Description
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{selectedCareer.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold text-brand-navy mb-3 flex items-center gap-2">
                          <Briefcase size={20} className="text-brand-accent" /> Key Roles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCareer.roles.map((role, i) => (
                            <span key={i} className="bg-blue-50 text-brand-navy px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-brand-navy mb-3 flex items-center gap-2">
                          <Building2 size={20} className="text-brand-accent" /> Top Colleges
                        </h4>
                        <ul className="space-y-2">
                          {selectedCareer.topColleges.map((college, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span>
                              {college}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-brand-navy mb-3 flex items-center gap-2">
                          <Wallet size={20} className="text-brand-accent" /> Average Salary
                        </h4>
                        <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
                          <p className="text-green-800 font-bold text-lg">{selectedCareer.avgSalary}</p>
                          <p className="text-green-600 text-xs mt-1">Estimated starting package in India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* --- TAB 2: ENTRANCE EXAMS --- */}
          {activeTab === 'exams' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {DETAILED_EXAMS.map((exam, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-bl-full -mr-4 -mt-4 group-hover:bg-brand-accent/10 transition-colors"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block px-2 py-1 bg-blue-50 text-brand-accent text-xs font-bold uppercase tracking-wider rounded mb-2">
                          {exam.category}
                        </span>
                        <h3 className="text-xl font-bold text-brand-navy">{exam.name}</h3>
                        <p className="text-xs text-gray-500">{exam.fullName}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          <Calendar size={14} /> {exam.date}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                      {exam.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex gap-2 text-xs">
                        <span className="font-bold text-gray-700 min-w-[70px]">Eligibility:</span>
                        <span className="text-gray-600">{exam.eligibility}</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="font-bold text-gray-700 min-w-[70px]">Pattern:</span>
                        <span className="text-gray-600">{exam.pattern}</span>
                      </div>
                    </div>

                    <a 
                      href={exam.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-brand-navy text-white py-2.5 rounded-lg text-sm font-medium hover:bg-brand-accent transition-colors"
                    >
                      Visit Official Website <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- TAB 3: SCHOLARSHIPS --- */}
          {activeTab === 'scholarships' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="text-brand-accent" size={24} />
                  <h3 className="text-xl font-heading font-bold text-gray-800">Scholarship Opportunities</h3>
                </div>
                <div className="grid gap-4">
                  {scholarships.map((sch, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-100 rounded-xl hover:border-brand-accent/30 hover:shadow-md transition-all bg-gray-50/50">
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
            </div>
          )}
          
          <div className="mt-10 text-center">
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