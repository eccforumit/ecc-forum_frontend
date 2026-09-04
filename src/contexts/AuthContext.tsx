'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
    } finally {
      setUser(null);
      router.push('/');
    }
  }, [router]);

  const refreshUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUser(null);
        return;
      }

      const result = await authService.getCurrentUser();
      
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        logout();
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
      } else {
        logout();
      }
    }
  }, [logout]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof window === 'undefined') return;
        
        const token = localStorage.getItem('authToken');
        if (token) {
          await refreshUser();
        }
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [logout, refreshUser]);

  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userType', userData.user_type);
    localStorage.setItem('userId', userData.id.toString());
    localStorage.setItem('userEmail', userData.email);
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}