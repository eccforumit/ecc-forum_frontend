'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: {
    uid: string;
    token: string;
  };
}

export default function VerifyEmailConfirmPage({ params }: PageProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.get(`/auth/verify-email/${params.uid}/${params.token}`);
        setStatus('success');
        setMessage('Email vérifié avec succès !');
        
        // Redirection après 3 secondes
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
        
      } catch (error: unknown) {
        // Vérifier si l'erreur indique que l'email est déjà vérifié
        const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
        const isAlreadyVerified = axiosError?.response?.status === 400 && 
          axiosError?.response?.data?.message?.includes('invalide ou expiré');
        
        if (isAlreadyVerified) {
          // Email probablement déjà vérifié, afficher le succès
          setStatus('success');
          setMessage('Email déjà vérifié !');
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Erreur lors de la vérification');
        }
      }
    };

    if (params.uid && params.token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('Lien invalide');
    }
  }, [params.uid, params.token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Vérification en cours...</h2>
            <p className="text-gray-600 dark:text-gray-300">Veuillez patienter</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">
              {message}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Redirection automatique vers la connexion...
            </p>
            <Link href="/auth/login">
              <Button variant="primary" className="w-full">
                Se connecter maintenant
              </Button>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
              {message}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Le lien peut avoir expiré ou être invalide.
            </p>
            <div className="space-y-3">
              <Link href="/auth/verify-email">
                <Button variant="primary" className="w-full">
                  Renvoyer un email
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}