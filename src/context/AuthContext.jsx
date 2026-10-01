import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { INITIAL_USER } from '../services/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edugenie_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [token, setToken] = useState(() => localStorage.getItem('edugenie_token') || 'demo_token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If not set, initialize demo session
    if (!localStorage.getItem('edugenie_token')) {
      localStorage.setItem('edugenie_token', 'demo_token');
      localStorage.setItem('edugenie_user', JSON.stringify(INITIAL_USER));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.auth.login(email, password);
      if (res && res.user) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('edugenie_token', res.token);
        localStorage.setItem('edugenie_user', JSON.stringify(res.user));
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    setLoading(true);
    try {
      const res = await api.auth.register(fullName, email, password);
      if (res && res.user) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('edugenie_token', res.token);
        localStorage.setItem('edugenie_user', JSON.stringify(res.user));
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('edugenie_token');
    localStorage.removeItem('edugenie_user');
    setUser(null);
    setToken(null);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('edugenie_user', JSON.stringify(updated));
  };

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
