"use client";

import React from 'react';

// Minimal dropdown menu components - placeholder implementation
export const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-block">{children}</div>
);

export const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const DropdownMenuContent = ({ 
  children, 
  align = "start",
  className = ""
}: { 
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) => (
  <div className={`absolute top-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[120px] z-50 ${
    align === "end" ? "right-0" : "left-0"
  } ${className}`}>
    {children}
  </div>
);

export const DropdownMenuItem = ({ 
  children, 
  onClick,
  className = ""
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
  >
    {children}
  </button>
);
