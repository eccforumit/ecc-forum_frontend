'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from './Button';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';

const ThemeShowcase = () => {
  const { theme, setTheme } = useTheme();
  
  const colorGroups = [
    {
      name: 'Primary',
      colors: [
        { name: '50', class: 'bg-primary-50' },
        { name: '100', class: 'bg-primary-100' },
        { name: '200', class: 'bg-primary-200' },
        { name: '300', class: 'bg-primary-300' },
        { name: '400', class: 'bg-primary-400' },
        { name: '500', class: 'bg-primary-500' },
        { name: '600', class: 'bg-primary-600' },
        { name: '700', class: 'bg-primary-700' },
        { name: '800', class: 'bg-primary-800' },
        { name: '900', class: 'bg-primary-900' },
      ]
    },
    {
      name: 'Secondary',
      colors: [
        { name: '50', class: 'bg-secondary-50' },
        { name: '100', class: 'bg-secondary-100' },
        { name: '200', class: 'bg-secondary-200' },
        { name: '300', class: 'bg-secondary-300' },
        { name: '400', class: 'bg-secondary-400' },
        { name: '500', class: 'bg-secondary-500' },
        { name: '600', class: 'bg-secondary-600' },
        { name: '700', class: 'bg-secondary-700' },
        { name: '800', class: 'bg-secondary-800' },
        { name: '900', class: 'bg-secondary-900' },
      ]
    }
  ];
  
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Theme Switcher</h2>
      
      <div className="mb-6 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Current Theme: {theme}</h3>
          <ThemeSwitcher />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Click the theme switcher above to toggle between light and dark mode
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setTheme('light')}
            leftIcon={<FiSun />}
          >
            Light Mode
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setTheme('dark')}
            leftIcon={<FiMoon />}
          >
            Dark Mode
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setTheme('system')}
            leftIcon={<FiMonitor />}
          >
            System
          </Button>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mt-6 mb-4">Color Palette</h3>
      <div className="space-y-6">
        {colorGroups.map((group) => (
          <div key={group.name}>
            <h4 className="font-medium mb-2">{group.name}</h4>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {group.colors.map((color) => (
                <div key={color.name} className="text-center">
                  <div 
                    className={`${color.class} h-10 rounded-md shadow-sm mb-1`} 
                  />
                  <span className="text-xs">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
        <h4 className="font-medium mb-3">Light/Dark Mode Text</h4>
        <p className="mb-2">
          This text uses <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">text-gray-900 dark:text-white</code>
        </p>
        
        <h4 className="font-medium mt-4 mb-3">Light/Dark Mode Background</h4>
        <div className="flex flex-wrap gap-3">
          <div className="p-3 bg-white dark:bg-gray-800 rounded border dark:border-gray-700">
            white / gray-800
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded border dark:border-gray-700">
            gray-50 / gray-900
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded border dark:border-gray-700">
            gray-100 / gray-700
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcase;
