import React, { createContext, useContext, useState, useEffect } from 'react';
import { TokenManager } from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = TokenManager.getToken();
      const userData = localStorage.getItem('user');

      if (token && !TokenManager.isTokenExpired(token)) {
        setIsAuthenticated(true);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } else {
        // Token expired or doesn't exist
        logout();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginData) => {
    try {
      // Tokens are already stored by the API interceptor
      setIsAuthenticated(true);
      
      if (loginData.admin) {
        setUser(loginData.admin);
        localStorage.setItem('user', JSON.stringify(loginData.admin));
      }
      
      return true;
    } catch (error) {
      console.error('Login context error:', error);
      return false;
    }
  };

  const logout = () => {
    TokenManager.removeTokens();
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    updateUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;