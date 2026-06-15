import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AICareerMatch from './components/AICareerMatch';
import Services from './components/Services';
import Resources from './components/Resources';
import About from './components/About';
import Contact from './components/Contact';
import BookingWizard from './components/BookingWizard';
import BlogSection from './components/BlogSection';
import Downloads from './components/Downloads';
import AdminDashboard from './components/AdminDashboard';
import LoginScreen from './components/LoginScreen';
import NotificationSystem from './components/NotificationSystem';
import ArticleView from './components/ArticleView';
import BackgroundElements from './components/BackgroundElements';
import ErrorBoundary from './components/ErrorBoundary';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import AssessmentLogin from './components/AssessmentLogin';
import AssessmentScreen from './components/AssessmentScreen';
import ResultsScreen from './components/ResultsScreen';
import { AssessmentProgress } from './services/assessmentStorage';
import { ScoringEngine, UserProfile } from './services/scoringEngine';
import { CareerMatching, TopCareer } from './services/careerMatching';
import { trackAnalyticsEvent } from './lib/analytics';
import { TranslationProvider } from './translations';
import { BlogPost, NotificationItem, ResourceItem, InquiryItem } from './types';
import { BlogService, NotificationService, ResourceService, InquiryService } from './services/api';
import { AuthService } from './services/auth';
import { User } from 'firebase/auth';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'booking' | 'admin' | 'login' | 'article' | 'assessment-login' | 'assessment' | 'results'>('home');
  const [user, setUser] = useState<User | null>(null);
  
  // Assessment State
  const [assessmentUserData, setAssessmentUserData] = useState<any>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [topCareers, setTopCareers] = useState<TopCareer[]>([]);
  
  // Data State
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Listen for Auth Changes (Session Persistence)
  useEffect(() => {
    const unsubscribe = AuthService.subscribe((currentUser) => {
      setUser(currentUser);
      // If user logs out while in admin view, kick them to home
      if (!currentUser && view === 'admin') {
        setView('home');
      }
    });
    return () => unsubscribe();
  }, [view]);

  // 2. Load Content Data from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedBlogs, fetchedNotes, fetchedRes, fetchedInq] = await Promise.all([
          BlogService.getAll(),
          NotificationService.getAll(),
          ResourceService.getAll(),
          InquiryService.getAll()
        ]);

        setBlogs(fetchedBlogs);
        setNotifications(fetchedNotes);
        setResources(fetchedRes);
        setInquiries(fetchedInq);
      } catch (error) {
        console.error("Failed to load data from Firebase", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 3. Dynamic Title (SEO)
  useEffect(() => {
    const baseTitle = "Bhagwan Pandekar - Career Counsellor";
    switch(view) {
      case 'home':
        document.title = `${baseTitle} | Expert Guidance`;
        break;
      case 'booking':
        document.title = `Book Consultation | ${baseTitle}`;
        break;
      case 'login':
        document.title = `Admin Login | ${baseTitle}`;
        break;
      case 'admin':
        document.title = `Dashboard | ${baseTitle}`;
        break;
      case 'assessment-login':
        document.title = `Start Assessment | ${baseTitle}`;
        break;
      case 'assessment':
        document.title = `Career Assessment | ${baseTitle}`;
        break;
      // Article title is handled in ArticleView component
      default:
        document.title = baseTitle;
    }
  }, [view]);

  // FIX: Redirect unauthenticated users away from admin (moved from render body to useEffect)
  useEffect(() => {
    if (view === 'admin' && !user) {
      setView('login');
    }
  }, [view, user]);

  // Basic URL sync based on view state
  useEffect(() => {
    if (view === 'home') window.location.hash = '';
    else if (view === 'admin') window.location.hash = '#/admin';
    else if (!['assessment', 'results', 'assessment-login', 'article'].includes(view)) {
      window.location.hash = `#/${view}`;
    }
  }, [view]);

  const handleBookNow = () => {
    setView('booking');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setView('home');
    setSelectedPost(null);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const handleAdminClick = () => {
    if (user) {
      setView('admin');
    } else {
      setView('login');
    }
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setView('admin');
    window.scrollTo(0, 0);
  };
  
  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setView('home');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleViewPost = (post: BlogPost) => {
    setSelectedPost(post);
    setView('article');
  };

  // Assessment handlers
  const handleStartAssessment = () => {
    setView('assessment-login');
    window.scrollTo(0, 0);
  };

  // --- Assessment Flow Handlers ---

  const handleAssessmentLoginSuccess = (userData: any) => {
    setAssessmentUserData(userData);
    trackAnalyticsEvent('ASSESSMENT_STARTED', userData.email);
    setView('assessment');
    window.scrollTo(0, 0);
  };

  const handleAssessmentComplete = (progress: AssessmentProgress) => {
    trackAnalyticsEvent('ASSESSMENT_COMPLETED', progress.userId, { 
      timeTaken: progress.timeTaken 
    });

    // 1. Calculate Scores based on raw answers & time
    const profile = ScoringEngine.calculateScores(progress.answers, progress.timeTaken);
    setUserProfile(profile);
    setAssessmentAnswers(progress.answers);

    // 2. Run Career Matching Algorithm
    const matches = CareerMatching.matchCareers(profile);
    setTopCareers(matches);

    // 3. Display Results
    setView('results');
    window.scrollTo(0, 0);
  };

  // --- Render ---

  if (view === 'results' && userProfile && assessmentUserData) {
    return (
      <ResultsScreen
        userProfile={userProfile}
        topCareers={topCareers}
        userData={assessmentUserData}
        answers={assessmentAnswers}
        onBookClick={handleBookNow}
        onBack={handleGoHome}
      />
    );
  }

  if (view === 'assessment-login') {
    return (
      <AssessmentLogin 
        onLoginSuccess={handleAssessmentLoginSuccess}
        onBack={handleGoHome} 
      />
    );
  }

  if (view === 'assessment' && assessmentUserData) {
    return (
      <AssessmentScreen
        userId={assessmentUserData.email}
        onComplete={handleAssessmentComplete}
        onBack={handleGoHome}
      />
    );
  }

  if (view === 'login') {
    return (
      <LoginScreen 
        onLoginSuccess={handleLoginSuccess}
        onBack={handleGoHome}
      />
    );
  }

  if (view === 'admin') {
    if (!user) {
      // Render nothing while the useEffect redirects
      return null; 
    }
    return (
      <AdminDashboard 
        onBack={handleGoHome} 
        onLogout={handleLogout}
        posts={blogs}
        notifications={notifications}
        resources={resources}
        inquiries={inquiries}
        setPosts={setBlogs}
        setNotifications={setNotifications}
        setResources={setResources}
        setInquiries={setInquiries}
        currentUserEmail={user.email}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <BackgroundElements />
      <NotificationSystem notifications={notifications} />
      
      {/* Navbar gets special props to handle navigation when not on home page */}
      <Navbar onHomeClick={handleGoHome} isBookingMode={view !== 'home'} />
      
      {/* Main content wrapped in relative and z-10 to sit above background */}
      <main className="flex-grow relative z-10">
        {view === 'home' ? (
          <>
            <Hero />
            <AICareerMatch onStartAssessment={handleStartAssessment} />
            <Services onBookClick={handleBookNow} />
            <Testimonials />
            <BlogSection posts={blogs} onViewPost={handleViewPost} />
            <Resources />
            <Downloads resources={resources} />
            <About />
            <FAQ />
          </>
        ) : view === 'booking' ? (
          <BookingWizard onBack={handleGoHome} onComplete={() => {
            if (assessmentUserData?.email) trackAnalyticsEvent('COUNSELLING_FORM_SUBMITTED', assessmentUserData.email);
          }} />
        ) : view === 'article' && selectedPost ? (
          <ArticleView post={selectedPost} onBack={handleGoHome} />
        ) : null}
      </main>
      
      <div className="relative z-10">
        <Contact 
          onAdminClick={handleAdminClick} 
          isLoggedIn={!!user}
          onInquiryCreated={(inquiry) => setInquiries((prev) => [...prev, inquiry])}
        />
      </div>
    </div>
  );
};

// Wrap with ErrorBoundary and TranslationProvider
const WrappedApp: React.FC = () => (
  <ErrorBoundary>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </ErrorBoundary>
);

export default WrappedApp;