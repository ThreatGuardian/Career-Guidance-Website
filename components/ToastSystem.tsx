import React, { useState, useEffect, useCallback } from 'react';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  exiting?: boolean;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

// Simple toast store
let toastListeners: Array<(toasts: ToastItem[]) => void> = [];
let toastState: ToastItem[] = [];

function notify() {
  toastListeners.forEach(fn => fn([...toastState]));
}

export const toast = {
  show: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    toastState = [...toastState, { id, message, type }];
    notify();
    // Auto-remove after 4 seconds
    setTimeout(() => {
      toastState = toastState.map(t => t.id === id ? { ...t, exiting: true } : t);
      notify();
      setTimeout(() => {
        toastState = toastState.filter(t => t.id !== id);
        notify();
      }, 300);
    }, 4000);
  },
  success: (message: string) => toast.show(message, 'success'),
  error: (message: string) => toast.show(message, 'error'),
  info: (message: string) => toast.show(message, 'info'),
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (t: ToastItem[]) => setToasts(t);
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${t.exiting ? 'toast-exit' : 'toast-enter'} px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 text-sm font-medium backdrop-blur-sm ${
            t.type === 'success' ? 'bg-green-50/95 text-green-800 border-green-200' :
            t.type === 'error' ? 'bg-red-50/95 text-red-800 border-red-200' :
            'bg-blue-50/95 text-blue-800 border-blue-200'
          }`}
        >
          <span className={`w-2 h-2 rounded-full shrink-0 ${
            t.type === 'success' ? 'bg-green-500' :
            t.type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          }`}></span>
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
