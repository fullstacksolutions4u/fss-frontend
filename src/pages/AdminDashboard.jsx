import React, { useState, useEffect } from 'react';
import { enquiryAPI, authAPI } from '../services/api';
import EditEnquiryModal from '../components/dashboard/EditEnquiryModal';

const AdminDashboard = ({ user: propUser, onLogout }) => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(propUser || null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  
  // Enquiries data
  const [enquiries, setEnquiries] = useState([]);
  
  // Filters and pagination
  const [enquiryFilters, setEnquiryFilters] = useState({
    status: '',
    service: '',
    priority: '',
    page: 1,
    limit: 20,
    search: ''
  });
  
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Check if user is authenticated and load data
  useEffect(() => {
    if (!authToken) {
      setIsLoading(false);
      return;
    }
    loadUserProfile();
    loadEnquiries();
  }, [authToken]);

  // Load enquiries when filters change
  useEffect(() => {
    if (authToken) {
      loadEnquiries();
    }
  }, [enquiryFilters, authToken]);

  const loadUserProfile = async () => {
    try {
      const userData = propUser || JSON.parse(localStorage.getItem('user') || '{}');
      setUser({
        id: userData.id || 1,
        name: userData.name || 'Admin User',
        email: userData.email || 'admin@fullstacksolutions.com',
        role: userData.role || 'Super Admin'
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadEnquiries = async () => {
    if (!authToken) return;
    
    try {
      setIsLoading(true);
      
      // Call your real API endpoint
      const response = await enquiryAPI.getAll(enquiryFilters);
      
      if (response.success) {
        setEnquiries(response.data.enquiries || response.data || []);
        setTotalEnquiries(response.data.total || response.data.length || 0);
      }
      
    } catch (error) {
      console.error('Error loading enquiries:', error);
      
      if (error.status === 401) {
        handleAuthError();
      }
      
      // Reset to empty array on error
      setEnquiries([]);
      setTotalEnquiries(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setAuthToken(null);
    if (onLogout) {
      onLogout();
    }
  };

  const handleStatusUpdate = async (enquiryId, newStatus) => {
    if (!authToken) return;
    
    try {
      const response = await enquiryAPI.updateStatus(enquiryId, newStatus, 'Status updated from dashboard');
      
      if (response.success) {
        // Update local state
        setEnquiries(prev => prev.map(enquiry => 
          enquiry.id === enquiryId ? { ...enquiry, status: newStatus } : enquiry
        ));
        
        if (selectedEnquiry?.id === enquiryId) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
        
        console.log(`Status updated to ${newStatus} for enquiry ${enquiryId}`);
      }
      
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating enquiry status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    sessionStorage.clear();
    setAuthToken(null);
    
    if (onLogout) {
      onLogout();
    }
    
    console.log('Logged out successfully');
  };

  const handleEditEnquiry = (enquiry) => {
    setEditingEnquiry(enquiry);
    setIsEditModalOpen(true);
  };

  const handleUpdateEnquiry = async (updatedEnquiry) => {
    try {
      // In a real app, you'd call an API to update the enquiry
      // For now, we'll just update local state
      setEnquiries(prev => prev.map(enquiry => 
        enquiry.id === updatedEnquiry.id ? updatedEnquiry : enquiry
      ));
      
      if (selectedEnquiry?.id === updatedEnquiry.id) {
        setSelectedEnquiry(updatedEnquiry);
      }
      
      setIsEditModalOpen(false);
      setEditingEnquiry(null);
      console.log('Enquiry updated:', updatedEnquiry);
      
    } catch (error) {
      console.error('Error updating enquiry:', error);
      alert('Error updating enquiry');
    }
  };

  const handleDeleteEnquiry = async (enquiryId) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) {
      return;
    }
    
    try {
      const response = await enquiryAPI.delete(enquiryId);
      
      if (response.success) {
        setEnquiries(prev => prev.filter(enquiry => enquiry.id !== enquiryId));
        setTotalEnquiries(prev => prev - 1);
        console.log('Enquiry deleted:', enquiryId);
      }
      
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Error deleting enquiry');
    }
  };

  const handleAddNote = async (enquiryId, note) => {
    try {
      const response = await enquiryAPI.addNote(enquiryId, note, false);
      
      if (response.success) {
        // Reload enquiries to get updated data
        loadEnquiries();
        console.log('Note added to enquiry:', enquiryId);
      }
      
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Error adding note');
    }
  };

  const exportData = async (format = 'csv') => {
    try {
      console.log(`Exporting ${totalEnquiries} enquiries in ${format} format...`);
      
      // You can implement real export functionality here
      const dataStr = format === 'json' 
        ? JSON.stringify(enquiries, null, 2)
        : enquiries.map(e => `${e.name},${e.email},${e.service},${e.status}`).join('\n');
        
      const dataBlob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `enquiries.${format}`;
      link.click();
      
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data');
    }
  };

  // If not authenticated, redirect to login
  if (!authToken) {
    if (onLogout) {
      onLogout();
    }
    return null;
  }

  const EnquiryCard = ({ enquiry }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{enquiry.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{enquiry.email}</p>
          <p className="text-sm text-gray-500 mt-1">{enquiry.service}</p>
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">{enquiry.message}</p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(enquiry.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            enquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
            enquiry.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            enquiry.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {enquiry.status}
          </span>
          {enquiry.priority && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              enquiry.priority === 'high' ? 'bg-red-100 text-red-800' :
              enquiry.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {enquiry.priority}
            </span>
          )}
          <div className="flex space-x-1 mt-2">
            <button
              onClick={() => { setSelectedEnquiry(enquiry); setIsModalOpen(true); }}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              title="View Details"
            >
              View
            </button>
            <button
              onClick={() => handleEditEnquiry(enquiry)}
              className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              title="Edit"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteEnquiry(enquiry.id)}
              className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              title="Delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EnquiryModal = () => {
    if (!selectedEnquiry) return null;

    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${
        isModalOpen ? 'block' : 'hidden'
      }`}>
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Enquiry Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{selectedEnquiry.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{selectedEnquiry.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{selectedEnquiry.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Service</label>
                <p className="mt-1 text-sm text-gray-900">{selectedEnquiry.service}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {selectedEnquiry.subject || 'No subject'}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {selectedEnquiry.message}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusUpdate(selectedEnquiry.id, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 text-sm"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedEnquiry.priority || 'Low'}</p>
              </div>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <button 
                onClick={() => handleEditEnquiry(selectedEnquiry)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Edit Enquiry
              </button>
              <button 
                onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Delete Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FSS</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Enquiry Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {user?.name || 'Admin'}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                title="Logout"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={enquiryFilters.search}
                  onChange={(e) => setEnquiryFilters({...enquiryFilters, search: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={enquiryFilters.status}
                  onChange={(e) => setEnquiryFilters({...enquiryFilters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                <select
                  value={enquiryFilters.service}
                  onChange={(e) => setEnquiryFilters({...enquiryFilters, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Services</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Video Editing">Video Editing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={enquiryFilters.priority}
                  onChange={(e) => setEnquiryFilters({...enquiryFilters, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enquiries List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Enquiries ({totalEnquiries})
                </h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => exportData('csv')}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Export CSV
                  </button>
                  <button 
                    onClick={() => exportData('json')}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Export JSON
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {enquiries.length > 0 ? (
                <div className="space-y-4">
                  {enquiries.map((enquiry) => (
                    <EnquiryCard key={enquiry.id} enquiry={enquiry} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-gray-500">No enquiries found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* View Enquiry Modal */}
      <EnquiryModal />
      
      {/* Edit Enquiry Modal */}
      <EditEnquiryModal
        enquiry={editingEnquiry}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateEnquiry}
      />
    </div>
  );
};

export default AdminDashboard;