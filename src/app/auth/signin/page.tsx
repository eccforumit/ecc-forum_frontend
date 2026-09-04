'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SignInRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const callbackUrl = searchParams?.get('callbackUrl') || '';
    const redirectUrl = callbackUrl ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : '/auth/login';
    
    // Redirect to the login page
    router.replace(redirectUrl);
  }, [router, searchParams]);

  // Show a minimal loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export default function SignInRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <SignInRedirectContent />
    </Suspense>
  );
}
