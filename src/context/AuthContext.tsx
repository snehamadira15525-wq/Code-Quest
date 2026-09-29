import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { User } from '../types/index.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, confirmPassword?: string) => Promise<{ success: boolean; message?: string }>;
  loginAsDemo: () => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  refreshUser: () => Promise<void>;
  celebrate: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('py_dsa_token'));
  const [loading, setLoading] = useState<boolean>(true);

  const celebrate = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6'],
      });
    } catch (e) {
      // ignore
    }
  };

  const refreshUser = async () => {
    const savedToken = localStorage.getItem('py_dsa_token');
    if (!savedToken) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('py_dsa_token');
        setToken(null);
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to fetch user session:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }
      localStorage.setItem('py_dsa_token', data.token);
      setToken(data.token);
      setUser(data.user);
      celebrate();
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  };

  const register = async (name: string, email: string, password: string, confirmPassword?: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || 'Registration failed' };
      }
      localStorage.setItem('py_dsa_token', data.token);
      setToken(data.token);
      setUser(data.user);
      celebrate();
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  };

  const loginAsDemo = async () => {
    await login('alex@example.com', 'password123');
  };

  const logout = () => {
    localStorage.removeItem('py_dsa_token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        loginAsDemo,
        logout,
        updateUser,
        refreshUser,
        celebrate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
