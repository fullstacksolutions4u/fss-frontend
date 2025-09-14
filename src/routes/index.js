import React from 'react';
import Home from '../pages/Home';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';

// Route configuration
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

// Route handler
export const RouteHandler = ({ 
  currentPath, 
  isAuthenticated, 
  user, 
  onLoginSuccess, 
  onLogout 
}) => {
  const route = routes[currentPath];
  
  // If route doesn't exist, default to Home
  if (!route) {
    return <Home />;
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
  
  // Default component (Home)
  return <Component />;
};

export default RouteHandler;