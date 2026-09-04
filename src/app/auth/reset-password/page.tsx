'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import { passwordResetService } from '@/services/passwordResetService';

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email requis');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await passwordResetService.requestReset({ email });
      setIsSuccess(true);
    } catch {
      setError('Erreur lors de l\'envoi. Veuillez réessayer.');
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

        {isSuccess ? (
          <>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Email envoyé !</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Un lien de réinitialisation a été envoyé à :<br />
              <span className="font-semibold text-blue-600">{email}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">Vérifiez vos spams si nécessaire.</p>
            <div className="space-y-3">
              <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full">
                Renvoyer
              </Button>
              <Link href="/auth/login">
                <Button variant="primary" className="w-full">
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Mot de passe oublié ?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Entrez votre email pour recevoir un lien de réinitialisation.
            </p>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Envoi...' : 'Envoyer le lien'}
              </Button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Retour à la connexion
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}