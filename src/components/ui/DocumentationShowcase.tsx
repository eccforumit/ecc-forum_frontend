'use client';

import React from 'react';
import { Button } from './Button';

const DocumentationShowcase = () => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Component Documentation</h2>
      
      <div className="space-y-8">
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Theme System</h3>
          <div className="prose dark:prose-invert max-w-none">
            <p>The application supports light and dark themes using <code>next-themes</code>.</p>
            
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto">
              <code>{`import { useTheme } from 'next-themes';

const MyComponent = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('light')}>
        Light Mode
      </button>
      <button onClick={() => setTheme('dark')}>
        Dark Mode
      </button>
    </div>
  );
};`}</code>
            </pre>
            
            <p className="mt-4">When styling components, always use both light and dark mode classes:</p>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
              <code>{`<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  This text will be properly styled in both themes
</div>`}</code>
            </pre>
            
            <div className="mt-6">
              <h4 className="font-semibold">Try it:</h4>
              <div className="flex gap-3 mt-2">
                <Button variant="default" size="sm" onClick={() => {}}>
                  Normal Button
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => {}}
                  className="dark:bg-indigo-600 dark:hover:bg-indigo-700"
                >
                  Custom Dark Theme
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationShowcase;
