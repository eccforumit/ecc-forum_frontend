import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook pour protéger les routes qui nécessitent une vérification d'email
 */
export const useEmailVerificationGuard = (redirectPath: string = '/auth/verify-email') => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Attendre que l'authentification soit vérifiée
    if (isLoading) return;

    // Si l'utilisateur est connecté mais email non vérifié
    if (user && !user.is_email_verified) {
      // Stocker l'email pour la page de vérification
      localStorage.setItem('pendingVerificationEmail', user.email);
      
      // Rediriger vers la page de vérification
      router.push(redirectPath);
    }
  }, [user, isLoading, router, redirectPath]);

  // Retourner si l'utilisateur peut accéder à la page
  return {
    canAccess: !isLoading && user && user.is_email_verified,
    isLoading: isLoading,
    user: user
  };
};

/**
 * Composant HOC pour protéger les pages
 */
export function withEmailVerification<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectPath: string = '/auth/verify-email'
) {
  return function EmailProtectedComponent(props: P) {
    const { canAccess, isLoading } = useEmailVerificationGuard(redirectPath);

    // Afficher un loader pendant la vérification
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      );
    }

    // Si l'utilisateur ne peut pas accéder, ne rien afficher 
    // (il sera redirigé par le hook)
    if (!canAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Redirection vers la vérification d&apos;email...
            </p>
          </div>
        </div>
      );
    }

    // Afficher le composant protégé
    return <WrappedComponent {...props} />;
  };
}