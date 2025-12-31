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