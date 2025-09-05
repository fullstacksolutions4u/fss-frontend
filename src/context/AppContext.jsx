// File: src/context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create Context
const AppContext = createContext();

// App Provider Component
export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    contacts: [],
    projects: [],
    isLoading: false,
    notifications: [],
  });

  // Contact Methods
  const addContact = async (contactData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const newContact = await response.json();
        setAppState(prev => ({
          ...prev,
          contacts: [...prev.contacts, newContact],
        }));
        addNotification({
          type: 'success',
          message: 'Message sent successfully!',
        });
        return true;
      } else {
        addNotification({
          type: 'error',
          message: 'Failed to send message. Please try again.',
        });
        return false;
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      addNotification({
        type: 'error',
        message: 'Network error. Please check your connection.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setAppState(prev => ({
          ...prev,
          contacts: prev.contacts.map(contact => 
            contact.id === id ? { ...contact, status } : contact
          ),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Contact update error:', error);
      return false;
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        setAppState(prev => ({
          ...prev,
          contacts: prev.contacts.filter(contact => contact.id !== id),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Contact deletion error:', error);
      return false;
    }
  };

  // Project Methods
  const addProject = async (projectData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const newProject = await response.json();
        setAppState(prev => ({
          ...prev,
          projects: [...prev.projects, newProject],
        }));
        addNotification({
          type: 'success',
          message: 'Project added successfully!',
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Project creation error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setAppState(prev => ({
          ...prev,
          projects: prev.projects.map(project => 
            project.id === id ? updatedProject : project
          ),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Project update error:', error);
      return false;
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        setAppState(prev => ({
          ...prev,
          projects: prev.projects.filter(project => project.id !== id),
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Project deletion error:', error);
      return false;
    }
  };

  // Notification Methods
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    setAppState(prev => ({
      ...prev,
      notifications: [...prev.notifications, newNotification],
    }));

    // Auto remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setAppState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(notif => notif.id !== id),
    }));
  };

  // Utility Methods
  const setLoading = (loading) => {
    setAppState(prev => ({
      ...prev,
      isLoading: loading,
    }));
  };

  const value = {
    appState,
    addContact,
    updateContactStatus,
    deleteContact,
    addProject,
    updateProject,
    deleteProject,
    addNotification,
    removeNotification,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;