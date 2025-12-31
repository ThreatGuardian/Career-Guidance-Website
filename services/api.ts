import { db } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { BlogPost, NotificationItem, ResourceItem } from '../types';

// Collection Names in Firestore
const COLLECTIONS = {
  BLOGS: 'blogs',
  NOTIFICATIONS: 'notifications',
  RESOURCES: 'resources',
  REGISTRATIONS: 'registrations'
};

// --- DATA TYPES ---
export interface RegistrationData {
  id?: string;
  name: string;
  serviceType: 'counselling' | 'assessment';
  amount: number;
  date: string;
  paymentStatus: 'pending' | 'paid';
  education?: string;
  address?: string;
  dob?: string;
  age?: string;
}

// --- MOCK DATA FOR INITIALIZATION (Fallbacks) ---
const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'mock-1',
    title: 'Choosing the Right Stream after 10th',
    excerpt: 'Confusion between Science, Commerce, and Arts is common. Here is a scientific way to decide based on aptitude and interest.',
    content: 'Choosing a career path is one of the most critical decisions in a student\'s life...',
    author: 'Bhagwan Pandekar',
    date: 'October 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    category: 'Career Guidance'
  },
  {
    id: 'mock-2',
    title: 'Top Engineering Entrance Exams 2024',
    excerpt: 'Apart from JEE Main, explore other prestigious engineering entrance exams like BITSAT, MHT-CET, and VITEEE.',
    content: 'While JEE Main is the most popular, there are several other exams...',
    author: 'Bhagwan Pandekar',
    date: 'November 2, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    category: 'Engineering'
  },
  {
    id: 'mock-3',
    title: 'Medical vs. Paramedical Careers',
    excerpt: 'Understanding the difference between MBBS, BDS, and other paramedical fields like Pharmacy and Biotechnology.',
    content: 'The medical field is vast and offers numerous opportunities beyond just becoming a doctor...',
    author: 'Bhagwan Pandekar',
    date: 'November 20, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    category: 'Medical'
  }
];

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'mock-n1',
    title: 'JEE Main 2024 Registration Open',
    message: 'The application window for Session 1 is now open. Last date to apply is Nov 30.',
    type: 'urgent',
    date: 'Nov 01, 2023',
    active: true,
    link: 'https://jeemain.nta.ac.in'
  },
  {
    id: 'mock-n2',
    title: 'New Aptitude Test Batches',
    message: 'Weekend slots available for comprehensive career assessment. Book now.',
    type: 'info',
    date: 'Nov 10, 2023',
    active: true
  }
];

const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: 'mock-r1',
    title: 'NEET 2024 Syllabus Guide',
    description: 'Updated topic-wise syllabus and weightage for Medical aspirants.',
    fileType: 'pdf',
    downloadUrl: '#',
    fileSize: '2.4 MB'
  },
  {
    id: 'mock-r2',
    title: 'MHT-CET Cutoff List (Previous Year)',
    description: 'College-wise cutoff marks for Engineering and Pharmacy in Pune.',
    fileType: 'pdf',
    downloadUrl: '#',
    fileSize: '1.8 MB'
  }
];

// --- API METHODS ---

// 1. BLOGS
export const BlogService = {
  getAll: async (): Promise<BlogPost[]> => {
    try {
      const q = query(collection(db, COLLECTIONS.BLOGS));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return MOCK_BLOGS;
      }
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost));
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return MOCK_BLOGS;
    }
  },
  
  create: async (post: Omit<BlogPost, 'id'>) => {
    const docRef = await addDoc(collection(db, COLLECTIONS.BLOGS), post);
    return { id: docRef.id, ...post };
  },

  update: async (id: string, data: Partial<BlogPost>) => {
    if (id.startsWith('mock-')) return;
    const docRef = doc(db, COLLECTIONS.BLOGS, id);
    await updateDoc(docRef, data);
  },

  delete: async (id: string) => {
    console.log(`[BlogService] Deleting post with ID: ${id}`);
    if (id.startsWith('mock-')) {
      console.warn("[BlogService] Cannot delete mock data from backend.");
      return; 
    }
    
    // Direct delete call. If it fails, it throws.
    // Ensure the ID is valid and exists in the 'blogs' collection.
    const docRef = doc(db, COLLECTIONS.BLOGS, id);
    await deleteDoc(docRef);
    console.log(`[BlogService] Successfully deleted post: ${id}`);
  }
};

// 2. NOTIFICATIONS
export const NotificationService = {
  getAll: async (): Promise<NotificationItem[]> => {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.NOTIFICATIONS));
      
      if (snapshot.empty) {
        return MOCK_NOTIFICATIONS;
      }

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NotificationItem));
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return MOCK_NOTIFICATIONS;
    }
  },

  create: async (item: Omit<NotificationItem, 'id'>) => {
    const docRef = await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), item);
    return { id: docRef.id, ...item };
  },

  update: async (id: string, data: Partial<NotificationItem>) => {
    if (id.startsWith('mock-')) return;
    const docRef = doc(db, COLLECTIONS.NOTIFICATIONS, id);
    await updateDoc(docRef, data);
  },

  delete: async (id: string) => {
    if (id.startsWith('mock-')) return;
    const docRef = doc(db, COLLECTIONS.NOTIFICATIONS, id);
    await deleteDoc(docRef);
  }
};

// 3. RESOURCES
export const ResourceService = {
  getAll: async (): Promise<ResourceItem[]> => {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.RESOURCES));
      
      if (snapshot.empty) {
        return MOCK_RESOURCES;
      }

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ResourceItem));
    } catch (error) {
      console.error("Error fetching resources:", error);
      return MOCK_RESOURCES;
    }
  },

  create: async (item: Omit<ResourceItem, 'id'>) => {
    const docRef = await addDoc(collection(db, COLLECTIONS.RESOURCES), item);
    return { id: docRef.id, ...item };
  },

  update: async (id: string, data: Partial<ResourceItem>) => {
    if (id.startsWith('mock-')) return;
    const docRef = doc(db, COLLECTIONS.RESOURCES, id);
    await updateDoc(docRef, data);
  },

  delete: async (id: string) => {
    if (id.startsWith('mock-')) return;
    const docRef = doc(db, COLLECTIONS.RESOURCES, id);
    await deleteDoc(docRef);
  }
};

// 4. REGISTRATIONS
export const RegistrationService = {
  create: async (data: Omit<RegistrationData, 'id' | 'date'>) => {
    const newReg = {
      ...data,
      date: new Date().toISOString(),
      created_at: new Date() // Firestore timestamp helper
    };
    
    const docRef = await addDoc(collection(db, COLLECTIONS.REGISTRATIONS), newReg);
    return { id: docRef.id, ...newReg };
  },

  getAll: async (): Promise<RegistrationData[]> => {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.REGISTRATIONS));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as RegistrationData));
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return [];
    }
  }
};