'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { useFontStyles } from '@/hooks/useFontStyles';
import { FieldError } from 'react-hook-form';

interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: FieldError;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const fontStyles = useFontStyles();
    
    return (
      <div className="mb-3">
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`
              h-5 w-5 rounded border-gray-300 text-primary 
              focus:ring-2 focus:ring-primary/30 focus:ring-offset-0
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          
          <label 
            htmlFor={props.id || props.name} 
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            style={fontStyles.body}
          >
            {label}
          </label>
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

FormCheckbox.displayName = 'FormCheckbox';