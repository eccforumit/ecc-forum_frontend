'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFontStyles } from '@/hooks/useFontStyles';

type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'destructive';

type ToastProps = {
  id: string;
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: () => void;
};

type ToastContextType = {
  toast: (props: {
    title?: string;
    description: string;
    variant?: ToastVariant;
    duration?: number;
  }) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const Toast = ({title, description, variant = 'info', duration = 5000, onClose }: ToastProps) => {
  const fontStyles = useFontStyles();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  // Icon based on variant
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'error':
      case 'destructive':
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 dark:text-red-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-200" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };
  
  // Background color based on variant
  const getClasses = () => {
    const baseClasses = "max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto overflow-hidden";
    
    switch (variant) {
      case 'success':
        return `${baseClasses} border-l-4 border-green-500`;
      case 'error':
      case 'destructive':
        return `${baseClasses} border-l-4 border-red-500`;
      case 'warning':
        return `${baseClasses} border-l-4 border-amber-500`;
      case 'info':
      default:
        return `${baseClasses} border-l-4 border-blue-500`;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={getClasses()}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            {title && (
              <p className="font-medium text-gray-900 dark:text-white" style={fontStyles.heading}>
                {title}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" style={fontStyles.body}>
              {description}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="bg-white dark:bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="sr-only">Fermer</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  const addToast = ({ title, description, variant = 'info', duration = 5000 }: {
    title?: string;
    description: string;
    variant?: ToastVariant;
    duration?: number;
  }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prevToasts => [...prevToasts, { id, title, description, variant, duration, onClose: () => removeToast(id) }]);
  };
  
  const removeToast = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 z-50 w-full md:max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <div key={toast.id} className="mb-3">
              <Toast {...toast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// For legacy compatibility
export const Toaster = () => null;
