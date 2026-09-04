'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { ReactNode } from 'react';

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Paths that should not show the main Header and Footer
  const isDashboardPage = pathname?.startsWith('/dashboard');
  const isAuthPage = pathname?.startsWith('/auth');
  
  const shouldShowHeaderFooter = !isDashboardPage && !isAuthPage;

  if (!shouldShowHeaderFooter) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}