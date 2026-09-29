'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// User types
type UserRole = 'student' | 'company' | null;

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  companyName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, role: UserRole, user: AuthUser) => void;
  logout: () => void;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component for authentication state
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  
  /**
   * Logout user
   */
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setUser(null);
    router.push('/');
  }, [router]);
  
  // Initialize auth state from local storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window === 'undefined') return;
        
        const token = localStorage.getItem('authToken');
        const storedRole = localStorage.getItem('userRole') as UserRole;
        
        if (token) {
          // In a real application, we would verify token validity with the server
          // For now, we'll just set the user based on stored data
          const userStub: AuthUser = {
            id: 'user-id',
            email: 'user@example.com',
            role: storedRole,
            firstName: storedRole === 'student' ? 'John' : undefined,
            lastName: storedRole === 'student' ? 'Doe' : undefined,
            companyName: storedRole === 'company' ? 'Acme Corp' : undefined,
          };
          
          setUser(userStub);
        }
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [logout]);

  /**
   * Login user
   */
  const login = (token: string, role: UserRole, userData: AuthUser) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role as string);
    setUser(userData);
  };

  // Needed for client-side rendering
  const contextValue = {
    user, 
    isLoading, 
    isAuthenticated: !!user,
    login, 
    logout 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook for using authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}