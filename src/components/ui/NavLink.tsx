'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

/**
 * A navigation link with active state detection
 */
export const NavLink = ({
  href,
  children,
  className = '',
  activeClassName = 'text-primary',
  exact = false,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href) && href !== '/' ? true : pathname === href;

  return (
    <Link
      href={href}
      className={`relative transition-all duration-300 ${className} ${isActive ? activeClassName : ''}`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
};