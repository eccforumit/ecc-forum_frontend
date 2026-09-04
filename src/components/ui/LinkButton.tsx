'use client';

import React from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from './Button';

interface LinkButtonProps extends ButtonProps {
  href: string;
  target?: string;
  rel?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  target,
  rel,
  ...buttonProps
}) => {
  // External link check
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  
  if (isExternal) {
    return (
      <a href={href} target={target || '_blank'} rel={rel || 'noopener noreferrer'}>
        <Button {...buttonProps}>{children}</Button>
      </a>
    );
  }

  return (
    <Link href={href} passHref>
      <Button {...buttonProps}>{children}</Button>
    </Link>
  );
};
