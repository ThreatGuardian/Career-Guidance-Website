import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, ExternalLink, Calendar } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationSystemProps {
  notifications: NotificationItem[];
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter active notifications
    const active = notifications.filter(n => n.active);
    setActiveNotifications(active);
    
    // Check local storage for read status or just count all active for now
    setUnreadCount(active.length);
  }, [notifications]);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (activeNotifications.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3"
    >
      {/* Pop-up Card */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-80 sm:w-96 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 origin-bottom-right mb-2">
          {/* Header */}
          <div className="bg-brand-navy p-4 flex justify-between items-center text-white shadow-sm">
            <h3 className="font-heading font-bold text-sm flex items-center gap-2">
              <Bell size={16} className="text-brand-accent" /> 
              Recent Updates
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar bg-gray-50 pb-2">
            {activeNotifications.map((note) => (
              <div 
                key={note.id} 
                className={`p-4 border-b border-gray-100 bg-white hover:bg-blue-50/50 transition-colors relative group ${
                  note.type === 'urgent' ? 'border-l-4 border-l-red-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1 gap-3">
                  <h4 
                    className="font-bold text-gray-800 text-sm truncate flex-1"
                    title={note.title} // Tooltip for full title
                  >
                    {note.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap flex items-center gap-1 shrink-0">
                    <Calendar size={10} /> {note.date}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {note.message}
                </p>

                {note.link && (
                  <a 
                    href={note.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand-accent hover:underline"
                  >
                    View Details <ExternalLink size={10} />
                  </a>
                )}
                
                {/* Urgent Dot Indicator */}
                {note.type === 'urgent' && (
                   <span className="absolute top-2 right-2 flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                   </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-4 ${
          isOpen 
            ? 'bg-brand-navy text-white border-brand-navy/20' 
            : 'bg-white text-brand-navy border-white hover:border-blue-50'
        }`}
      >
        <Bell 
          size={24} 
          className={`transition-transform duration-500 ${!isOpen ? 'group-hover:rotate-12' : ''}`} 
          fill={isOpen ? "currentColor" : "none"}
        />
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationSystem;