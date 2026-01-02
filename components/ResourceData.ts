import { CareerPath, ExamInfo } from '../types';
import { Stethoscope, Wrench, Building2, Gavel, Palette, Shield } from 'lucide-react';

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'eng',
    category: 'Engineering',
    icon: Wrench,
    description: 'Application of science and math to solve real-world problems. Involves designing, building, and maintaining structures, machines, and systems.',
    roles: ['Software Engineer', 'Mechanical Engineer', 'Civil Engineer', 'Data Scientist', 'Robotics Engineer'],
    topColleges: ['IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'COEP Pune', 'VJTI Mumbai'],
    avgSalary: '₹6 - 15 LPA (Entry Level)',
    roadmap: [
      { step: 'Class 10th', details: 'Focus on Mathematics and Science basics.' },
      { step: 'Class 11th & 12th', details: 'Choose Science Stream with Physics, Chemistry, and Maths (PCM).' },
      { step: 'Entrance Exams', details: 'Prepare for JEE Main, JEE Advanced, MHT-CET, or BITSAT.' },
      { step: 'Undergraduate Degree', details: 'Pursue B.Tech or B.E. (4 Years) in your chosen branch.' },
      { step: 'Career Launch', details: 'Campus Placements, GATE for M.Tech, or Startups.' }
    ]
  },
  {
    id: 'med',
    category: 'Medical',
    icon: Stethoscope,
    description: 'Dedicated to diagnosing, treating, and preventing illness. Requires high dedication and long study duration but offers immense respect and stability.',
    roles: ['Doctor (MBBS)', 'Dentist (BDS)', 'Ayurvedic Doctor (BAMS)', 'Physiotherapist', 'Pharmacist'],
    topColleges: ['AIIMS Delhi', 'AFMC Pune', 'BJ Medical Pune', 'KEM Mumbai', 'CMC Vellore'],
    avgSalary: '₹8 - 12 LPA (Entry Level)',
    roadmap: [
      { step: 'Class 10th', details: 'Strong foundation in Biology and Chemistry.' },
      { step: 'Class 11th & 12th', details: 'Choose Science Stream with Physics, Chemistry, and Biology (PCB).' },
      { step: 'Entrance Exams', details: 'Crack NEET (UG) with high percentile.' },
      { step: 'Medical Degree', details: 'Complete MBBS (5.5 Years including Internship) or BDS/BAMS.' },
      { step: 'Specialization', details: 'Pursue MD/MS (Post Graduation) for specialist roles.' }
    ]
  },
  {
    id: 'comm',
    category: 'Commerce & Mgmt',
    icon: Building2,
    description: 'Focuses on business operations, finance, accounting, and economics. Ideal for those with good analytical and leadership skills.',
    roles: ['Chartered Accountant (CA)', 'Investment Banker', 'Marketing Manager', 'HR Manager', 'Entrepreneur'],
    topColleges: ['IIM Ahmedabad', 'SRCC Delhi', 'Symbiosis Pune', 'NMIMS Mumbai', 'SP Jain'],
    avgSalary: '₹5 - 10 LPA (Entry Level)',
    roadmap: [
      { step: 'Class 10th', details: 'Interest in Economics, Finance, or Business.' },
      { step: 'Class 11th & 12th', details: 'Choose Commerce Stream (Maths optional but recommended).' },
      { step: 'Professional Course', details: 'Register for CA Foundation / CS / CMA or prepare for CUET/IPMAT.' },
      { step: 'Graduation', details: 'B.Com / BBA / BMS along with professional certifications.' },
      { step: 'Post Graduation', details: 'MBA from top B-Schools (via CAT/GMAT) for management roles.' }
    ]
  },
  {
    id: 'law',
    category: 'Law',
    icon: Gavel,
    description: 'Study of rules, regulations, and justice. Great for those with strong logic, communication, and critical thinking skills.',
    roles: ['Corporate Lawyer', 'Litigation Lawyer', 'Judge', 'Legal Advisor', 'Public Prosecutor'],
    topColleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'ILS Pune', 'GLC Mumbai', 'Symbiosis Law School'],
    avgSalary: '₹6 - 12 LPA (Entry Level)',
    roadmap: [
      { step: 'Class 10th', details: 'Develop reading, writing, and logical reasoning skills.' },
      { step: 'Class 11th & 12th', details: 'Any stream (Arts/Commerce/Science). Focus on current affairs.' },
      { step: 'Entrance Exams', details: 'Clear CLAT, AILET, or MHCET Law.' },
      { step: 'Law Degree', details: 'Pursue 5-Year Integrated LLB (BA LLB / BBA LLB).' },
      { step: 'Practice', details: 'Enroll with Bar Council of India and start practice or corporate job.' }
    ]
  },
  {
    id: 'arts',
    category: 'Arts & Design',
    icon: Palette,
    description: 'Creative fields focusing on expression, culture, and aesthetics. Includes design, media, psychology, and liberal arts.',
    roles: ['Graphic Designer', 'Journalist', 'Psychologist', 'Fashion Designer', 'UX/UI Designer'],
    topColleges: ['NID Ahmedabad', 'NIFT Mumbai', 'TISS Mumbai', 'JJ School of Arts', 'Xavier\'s Mumbai'],
    avgSalary: '₹4 - 8 LPA (Entry Level)',
    roadmap: [
      { step: 'Class 10th', details: 'Interest in creativity, social sciences, or languages.' },
      { step: 'Class 11th & 12th', details: 'Choose Arts/Humanities stream.' },
      { step: 'Entrance Exams', details: 'NID DAT, UCEED, NIFT, or CUET for Liberal Arts.' },
      { step: 'Undergraduate Degree', details: 'B.Des, BA (Psychology/Sociology), or BMM.' },
      { step: 'Portfolio', details: 'Build a strong portfolio of work and internships.' }
    ]
  },
  {
    id: 'def',
    category: 'Defence Services',
    icon: Shield,
    description: 'Serving the nation through Army, Navy, or Air Force. Offers a disciplined lifestyle, adventure, and immense pride.',
    roles: ['Army Officer', 'Naval Officer', 'Air Force Pilot', 'Technical Officer', 'Medical Officer'],
    topColleges: ['NDA Pune', 'IMA Dehradun', 'INA Ezhimala', 'AFA Hyderabad', 'OTA Chennai'],
    avgSalary: '₹8 - 15 LPA (Plus Perks)',
    roadmap: [
      { step: 'Class 10th', details: 'Maintain physical fitness and good academic record.' },
      { step: 'Class 11th & 12th', details: 'Science (PCM) preferred for Navy/Air Force. Any for Army.' },
      { step: 'Entrance Exams', details: 'Clear NDA Exam (UPSC) or CDS/AFCAT after graduation.' },
      { step: 'SSB Interview', details: 'Clear the 5-day Service Selection Board interview.' },
      { step: 'Training', details: 'Rigorous training at NDA/IMA/OTA leading to Commission.' }
    ]
  }
];

