'use client';

import { forwardRef, SelectHTMLAttributes, useState } from 'react';
import { useFontStyles } from '@/hooks/useFontStyles';
import { FieldError } from 'react-hook-form';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: FieldError;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    const fontStyles = useFontStyles();
    const [isFocused, setIsFocused] = useState(false);
    
    return (
      <div className="mb-4">
        <label 
          htmlFor={props.id || props.name} 
          className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300"
          style={fontStyles.sans}
        >
          {label}
        </label>
        
        <div className={`
          relative rounded-md shadow-sm
          ${isFocused ? 'ring-2 ring-primary/30' : ''}
          ${error ? 'ring-2 ring-red-500/40' : ''}
        `}>
          <select
            ref={ref}
            className={`
              block w-full rounded-md border border-gray-300 dark:border-gray-600 
              dark:bg-gray-800 py-2.5 px-4 
              text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-0 focus:border-primary
              transition duration-200 
              appearance-none
              disabled:opacity-60 disabled:bg-gray-100 dark:disabled:bg-gray-700
              ${error ? 'border-red-500 dark:border-red-500' : ''}
              ${className}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={fontStyles.body}
            {...props}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg 
              className="w-4 h-4 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400" style={fontStyles.body}>
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';