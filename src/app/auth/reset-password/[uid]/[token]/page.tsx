'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { passwordResetService } from '@/services/passwordResetService';

interface PageProps {
  params: {
    uid: string;
    token: string;
  };
}

export default function ResetPasswordConfirmPage({ params }: PageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Tous les champs sont requis');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setIsLoading(true);
    
    try {
      await passwordResetService.confirmReset({
        uid: params.uid,
        token: params.token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
      
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError?.response?.data?.message || 'Erreur lors de la réinitialisation';
      setError(errorMessage);
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
            <h2 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Mot de passe modifié !</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Votre mot de passe a été réinitialisé avec succès.
              <br />Redirection vers la connexion...
            </p>
            <Link href="/auth/login">
              <Button variant="primary" className="w-full">
                Se connecter maintenant
              </Button>
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Nouveau mot de passe</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Choisissez un nouveau mot de passe sécurisé.
            </p>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Modification...' : 'Modifier le mot de passe'}
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