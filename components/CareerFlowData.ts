import { FlowNode } from '../types';

export const CAREER_FLOW_DATA: Record<string, FlowNode> = {
  'root': {
    id: 'root',
    label: 'Current Education Stage',
    description: 'Select your current academic level to explore future paths.',
    type: 'stage',
    next: ['class-10', 'class-12', 'diploma', 'graduation']
  },
  'class-10': {
    id: 'class-10',
    label: 'Class 10th Completed',
    description: 'You have just finished your secondary education. The next big step is choosing a stream.',
    type: 'stage',
    next: ['science', 'commerce', 'arts', 'diploma-poly']
  },
  'class-12': {
    id: 'class-12',
    label: 'Class 12th Completed',
    description: 'Select the stream you pursued in Class 12.',
    type: 'stage',
    next: ['science-pcm', 'science-pcb', 'commerce-stream', 'arts-stream']
  },
  'diploma': {
    id: 'diploma',
    label: 'Diploma Holder',
    description: 'You have completed a 3-year diploma after 10th.',
    type: 'stage',
    next: ['eng-degree-lateral', 'job-junior-eng']
  },
  'graduation': {
    id: 'graduation',
    label: 'Graduation Completed',
    description: 'You have a bachelor\'s degree. What\'s next?',
    type: 'stage',
    next: ['post-grad', 'govt-exams', 'job-market']
  },

  // --- STREAMS ---
  'science': {
    id: 'science',
    label: 'Science Stream',
    description: 'Focus on Physics, Chemistry, Maths/Biology. Opens doors to Engineering, Medical, Research, etc.',
    type: 'stream',
    next: ['science-pcm', 'science-pcb']
  },
  'commerce': {
    id: 'commerce',
    label: 'Commerce Stream',
    description: 'Focus on Accounts, Economics, Business Studies. Ideal for Finance, Business, and Management.',
    type: 'stream',
    next: ['commerce-stream']
  },
  'arts': {
    id: 'arts',
    label: 'Arts / Humanities',
    description: 'Focus on History, Geography, Pol. Science, Sociology. Great for Civil Services, Law, Media, Creative Arts.',
    type: 'stream',
    next: ['arts-stream']
  },
  'diploma-poly': {
    id: 'diploma-poly',
    label: 'Polytechnic Diploma',
    description: '3-Year Technical Diploma in Engineering branches.',
    type: 'stream',
    next: ['eng-degree-lateral', 'job-junior-eng']
  },

  // --- 12th Specifics ---
  'science-pcm': {
    id: 'science-pcm',
    label: 'Science (PCM)',
    description: 'Physics, Chemistry, Maths. The route to Technology & Engineering.',
    type: 'stream',
    next: ['engineering', 'architecture', 'defence-nda', 'merchant-navy', 'pilot', 'bsc-pure', 'computers-bca', 'animation', 'hotel-mgmt']
  },
  'science-pcb': {
    id: 'science-pcb',
    label: 'Science (PCB)',
    description: 'Physics, Chemistry, Biology. The route to Healthcare & Life Sciences.',
    type: 'stream',
    next: ['medical-mbbs', 'dentistry-bds', 'ayush', 'veterinary', 'pharmacy', 'allied-health', 'bsc-bio', 'psychology', 'hotel-mgmt']
  },
  'commerce-stream': {
    id: 'commerce-stream',
    label: 'Commerce Options',
    description: 'Professional courses and degrees in Finance & Business.',
    type: 'stream',
    next: ['ca', 'cs', 'cma', 'bcom-bba', 'hotel-mgmt', 'law-5yr', 'computers-bca', 'animation']
  },
  'arts-stream': {
    id: 'arts-stream',
    label: 'Arts Options',
    description: 'Diverse fields in Humanities, Law, and Creativity.',
    type: 'stream',
    next: ['law-5yr', 'design', 'mass-comm', 'civil-services-prep', 'teaching', 'ba-degree', 'social-work', 'physical-education', 'hotel-mgmt', 'animation']
  },

  // --- CAREERS / DEGREES (PCM) ---
  'engineering': {
    id: 'engineering',
    label: 'Engineering (B.E./B.Tech)',
    description: '4-Year Degree in various branches like CS, IT, Mech, Civil, etc.',
    type: 'career',
    data: {
      exams: ['JEE Main', 'JEE Advanced', 'MHT-CET', 'BITSAT', 'VITEEE'],
      duration: '4 Years',
      skills: ['Problem Solving', 'Mathematics', 'Coding', 'Technical Logic'],
      outcomes: ['Software Engineer', 'Data Scientist', 'Core Engineer', 'System Architect']
    }
  },
  'architecture': {
    id: 'architecture',
    label: 'Architecture (B.Arch)',
    description: '5-Year Degree in designing buildings and spaces.',
    type: 'career',
    data: {
      exams: ['NATA', 'JEE Main Paper 2'],
      duration: '5 Years',
      skills: ['Drawing', 'Creativity', 'Spatial Visualization', 'Patience'],
      outcomes: ['Architect', 'Interior Designer', 'Urban Planner']
    }
  },
  'defence-nda': {
    id: 'defence-nda',
    label: 'Defence (NDA)',
    description: 'Join Army, Navy, or Air Force as an Officer directly after 12th.',
    type: 'career',
    data: {
      exams: ['NDA & NA Exam (UPSC)', 'SSB Interview'],
      duration: '3 Years (NDA) + 1 Year (IMA/INA/AFA)',
      skills: ['Physical Fitness', 'Leadership', 'Discipline', 'Patriotism'],
      outcomes: ['Lieutenant', 'Flying Officer', 'Sub-Lieutenant']
    }
  },
  'merchant-navy': {
    id: 'merchant-navy',
    label: 'Merchant Navy',
    description: 'Commercial shipping. High salary, adventurous life at sea.',
    type: 'career',
    data: {
      exams: ['IMU-CET'],
      duration: '3-4 Years (B.Sc Nautical Science / B.Tech Marine)',
      skills: ['Physical Stamina', 'Mental Strength', 'Adaptability'],
      outcomes: ['Deck Officer', 'Marine Engineer', 'Captain']
    }
  },
  'pilot': {
    id: 'pilot',
    label: 'Commercial Pilot',
    description: 'Flying commercial aircrafts.',
    type: 'career',
    data: {
      exams: ['DGCA Exams', 'Medical Class 1'],
      duration: '18-24 Months (CPL Training)',
      skills: ['Focus', 'Multitasking', 'Technical Knowledge', 'Calmness'],
      outcomes: ['Commercial Pilot', 'Flight Instructor']
    }
  },
  'bsc-pure': {
    id: 'bsc-pure',
    label: 'B.Sc (Pure Sciences)',
    description: 'Bachelor of Science in Physics, Chemistry, Maths, Statistics, etc.',
    type: 'career',
    data: {
      exams: ['CUET', 'IISER Aptitude Test', 'NEST'],
      duration: '3-4 Years',
      skills: ['Research', 'Analytical Thinking', 'Lab Skills'],
      outcomes: ['Scientist', 'Researcher', 'Professor', 'Data Analyst']
    }
  },
  'computers-bca': {
    id: 'computers-bca',
    label: 'Computer Applications (BCA)',
    description: 'Software development and computer applications focus.',
    type: 'career',
    data: {
      exams: ['CUET', 'University Entrance Exams'],
      duration: '3-4 Years',
      skills: ['Programming', 'Database Mgmt', 'Web Development'],
      outcomes: ['Software Developer', 'Web Developer', 'System Admin']
    }
  },

  // --- CAREERS / DEGREES (PCB) ---
  'medical-mbbs': {
    id: 'medical-mbbs',
    label: 'MBBS (Doctor)',
    description: 'Bachelor of Medicine, Bachelor of Surgery. The premier medical degree.',
    type: 'career',
    data: {
      exams: ['NEET (UG)'],
      duration: '5.5 Years (4.5 Academics + 1 Internship)',
      skills: ['Empathy', 'Memory', 'Patience', 'Hard Work'],
      outcomes: ['Doctor', 'Surgeon', 'Medical Officer', 'Specialist (after MD/MS)']
    }
  },
  'dentistry-bds': {
    id: 'dentistry-bds',
    label: 'BDS (Dentist)',
    description: 'Bachelor of Dental Surgery.',
    type: 'career',
    data: {
      exams: ['NEET (UG)'],
      duration: '5 Years',
      skills: ['Dexterity', 'Focus', 'Detail-oriented'],
      outcomes: ['Dentist', 'Dental Surgeon', 'Oral Pathologist']
    }
  },
  'ayush': {
    id: 'ayush',
    label: 'AYUSH (BAMS/BHMS)',
    description: 'Ayurveda, Homeopathy, Unani, Siddha.',
    type: 'career',
    data: {
      exams: ['NEET (UG)'],
      duration: '5.5 Years',
      skills: ['Holistic Healing', 'Patience', 'Observation'],
      outcomes: ['Ayurvedic Doctor', 'Homeopath', 'Wellness Consultant']
    }
  },
  'veterinary': {
    id: 'veterinary',
    label: 'Veterinary (BVSc & AH)',
    description: 'Doctor for animals. Bachelor of Veterinary Science.',
    type: 'career',
    data: {
      exams: ['NEET (UG)'],
      duration: '5.5 Years',
      skills: ['Love for Animals', 'Biology', 'Patience'],
      outcomes: ['Veterinary Doctor', 'Animal Surgeon', 'Wildlife Expert']
    }
  },
  'pharmacy': {
    id: 'pharmacy',
    label: 'Pharmacy (B.Pharm)',
    description: 'Science of preparing and dispensing medical drugs.',
    type: 'career',
    data: {
      exams: ['MHT-CET (Pharm)', 'NEET (some colleges)'],
      duration: '4 Years',
      skills: ['Chemistry', 'Accuracy', 'Research'],
      outcomes: ['Pharmacist', 'Drug Inspector', 'R&D Scientist']
    }
  },
  'allied-health': {
    id: 'allied-health',
    label: 'Allied Health Sciences',
    description: 'Physiotherapy, Nursing, Lab Tech, Radiology.',
    type: 'career',
    data: {
      exams: ['NEET', 'Institute Entrance'],
      duration: '3-4.5 Years',
      skills: ['Care', 'Technical Skills', 'Biology'],
      outcomes: ['Physiotherapist', 'Nurse', 'Lab Technician', 'Radiologist']
    }
  },
  'bsc-bio': {
    id: 'bsc-bio',
    label: 'B.Sc (Bio Sciences)',
    description: 'Botany, Zoology, Microbiology, Biotechnology.',
    type: 'career',
    data: {
      exams: ['CUET'],
      duration: '3 Years',
      skills: ['Research', 'Lab Work', 'Analysis'],
      outcomes: ['Biotechnologist', 'Microbiologist', 'Researcher', 'Teacher']
    }
  },

  // --- COMMERCE ---
  'ca': {
    id: 'ca',
    label: 'Chartered Accountant (CA)',
    description: 'Expert in Accounting, Auditing, and Taxation.',
    type: 'career',
    data: {
      exams: ['CA Foundation', 'CA Intermediate', 'CA Final'],
      duration: '4-5 Years (Correspondence + Articleship)',
      skills: ['Numbers', 'Analysis', 'Hard Work', 'Ethics'],
      outcomes: ['Auditor', 'Tax Consultant', 'Finance Manager', 'CFO']
    }
  },
  'cs': {
    id: 'cs',
    label: 'Company Secretary (CS)',
    description: 'Expert in Corporate Law and Governance.',
    type: 'career',
    data: {
      exams: ['CSEET', 'CS Executive', 'CS Professional'],
      duration: '3-4 Years',
      skills: ['Law', 'Compliance', 'Communication'],
      outcomes: ['Company Secretary', 'Legal Advisor', 'Corporate Planner']
    }
  },
  'cma': {
    id: 'cma',
    label: 'Cost Mgmt Accountant (CMA)',
    description: 'Expert in Cost Accounting and Financial Management.',
    type: 'career',
    data: {
      exams: ['CMA Foundation', 'CMA Inter', 'CMA Final'],
      duration: '3-4 Years',
      skills: ['Costing', 'Finance', 'Management'],
      outcomes: ['Cost Accountant', 'Financial Analyst', 'CFO']
    }
  },
  'bcom-bba': {
    id: 'bcom-bba',
    label: 'B.Com / BBA / BMS',
    description: 'Bachelor degrees in Commerce and Management.',
    type: 'career',
    data: {
      exams: ['CUET', 'IPMAT', 'College Entrance'],
      duration: '3-4 Years',
      skills: ['Management', 'Finance', 'Marketing'],
      outcomes: ['Accountant', 'HR Manager', 'Marketing Executive', 'MBA Aspirant']
    }
  },

  // --- ARTS / GENERAL ---
  'law-5yr': {
    id: 'law-5yr',
    label: 'Law (Integrated LLB)',
    description: '5-Year BA LLB / BBA LLB directly after 12th.',
    type: 'career',
    data: {
      exams: ['CLAT', 'AILET', 'MHCET Law'],
      duration: '5 Years',
      skills: ['Logic', 'Reading', 'Debating', 'Writing'],
      outcomes: ['Lawyer', 'Judge', 'Corporate Counsel', 'Legal Advisor']
    }
  },
  'design': {
    id: 'design',
    label: 'Design (B.Des)',
    description: 'Fashion, Product, Interior, or Graphic Design.',
    type: 'career',
    data: {
      exams: ['NID DAT', 'NIFT', 'UCEED'],
      duration: '4 Years',
      skills: ['Creativity', 'Sketching', 'Visualization'],
      outcomes: ['Fashion Designer', 'Product Designer', 'UX Designer']
    }
  },
  'mass-comm': {
    id: 'mass-comm',
    label: 'Mass Communication',
    description: 'Journalism, Advertising, PR, and Media.',
    type: 'career',
    data: {
      exams: ['CUET', 'Institute Exams (XIC, IIMC)'],
      duration: '3 Years (BMM/BJMC)',
      skills: ['Communication', 'Writing', 'Creativity', 'Networking'],
      outcomes: ['Journalist', 'Anchor', 'PR Manager', 'Content Creator']
    }
  },
  'civil-services-prep': {
    id: 'civil-services-prep',
    label: 'Civil Services (UPSC/MPSC)',
    description: 'Prepare for IAS, IPS, IFS while pursuing a BA degree.',
    type: 'career',
    data: {
      exams: ['UPSC CSE', 'MPSC State Services'],
      duration: '3 Years (Degree) + Prep',
      skills: ['General Knowledge', 'Analytical Thinking', 'Perseverance'],
      outcomes: ['IAS Officer', 'IPS Officer', 'District Collector', 'Diplomat']
    }
  },
  'teaching': {
    id: 'teaching',
    label: 'Teaching (B.Ed)',
    description: 'Become a teacher for schools or colleges.',
    type: 'career',
    data: {
      exams: ['TET', 'CTET', 'NET/SET (for college)'],
      duration: '3 Years (BA) + 2 Years (B.Ed)',
      skills: ['Patience', 'Communication', 'Subject Mastery'],
      outcomes: ['School Teacher', 'Professor', 'Lecturer']
    }
  },
  'social-work': {
    id: 'social-work',
    label: 'Social Work (BSW/MSW)',
    description: 'Professional social work and community development.',
    type: 'career',
    data: {
      exams: ['Institute Entrance'],
      duration: '3 Years (BSW) / 2 Years (MSW)',
      skills: ['Empathy', 'Social Awareness', 'Problem Solving'],
      outcomes: ['Social Worker', 'NGO Manager', 'CSR Executive']
    }
  },
  'physical-education': {
    id: 'physical-education',
    label: 'Physical Education (B.P.Ed)',
    description: 'Sports, fitness, and physical training.',
    type: 'career',
    data: {
      exams: ['Physical Efficiency Tests'],
      duration: '3-4 Years',
      skills: ['Fitness', 'Sportsmanship', 'Coaching'],
      outcomes: ['Sports Coach', 'PE Teacher', 'Fitness Trainer']
    }
  },
  'hotel-mgmt': {
    id: 'hotel-mgmt',
    label: 'Hotel Management (BHM)',
    description: 'Hospitality, hotel operations, and culinary arts.',
    type: 'career',
    data: {
      exams: ['NCHMCT JEE'],
      duration: '3-4 Years',
      skills: ['Communication', 'Service', 'Management'],
      outcomes: ['Hotel Manager', 'Chef', 'Front Office Manager']
    }
  },
  'animation': {
    id: 'animation',
    label: 'Animation & Gaming',
    description: '3D Animation, VFX, Game Design.',
    type: 'career',
    data: {
      exams: ['Institute Entrance', 'Portfolio'],
      duration: '3-4 Years',
      skills: ['Creativity', 'Software Skills', 'Visual Storytelling'],
      outcomes: ['Animator', 'Game Designer', 'VFX Artist']
    }
  },
  'ba-degree': {
    id: 'ba-degree',
    label: 'Bachelor of Arts (BA)',
    description: 'Specializations in History, Pol. Science, Psychology, etc.',
    type: 'career',
    data: {
      exams: ['CUET'],
      duration: '3 Years',
      skills: ['Critical Thinking', 'Writing', 'Research'],
      outcomes: ['Psychologist', 'Historian', 'Writer', 'Policy Analyst']
    }
  },
  'psychology': {
    id: 'psychology',
    label: 'Psychology',
    description: 'Study of human mind and behavior.',
    type: 'career',
    data: {
      exams: ['CUET'],
      duration: '3 Years (BA/BSc) + 2 Years (MA/MSc)',
      skills: ['Empathy', 'Analysis', 'Listening'],
      outcomes: ['Clinical Psychologist', 'Counselor', 'HR Specialist']
    }
  },

  // --- DIPLOMA ---
  'eng-degree-lateral': {
    id: 'eng-degree-lateral',
    label: 'Direct 2nd Year Engineering',
    description: 'Lateral entry into B.E./B.Tech after Diploma.',
    type: 'career',
    data: {
      exams: ['Lateral Entry CET'],
      duration: '3 Years',
      skills: ['Technical Skills', 'Practical Knowledge'],
      outcomes: ['Engineer']
    }
  },
  'job-junior-eng': {
    id: 'job-junior-eng',
    label: 'Junior Engineer Job',
    description: 'Start working immediately after Diploma.',
    type: 'career',
    data: {
      exams: ['SSC JE', 'RRB JE', 'State PSU Exams'],
      duration: 'N/A',
      skills: ['Technical Application'],
      outcomes: ['Junior Engineer', 'Technician']
    }
  }
};