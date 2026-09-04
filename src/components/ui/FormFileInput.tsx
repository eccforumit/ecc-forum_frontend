'use client';

import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import Image from 'next/image';
import { useFontStyles } from '@/hooks/useFontStyles';

interface FormFileInputProps {
  label: string;
  accept?: string;
  error?: FieldError;
  multiple?: boolean;
  maxSize?: number; // in MB
  preview?: boolean;
  className?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormFileInput = forwardRef<HTMLInputElement, FormFileInputProps>(
  ({ label, accept = "image/*", error, multiple = false, maxSize = 2, preview = true, className = "", ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const fontStyles = useFontStyles();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          return; // Let form validation handle the error
        }
        
        // Create preview for images
        if (preview && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
      } else {
        setFileName('');
        setPreviewUrl(null);
      }
      
      // Call the original onChange
      props.onChange(event);
    };

    return (
      <div className={`mb-4 ${className}`}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" style={fontStyles.body}>
          {label}
          {!accept.includes('*') && (
            <span className="text-xs text-gray-500 ml-2">
              (Max: {maxSize}MB)
            </span>
          )}
        </label>
        
        <div className="space-y-3">
          {/* File Input */}
          <div className="relative">
            <input
              type="file"
              accept={accept}
              multiple={multiple}
              ref={ref}
              className="hidden"
              id={props.name}
              {...props}
              onChange={handleFileChange}
            />
            <label
              htmlFor={props.name}
              className={`
                flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer
                transition-colors duration-200
                ${error 
                  ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/10' 
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                }
              `}
            >
              <div className="text-center">
                <svg 
                  className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" 
                  stroke="currentColor" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
                <p className="text-sm text-gray-600 dark:text-gray-400" style={fontStyles.body}>
                  Cliquez pour sélectionner une image
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  JPG, PNG, GIF jusqu&apos;à {maxSize}MB
                </p>
              </div>
            </label>
          </div>

          {/* File Info */}
          {fileName && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="truncate">{fileName}</span>
            </div>
          )}

          {/* Image Preview */}
          {previewUrl && (
            <div className="relative w-24 h-24 mx-auto">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setFileName('');
                  const input = document.getElementById(props.name) as HTMLInputElement;
                  if (input) input.value = '';
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400" style={fontStyles.body}>
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormFileInput.displayName = 'FormFileInput';