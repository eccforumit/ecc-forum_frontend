'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useFontStyles } from '@/hooks/useFontStyles';
import { FieldError } from 'react-hook-form';

interface FormPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: FieldError;
  icon?: React.ReactNode;
  showToggle?: boolean;
}

export const FormPasswordInput = forwardRef<HTMLInputElement, FormPasswordInputProps>(
  ({ label, error, icon, showToggle = true, className = '', ...props }, ref) => {
    const fontStyles = useFontStyles();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
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
            type={showPassword ? 'text' : 'password'}
            className={`
              block w-full rounded-md border border-gray-300 dark:border-gray-600 
              dark:bg-gray-800 py-2.5 px-4 
              ${icon ? 'pl-10' : 'pl-4'}
              ${showToggle ? 'pr-10' : 'pr-4'}
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
          
          {showToggle && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
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

FormPasswordInput.displayName = 'FormPasswordInput';