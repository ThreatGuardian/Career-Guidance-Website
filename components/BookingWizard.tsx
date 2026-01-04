import React, { useState, useMemo, useCallback } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Calendar, 
  MapPin, 
  Book,
  BrainCircuit,
  Lightbulb,
  Calculator,
  Briefcase,
  MessageCircle,
  Sparkles,
  Mail,
  Phone,
  Loader2
} from 'lucide-react';
import { RegistrationService } from '../services/api';

interface BookingWizardProps {
  onBack: () => void;
}

type Step = 'details' | 'form' | 'success';
type ServiceType = 'counselling' | 'assessment';

interface FormData {
  serviceType: ServiceType;
  name: string;
  email: string;
  phone: string;
  age: string;
  dob: string;
  address: string;
  education: string;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ onBack }) => {
  const [step, setStep] = useState<Step>('details');
  const [formData, setFormData] = useState<FormData>({
    serviceType: 'assessment', // Default selection
    name: '',
    email: '',
    phone: '',
    age: '',
    dob: '',
    address: '',
    education: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleServiceSelect = useCallback((type: ServiceType) => {
    setFormData(prev => ({ ...prev, serviceType: type }));
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call & Email Dispatch
    try {
      // In a real app, this would send data to backend which triggers the email
      // For now, we use EmailJS or similar service on the client side if configured
      
      await RegistrationService.create({
        name: formData.name,
        serviceType: formData.serviceType,
        amount: 0, // No payment
        paymentStatus: 'pending_contact',
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        age: formData.age,
        dob: formData.dob,
        address: formData.address
      });
      
      // Simulate Email Sending Delay
      setTimeout(() => {
        setStep('success');
        window.scrollTo(0, 0);
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      console.error("Registration failed", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };


  // --- Step Components ---

  const DetailsView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">Start Your Career Journey</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the path that fits your needs. Our scientific process helps uncover your true potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
          <div className="bg-white p-3 rounded-lg text-brand-accent shadow-sm">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h3 className="font-bold text-brand-navy text-lg">Aptitude Test</h3>
            <p className="text-gray-600 text-sm mt-1">Evaluates your innate abilities and learning potential across various domains.</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
          <div className="bg-white p-3 rounded-lg text-brand-accent shadow-sm">
            <Lightbulb size={24} />
          </div>
          <div>
            <h3 className="font-bold text-brand-navy text-lg">Interest Profiling</h3>
            <p className="text-gray-600 text-sm mt-1">Identifies what you love to do to ensure your career is passionate and fulfilling.</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
          <div className="bg-white p-3 rounded-lg text-brand-accent shadow-sm">
            <Calculator size={24} />
          </div>
          <div>
            <h3 className="font-bold text-brand-navy text-lg">Logical & Math</h3>
            <p className="text-gray-600 text-sm mt-1">Assesses analytical reasoning and numerical problem-solving skills.</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
          <div className="bg-white p-3 rounded-lg text-brand-accent shadow-sm">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="font-bold text-brand-navy text-lg">Employability</h3>
            <p className="text-gray-600 text-sm mt-1">Gauges professional readiness and soft skills required for the modern workplace.</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-navy text-white p-8 rounded-2xl max-w-4xl mx-auto mb-10 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Final Step: 1-on-1 Expert Guidance</h3>
          <p className="text-blue-100 mb-0">
            After the tests, you receive a detailed report and a personal consultation session with Bhagwan Pandekar to build your roadmap.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Home
        </button>
        <button 
          onClick={() => { setStep('form'); window.scrollTo(0, 0); }}
          className="px-8 py-3 rounded-lg bg-brand-accent text-white font-medium hover:bg-brand-navy transition-colors shadow-lg flex items-center gap-2"
        >
          Proceed to Registration <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const FormView = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => setStep('details')} className="hover:text-brand-accent flex items-center gap-1">
          <ArrowLeft size={16} /> Back to Details
        </button>
        <span>/</span>
        <span className="font-medium text-brand-navy">Registration</span>
      </div>

      <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6">Student Registration</h2>
      
      <form onSubmit={handleFormSubmit} className="space-y-8">
        
        {/* Service Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-brand-navy uppercase tracking-wider">Select Service Plan</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option 1 */}
            <div 
              onClick={() => handleServiceSelect('counselling')}
              className={`cursor-pointer rounded-xl p-5 border-2 transition-all duration-200 relative ${
                formData.serviceType === 'counselling' 
                ? 'border-brand-accent bg-blue-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${formData.serviceType === 'counselling' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <MessageCircle size={20} />
                </div>
                {formData.serviceType === 'counselling' && <CheckCircle className="text-brand-accent" size={24} />}
              </div>
              <h3 className="font-bold text-gray-800">Expert Counselling Session</h3>
              <p className="text-sm text-gray-500 mt-1">45-60 min discussion. Best for specific query resolution.</p>
            </div>

            {/* Option 2 */}
            <div 
              onClick={() => handleServiceSelect('assessment')}
              className={`cursor-pointer rounded-xl p-5 border-2 transition-all duration-200 relative ${
                formData.serviceType === 'assessment' 
                ? 'border-brand-accent bg-blue-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm'
              }`}
            >
              <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${formData.serviceType === 'assessment' ? 'bg-brand-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Sparkles size={20} />
                </div>
                {formData.serviceType === 'assessment' && <CheckCircle className="text-brand-accent" size={24} />}
              </div>
              <h3 className="font-bold text-gray-800">Complete Assessment</h3>
              <p className="text-sm text-gray-500 mt-1">Full psychometric testing + 20 pg Report + Counselling.</p>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-heading font-semibold text-brand-navy border-b border-gray-100 pb-2">Personal Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-brand-slate">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors" size={18} />
                <input 
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all shadow-sm hover:bg-white"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-brand-slate">Age</label>
              <input 
                required
                type="number" 
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all shadow-sm hover:bg-white"
                placeholder="e.g. 16"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-brand-slate">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors" size={18} />
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all shadow-sm hover:bg-white"
                  placeholder="e.g. rahul@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-brand-slate">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors" size={18} />
                <input 
                  required
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all shadow-sm hover:bg-white"
                  placeholder="e.g. 9876543210"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-brand-slate">Date of Birth</label>
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors" size={18} />
              <input 
                required
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all shadow-sm hover:bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-brand-slate">Address</label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-3 text-gray-400 group-focus-within:text-brand-accent transition-colors" size={18} />
              <textarea 
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all shadow-sm hover:bg-white"
                placeholder="Enter your full residential address here..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-brand-slate">Educational Details</label>
            <div className="relative group">
              <Book className="absolute left-3 top-3 text-gray-400 group-focus-within:text-brand-accent transition-colors" size={18} />
              <textarea 
                required
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all shadow-sm hover:bg-white"
                placeholder="Current School/College, Standard (10th/12th), Stream, and Marks obtained..."
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-navy hover:bg-brand-accent text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Processing Registration...
              </>
            ) : (
              'Submit Registration'
            )}
          </button>
        </div>
      </form>
    </div>
  );

  const SuccessView = () => (
    <div className="max-w-xl mx-auto text-center pt-10 animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <CheckCircle className="text-green-600 w-12 h-12" />
      </div>
      <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">Registration Successful!</h2>
      <p className="text-lg text-gray-600 mb-8">
        Thank you, <strong>{formData.name}</strong>. Your registration for <br/>
        <span className="font-bold text-brand-accent">
          {formData.serviceType === 'assessment' ? 'Complete Assessment' : 'Counselling Session'}
        </span> is confirmed.
      </p>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-left mb-8 max-w-md mx-auto">
        <h4 className="font-bold text-brand-navy mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-brand-accent" /> Next Steps:
        </h4>
        <ul className="space-y-4 text-gray-600 text-sm">
          <li className="flex items-start gap-3">
            <div className="bg-brand-navy/10 text-brand-navy font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5">1</div>
            <span>A confirmation email has been sent to <strong>{formData.email}</strong> with your registration details.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-brand-navy/10 text-brand-navy font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5">2</div>
            <span>Our counselor will review your profile and contact you shortly on <strong>{formData.phone}</strong>.</span>
          </li>
        </ul>
      </div>

      <button 
        onClick={onBack}
        className="px-8 py-3 bg-brand-navy text-white rounded-lg hover:bg-brand-accent transition-colors font-medium shadow-lg"
      >
        Return to Home Page
      </button>
    </div>
  );

  return (
    <div className="py-24 bg-gray-50 min-h-[80vh]">
      <div className="container mx-auto px-4 md:px-6">
        {step === 'details' && DetailsView()}
        {step === 'form' && FormView()}
        {step === 'success' && SuccessView()}
      </div>
    </div>
  );
};

export default BookingWizard;