import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from "./components/common/Navbar"


const TokenManager = {
  getToken: () => localStorage.getItem('authToken'),
  getUser: () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },
  isTokenExpired: (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  },
  clearAuth: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};


const routes = {
  '/': {
    component: Home,
    protected: false
  },
  '/admin/login': {
    component: AdminLogin,
    protected: false
  },
  '/admin/dashboard': {
    component: AdminDashboard,
    protected: true
  }
};

// Route handler component
const RouteHandler = ({ 
  currentPath, 
  isAuthenticated, 
  user, 
  onLoginSuccess, 
  onLogout 
}) => {
  const route = routes[currentPath];
  const isAdminRoute = currentPath.startsWith('/admin');
  
  // If route doesn't exist, default to Home
  if (!route) {
    return (
      <div>
        <Navbar currentPath={currentPath} />
        <Home />
      </div>
    );
  }
  
  // Check if route is protected and user is not authenticated
  if (route.protected && !isAuthenticated) {
    window.location.href = '/admin/login';
    return null;
  }
  
  // Render the component based on route
  const Component = route.component;
  
  if (currentPath === '/admin/login') {
    return <Component onLoginSuccess={onLoginSuccess} />;
  }
  
  if (currentPath === '/admin/dashboard') {
    return <Component user={user} onLogout={onLogout} />;
  }
  
  // For public pages, include navbar
  return (
    <div>
      <Navbar currentPath={currentPath} />
      <Component />
    </div>
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Main App component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Listen to browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = TokenManager.getToken();
      const userData = TokenManager.getUser();

      if (token && !TokenManager.isTokenExpired(token)) {
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        TokenManager.clearAuth();
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      TokenManager.clearAuth();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (loginData) => {
    if (loginData.accessToken) {
      localStorage.setItem('authToken', loginData.accessToken);
    }
    if (loginData.refreshToken) {
      localStorage.setItem('refreshToken', loginData.refreshToken);
    }
    if (loginData.admin) {
      localStorage.setItem('user', JSON.stringify(loginData.admin));
      setUser(loginData.admin);
    }
    
    setIsAuthenticated(true);
    window.location.href = '/admin/dashboard';
  };

  const handleLogout = () => {
    TokenManager.clearAuth();
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/admin/login';
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <RouteHandler
      currentPath={currentPath}
      isAuthenticated={isAuthenticated}
      user={user}
      onLoginSuccess={handleLoginSuccess}
      onLogout={handleLogout}
    />
  );
};

export default App;