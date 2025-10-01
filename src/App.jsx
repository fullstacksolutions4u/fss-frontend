import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer"
import Lottie from "lottie-react";
import spinner from "./assets/animations/spinner.json";

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

const RouteHandler = ({ currentPath, isAuthenticated, user, onLoginSuccess, onLogout }) => {
  const route = routes[currentPath];

  if (!route) {
    return (
      <div>
        <Navbar currentPath={currentPath} />
        <Home />
        <Footer />
      </div>
    );
  }

  if (route.protected && !isAuthenticated) {
    window.location.href = '/admin/login';
    return null;
  }

  const Component = route.component;

  if (currentPath === '/admin/login') {
    return <Component onLoginSuccess={onLoginSuccess} />;
  }

  if (currentPath === '/admin/dashboard') {
    return <Component user={user} onLogout={onLogout} />;
  }

  return (
    <div>
      <Navbar currentPath={currentPath} />
      <Component />
      <Footer />
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <Lottie
        animationData={spinner}
        loop={true}
        className="w-20 h-20 mx-auto mb-4"
      />
    </div>
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = TokenManager.getToken();
      const userData = TokenManager.getUser();

      await new Promise(resolve => setTimeout(resolve, 1500));

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

  const navigateTo = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  const handleLoginSuccess = (loginData) => {
    setIsAuthenticated(true);
    setUser(loginData.admin);
    navigateTo('/admin/dashboard');
  };

  const handleLogout = () => {
    TokenManager.clearAuth();
    setIsAuthenticated(false);
    setUser(null);
    navigateTo('/admin/login');
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