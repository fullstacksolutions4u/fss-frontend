import React, { useState } from 'react';
import { useEnquiry } from '../../hooks/useEnquiry';

const EnquiryForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    loading: isSubmitting, 
    error: apiError, 
    validationErrors, 
    submitEnquiry, 
    clearErrors 
  } = useEnquiry();

  const services = [
    { value: '', label: 'Select service' },
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Digital Marketing', label: 'Digital Marketing' },
    { value: 'Video Editing', label: 'Video Editing' },
    { value: 'Mentoring', label: 'Mentoring' },
    { value: 'Other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (apiError) {
      clearErrors();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    clearErrors();

    try {
      const result = await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim()
      });
      
      console.log('Enquiry submitted successfully:', result);
      
      setFormData({ 
        name: '', 
        service: '', 
        phone: '', 
        email: '', 
        message: '' 
      });
      
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ 
        name: '', 
        service: '', 
        phone: '', 
        email: '', 
        message: '' 
      });
      setIsSuccess(false);
      clearErrors();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !isSubmitting && handleClose()}
      />
      
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="p-8">
          {isSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-4">Your enquiry has been submitted successfully.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 font-medium">Our executive will contact you shortly</p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Get In Touch
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-3 rounded-full"></div>
              </div>

              {apiError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:outline-none transition-all placeholder-gray-400 ${
                      validationErrors.name ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-red-500 mt-2">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:outline-none transition-all bg-white ${
                      validationErrors.service ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  >
                    {services.map((service) => (
                      <option key={service.value} value={service.value} disabled={!service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                  {validationErrors.service && (
                    <p className="text-xs text-red-500 mt-2">{validationErrors.service}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:outline-none transition-all placeholder-gray-400 ${
                      validationErrors.phone ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                  {validationErrors.phone && (
                    <p className="text-xs text-red-500 mt-2">{validationErrors.phone}</p>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-0 focus:outline-none transition-all placeholder-gray-400 ${
                      validationErrors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  {validationErrors.email && (
                    <p className="text-xs text-red-500 mt-2">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 focus:outline-none transition-all resize-none ${
                      validationErrors.message ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                  {validationErrors.message && (
                    <p className="text-xs text-red-500 mt-2">{validationErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;