export const DETAILED_EXAMS: ExamInfo[] = [
  {
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination - Main',
    category: 'Engineering',
    date: 'January & April',
    description: 'The gateway to NITs, IIITs, and other Centrally Funded Technical Institutions (CFTIs). Also the screening test for JEE Advanced.',
    eligibility: 'Class 12th Science (PCM) passed/appearing.',
    pattern: 'Computer Based Test (CBT). Physics, Chemistry, Maths. MCQs + Numerical Value Questions.',
    website: 'https://jeemain.nta.ac.in/'
  },
  {
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination - Advanced',
    category: 'Engineering',
    date: 'May / June',
    description: 'One of the toughest exams globally, conducted for admission to the prestigious Indian Institutes of Technology (IITs).',
    eligibility: 'Top 2.5 Lakh rank holders in JEE Main.',
    pattern: 'Two papers (Paper 1 & 2) of 3 hours each. Physics, Chemistry, Maths.',
    website: 'https://jeeadv.ac.in/'
  },
  {
    name: 'NEET (UG)',
    fullName: 'National Eligibility cum Entrance Test',
    category: 'Medical',
    date: 'May (First Sunday)',
    description: 'The single entrance test for admission to MBBS and BDS courses across India.',
    eligibility: 'Class 12th Science (PCB) passed/appearing. Min age 17 years.',
    pattern: 'Pen & Paper. 720 Marks. Physics, Chemistry, Biology (Botany + Zoology).',
    website: 'https://neet.nta.nic.in/'
  },
  {
    name: 'MHT-CET',
    fullName: 'Maharashtra Common Entrance Test',
    category: 'Engineering / Pharmacy',
    date: 'May',
    description: 'State-level entrance exam for admission to Engineering and Pharmacy colleges in Maharashtra.',
    eligibility: 'Maharashtra State Candidate / All India Candidate with 12th Science.',
    pattern: 'CBT. PCM for Engineering, PCB for Pharmacy. No Negative Marking.',
    website: 'https://cetcell.mahacet.org/'
  },
  {
    name: 'NDA & NA',
    fullName: 'National Defence Academy Exam',
    category: 'Defence',
    date: 'April & September',
    description: 'Conducted by UPSC for admission to the Army, Navy and Air Force wings of the NDA and Indian Naval Academy Course.',
    eligibility: 'Unmarried male/female candidates. 16.5 to 19.5 years. 12th passed.',
    pattern: 'Written Exam (Maths + GAT) followed by 5-day SSB Interview.',
    website: 'https://upsc.gov.in/'
  },
  {
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    category: 'Law',
    date: 'December',
    description: 'National level entrance exam for admissions to undergraduate (UG) and postgraduate (PG) law programmes offered by 22 National Law Universities.',
    eligibility: '12th passed with min 45% marks.',
    pattern: 'Reading Comprehension, Current Affairs, Legal Reasoning, Logical Reasoning, Quant.',
    website: 'https://consortiumofnlus.ac.in/'
  }
];
