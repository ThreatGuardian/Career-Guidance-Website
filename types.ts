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
}

export interface ScholarshipInfo {
  name: string;
  eligibility: string;
  deadline: string;
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