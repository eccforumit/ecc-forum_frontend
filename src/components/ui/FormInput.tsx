'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { useFontStyles } from '@/hooks/useFontStyles';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  icon?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
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
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              block w-full rounded-md border border-gray-300 dark:border-gray-600 
              dark:bg-gray-800 py-2.5 px-4 
              ${icon ? 'pl-10' : 'pl-4'}
              text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-0 focus:border-primary
              transition duration-200 
              disabled:opacity-60 disabled:bg-gray-100 dark:disabled:bg-gray-700
              ${error ? 'border-red-500 dark:border-red-500' : ''}
              ${className}
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={fontStyles.body}
            {...props}
          />
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

FormInput.displayName = 'FormInput';