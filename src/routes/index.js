import React from 'react';
import Home from '../pages/Home';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';

export const routes = {
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

export const RouteHandler = ({ 
  currentPath, 
  isAuthenticated, 
  user, 
  onLoginSuccess, 
  onLogout 
}) => {
  const route = routes[currentPath];
  
  if (!route) {
    return <Home />;
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
  
  return <Component />;
};

export default RouteHandler;