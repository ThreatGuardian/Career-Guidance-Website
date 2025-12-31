import React from 'react';
import SectionHeading from './SectionHeading';
import { 
  BrainCircuit, 
  Map, 
  UserCheck, 
  BookOpen, 
  Users, 
  Briefcase,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  onBookClick?: () => void;
}

const services: ServiceItem[] = [
  {
    title: "Stream Selection",
    description: "Scientific guidance for choosing between Arts, Commerce, or Science after 10th grade based on potential.",
    icon: Map
  },
  {
    title: "Personality Development",
    description: "Workshops and sessions designed to enhance communication skills, confidence, and leadership qualities.",
    icon: UserCheck
  },
  {
    title: "Study Skills",
    description: "Techniques for effective learning, memory retention, time management, and exam preparation strategies.",
    icon: BookOpen
  },
  {
    title: "Parent Counseling",
    description: "Guidance for parents to understand their child's potential and foster a supportive environment for career growth.",
    icon: Users
  },
  {
    title: "Business Guidance",
    description: "Mentorship for aspiring entrepreneurs and professionals looking to start or scale their own ventures.",
    icon: Briefcase
  }
];

const Services: React.FC<ServicesProps> = ({ onBookClick }) => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Our Services" 
          subtitle="Tailored guidance solutions to match your specific needs."
        />

        {/* Main Service Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Option 1: Just Counselling */}
          <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:border-brand-accent/30 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light rounded-bl-full -mr-8 -mt-8 group-hover:bg-brand-accent/10 transition-colors duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-50 text-brand-navy rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300">
                <MessageCircle size={28} />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-brand-navy mb-3 group-hover:text-brand-accent transition-colors">
                Expert Counselling Session
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed min-h-[80px]">
                A focused 1-on-1 discussion to resolve specific queries, discuss career options based on marks/interest, and get expert advice without psychometric testing.
              </p>
              
              <ul className="space-y-3 mb-8 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Clock size={16} className="text-brand-accent" /> 
                  <span>45 - 60 Mins Session</span>
                </li>
                <li className="flex items-center gap-2">
                   <UserCheck size={16} className="text-brand-accent" />
                   <span>Direct Expert Interaction</span>
                </li>
              </ul>

              <button 
                onClick={onBookClick}
                className="w-full py-3.5 rounded-xl border-2 border-brand-navy text-brand-navy font-bold hover:bg-brand-navy hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Book Session <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Option 2: Complete Package */}
          <div className="group relative bg-gradient-to-br from-brand-navy to-blue-900 text-white rounded-3xl p-8 shadow-2xl hover:shadow-brand-accent/40 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
            {/* Animated Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-brand-navy transition-all duration-300">
                  <BrainCircuit size={28} />
                </div>
                <div className="px-3 py-1 bg-brand-accent/30 border border-brand-accent/50 rounded-full text-xs font-semibold uppercase tracking-wider animate-pulse">
                  Most Popular
                </div>
              </div>
              
              <h3 className="text-2xl font-heading font-bold mb-3">
                Complete Career Assessment
              </h3>
              
              <p className="text-blue-100 mb-6 leading-relaxed min-h-[80px]">
                Our scientific flagship program combining 5-dimensional psychometric testing (Aptitude, Interest, Personality, etc.) with a detailed report and personal guidance.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-8 text-sm text-blue-100">
                 <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">Scientific Testing</div>
                 <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">20+ Page Report</div>
                 <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">In-depth Analysis</div>
                 <div className="bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">Parent Discussion</div>
              </div>

              <button 
                onClick={onBookClick}
                className="w-full py-3.5 rounded-xl bg-white text-brand-navy font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                Get Full Package <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
        
        {/* Other Services Grid */}
        <h3 className="text-2xl font-heading font-bold text-brand-navy mb-8 pl-2 border-l-4 border-brand-accent">
          Specialized Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-bl-full -mr-4 -mt-4 group-hover:bg-brand-accent/10 transition-colors duration-500"></div>
              
              <div className="w-14 h-14 bg-brand-navy/5 text-brand-navy rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-navy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-brand-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;