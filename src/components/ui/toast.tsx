"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type ToastActionElement = React.ReactElement

// Simple Toast component
const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'destructive';
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
      variant === 'default' && "border-gray-200 bg-white text-gray-900",
      variant === 'destructive' && "border-red-200 bg-red-50 text-red-900",
      className
    )}
    {...props}
  />
))
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

export {
  type ToastProps,
  type ToastActionElement,
  Toast,
  ToastTitle,
  ToastDescription,
}