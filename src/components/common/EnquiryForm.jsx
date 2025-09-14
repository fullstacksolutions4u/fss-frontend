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
  
  const [submitStatus, setSubmitStatus] = useState(null);
  
  
  const { 
    loading: isSubmitting, 
    error: apiError, 
    validationErrors, 
    submitEnquiry, 
    clearErrors 
  } = useEnquiry();

  const services = [
    { value: '', label: 'Select service', icon: '🔍' },
    { value: 'Software Development', label: 'Software Development', icon: '💻' },
    { value: 'Digital Marketing', label: 'Digital Marketing', icon: '📈' },
    { value: 'Video Editing', label: 'Video Editing', icon: '🎬' },
    { value: 'Mentoring', label: 'Mentoring', icon: '🎓' },
    { value: 'Other', label: 'Other', icon: '✨' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (submitStatus || apiError) {
      setSubmitStatus(null);
      clearErrors();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{9,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous status
    setSubmitStatus(null);
    clearErrors();
    
    // Client-side validation
    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      // For client errors, we need to show them manually
      // since validationErrors from hook only handles server errors
      console.log('Client validation errors:', clientErrors);
      return;
    }

    try {
      // Submit using custom hook
      const result = await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim()
      });
      
      setSubmitStatus('success');
      console.log('Enquiry submitted successfully:', result);
      
      // Reset form and close modal after success
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2500);

    } catch (error) {
      // Error is handled by the hook
      console.error('Submission failed:', error);
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      service: '', 
      phone: '', 
      email: '', 
      message: '' 
    });
    setSubmitStatus(null);
    clearErrors();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  // Combine validation errors (client + server)
  const allErrors = { 
    ...validationErrors,
    ...(validateForm && Object.keys(validateForm()).length > 0 ? {} : {})
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => !isSubmitting && handleClose()}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl transform transition-all animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-t-3xl p-6 text-center">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
          <button
            onClick={() => !isSubmitting && handleClose()}
            disabled={isSubmitting}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
            aria-label="Close form"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-2xl mb-2">✨</div>
          <h2 className="text-xl font-bold text-white mb-1">Let's Start Your Project!</h2>
          <p className="text-white/80 text-sm">We'll get back to you within 24 hours</p>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-2">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">✅</span>
              <div>
                <p className="text-sm text-green-700 font-medium">
                  Thank you! Your enquiry has been submitted successfully.
                </p>
                <p className="text-xs text-green-600 mt-1">
                  We'll review your request and get back to you soon! 🚀
                </p>
              </div>
            </div>
          </div>
        )}

        {apiError && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-in slide-in-from-top-2">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-lg">❌</span>
              <div>
                <p className="text-sm text-red-700 font-medium">
                  Oops! Unable to submit your enquiry.
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {apiError} Please try again or call us directly at{' '}
                  <a href="tel:+917907278704" className="font-medium underline">
                    +91 7907278704
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name *"
              className={`w-full px-4 py-3 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all ${
                validationErrors.name ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-teal-400'
              }`}
              disabled={isSubmitting}
              maxLength={100}
            />
            {validationErrors.name && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <span>⚠️</span> {validationErrors.name}
              </p>
            )}
          </div>

          {/* Service Selection */}
          <div>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all bg-white ${
                validationErrors.service ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-teal-400'
              }`}
              disabled={isSubmitting}
            >
              {services.map((service) => (
                <option key={service.value} value={service.value} disabled={!service.value}>
                  {service.icon} {service.label}
                </option>
              ))}
            </select>
            {validationErrors.service && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <span>⚠️</span> {validationErrors.service}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="📞 Phone number *"
                className={`w-full px-4 py-3 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all ${
                  validationErrors.phone ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-teal-400'
                }`}
                disabled={isSubmitting}
                maxLength={20}
              />
              {validationErrors.phone && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span>⚠️</span> {validationErrors.phone}
                </p>
              )}
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="📧 Email address *"
                className={`w-full px-4 py-3 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all ${
                  validationErrors.email ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-teal-400'
                }`}
                disabled={isSubmitting}
                maxLength={100}
              />
              {validationErrors.email && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span>⚠️</span> {validationErrors.email}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="💬 Tell us about your project requirements... *"
              rows={4}
              className={`w-full px-4 py-3 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all resize-none ${
                validationErrors.message ? 'border-red-300 focus:border-red-400 bg-red-50/50' : 'border-gray-200 focus:border-teal-400'
              }`}
              disabled={isSubmitting}
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-1">
              {validationErrors.message ? (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span>⚠️</span> {validationErrors.message}
                </p>
              ) : (
                <span className="text-xs text-gray-400">Tell us what you need help with</span>
              )}
              <span className="text-xs text-gray-400">
                {formData.message.length}/1000
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => !isSubmitting && handleClose()}
              disabled={isSubmitting}
              className="flex-1 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="flex-1 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <span>✅</span>
                  <span>Submitted!</span>
                </>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <span>🚀</span>
                </>
              )}
            </button>
          </div>

          {/* Footer Info */}
          <div className="text-center text-xs text-gray-500 pt-3 border-t border-gray-100">
            <p className="mb-1">* Required fields</p>
            <p>
              Need immediate assistance? Call us at{' '}
              <a 
                href="tel:+917907278704" 
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                +91 7907278704
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;