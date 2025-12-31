import React from 'react';
import SectionHeading from './SectionHeading';
import { Award, Clock, BookOpen, User } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 bg-brand-navy h-32 rounded-r-full opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="w-full lg:w-5/12">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-navy rounded-2xl rotate-3 opacity-10 scale-105"></div>
              <img 
                src="https://picsum.photos/600/800?grayscale" 
                alt="Bhagwan Pandekar" 
                className="relative rounded-2xl shadow-xl w-full h-auto object-cover aspect-[3/4]"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hidden md:block">
                <p className="text-brand-accent font-heading font-bold text-4xl">15+</p>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-6">
              About Bhagwan Pandekar
            </h2>
            <h3 className="text-xl text-brand-slate font-medium mb-6">
              Dedicated Career Counsellor & Mentor
            </h3>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                With over a decade and a half of dedicated service in the field of education and career guidance, I have made it my mission to help students find their true calling. My approach combines scientific psychometric testing with personalized counseling to ensure every student walks a path that aligns with their innate strengths.
              </p>
              <p>
                I believe that every individual has unique potential. Whether you are a student at a crossroads after 10th grade, a graduate looking for specialization, or a parent concerned about your child's future, my goal is to provide clarity and confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Award className="text-brand-accent shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-brand-navy">Certified Expert</h4>
                  <p className="text-sm text-gray-500">Recognized by leading educational bodies.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Clock className="text-brand-accent shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-brand-navy">15+ Years</h4>
                  <p className="text-sm text-gray-500">Consistent track record of success.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <User className="text-brand-accent shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-brand-navy">Personalized</h4>
                  <p className="text-sm text-gray-500">Tailored 1-on-1 sessions for every student.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <BookOpen className="text-brand-accent shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-brand-navy">Holistic Approach</h4>
                  <p className="text-sm text-gray-500">Focus on academic & personal growth.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;