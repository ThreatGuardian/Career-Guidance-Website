import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ExamInfo {
  name: string;
  category: string;
  date: string;
  // Extended properties
  fullName?: string;
  description?: string;
  website?: string;
  pattern?: string;
  eligibility?: string;
}

export interface CareerPath {
  id: string;
  category: string;
  icon: LucideIcon;
  description: string;
  roles: string[];
  topColleges: string[];
  avgSalary: string;
  roadmap: RoadmapStep[];
}

export interface RoadmapStep {
  step: string;
  details: string;
}

export interface FlowNode {
  id: string;
  label: string;
  description?: string;
  type: 'stage' | 'stream' | 'career' | 'info';
  next?: string[]; // IDs of children
  data?: {
    exams?: string[];
    duration?: string;
    skills?: string[];
    outcomes?: string[];
  }
}

export interface ScholarshipInfo {
  name: string;
  eligibility: string;
  deadline: string;
  link?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  category: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'info' | 'success';
  link?: string;
  date: string;
  active: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'ppt' | 'doc' | 'other';
  downloadUrl: string;
  fileSize?: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  message: string;
  date: string;
  isRead: boolean;
  status?: 'pending' | 'completed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  timestamp: Date;
  audioData?: string; // Base64 audio string for TTS
}

export interface RoadmapRequest {
  grade: string;
  stream: string;
  interests: string;
  strongSubjects: string;
}