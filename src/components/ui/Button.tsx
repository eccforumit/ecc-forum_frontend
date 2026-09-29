'use client';

import React, { ReactNode, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' |'primary' | 'secondary' | 'outline' | 'ghost'| 'success';
  size?: 'xs'|'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const getVariantClasses = (variant: ButtonProps['variant'] = 'primary') => {
  switch (variant) {
    case 'primary':
      return 'bg-gradient-to-r from-primary to-primary-700 text-white hover:from-primary-700 hover:to-primary';
    case 'secondary':
      return 'bg-gradient-to-r from-secondary to-secondary-700 text-white hover:from-secondary-700 hover:to-secondary';
    case 'outline':
      return 'border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary';
    case 'ghost':
      return 'bg-transparent text-foreground hover:bg-gray-100 dark:hover:bg-gray-800';
    default:
      return 'bg-gradient-to-r from-primary to-primary-700 text-white hover:from-primary-700 hover:to-primary';
  }
};

const getSizeClasses = (size: ButtonProps['size'] = 'md') => {
  switch (size) {
    case 'sm':
      return 'h-9 px-3 py-1 text-sm';
    case 'md':
      return 'h-10 px-4 py-2';
    case 'lg':
      return 'h-12 px-6 py-3 text-lg';
    case 'icon':
      return 'h-10 w-10';
    default:
      return 'h-10 px-4 py-2';
  }
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      asChild = false,
      leftIcon,
      rightIcon,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(size);

    // If asChild is true, we need to ensure we only pass one child to Slot
    if (asChild) {
      // Clone the child element and add our props to it
      const child = React.Children.only(children as React.ReactElement);
      return (
        <Comp
          className={`inline-flex items-center justify-center rounded-full font-medium transition-all 
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                      disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm 
                      ${variantClasses} ${sizeClasses} ${className}`}
          ref={ref}
          disabled={isLoading || props.disabled}
          {...props}
        >
          {React.cloneElement(child, {
            children: (
              <>
                {isLoading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
                {child.props.children}
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
              </>
            )
          })}
        </Comp>
      );
    }

    return (
      <Comp
        className={`inline-flex items-center justify-center rounded-full font-medium transition-all 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                    disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm 
                    ${variantClasses} ${sizeClasses} ${className}`}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
