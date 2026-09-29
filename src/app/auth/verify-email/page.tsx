'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const email = localStorage.getItem('pendingVerificationEmail');
    setPendingEmail(email);
  }, []);

  // Determine current theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const handleResendEmail = async () => {
    if (!pendingEmail) {
      alert('Aucun email en attente de vérification trouvé.');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/auth/verify-email/resend', { email: pendingEmail });
      setEmailSent(true);
    } catch {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {/* Logo */}
        <div className="mb-6">
          {mounted && (
            <Image
              src={isDark ? "/images/logo_forum.png" : "/images/logo_normal.png"}
              alt="Forum ECC Logo"
              width={120}
              height={120}
              className="mx-auto"
              priority
            />
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Vérifiez votre email</h2>
        
        {pendingEmail && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Email envoyé à : <span className="font-semibold text-blue-600">{pendingEmail}</span>
          </p>
        )}
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Cliquez sur le lien dans l&apos;email pour activer votre compte.
          Vérifiez aussi votre dossier spam.
        </p>

        {emailSent && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">
              ✅ Email renvoyé avec succès !
            </p>
          </div>
        )}

        <div className="space-y-6">
          <Button
            onClick={handleResendEmail}
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Envoi...' : "Renvoyer l'email"}
          </Button>
          
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">
              Retour à la connexion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}