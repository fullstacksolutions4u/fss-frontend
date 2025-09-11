import React, { useState } from 'react';

const EnquiryForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    service: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // API Configuration - Use import.meta.env for Vite or fallback
  const API_BASE_URL = import.meta.env?.VITE_API_URL || 
                       (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) || 
                       'http://localhost:5000/api';

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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject required';
    if (!formData.service) newErrors.service = 'Select a service';
    if (!formData.phone.trim()) newErrors.phone = 'Phone required';
    else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid phone';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message required';
    return newErrors;
  };

  const submitEnquiry = async (enquiryData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enquiryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit enquiry');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Submit to backend API
      const result = await submitEnquiry(formData);
      
      setSubmitStatus('success');
      console.log('Enquiry submitted successfully:', result);
      
      // Reset form and close modal after success
      setTimeout(() => {
        setFormData({ 
          name: '', 
          subject: '', 
          service: '', 
          phone: '', 
          email: '', 
          message: '' 
        });
        setErrors({});
        setSubmitStatus(null);
        onClose();
      }, 2000);

    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ 
        name: '', 
        subject: '', 
        service: '', 
        phone: '', 
        email: '', 
        message: '' 
      });
      setErrors({});
      setSubmitStatus(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => !isSubmitting && handleClose()}
      />
      
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl transform transition-all animate-in slide-in-from-bottom-4 duration-300">
        {/* Cute Header */}
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
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-2xl mb-2">✨</div>
          <h2 className="text-xl font-bold text-white mb-1">Let's Chat!</h2>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <p className="text-sm text-green-700 font-medium">
                Thanks! We'll get back to you soon 🚀
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">❌</span>
              <div>
                <p className="text-sm text-red-700 font-medium">
                  Oops! Something went wrong.
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Please try again or call us at +91 7907278704
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Compact Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name (full width) */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              className={`w-full px-3 py-2.5 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all ${
                errors.name ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-teal-400'
              }`}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Service Dropdown */}
          <div>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className={`w-full px-3 py-2.5 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all bg-white ${
                errors.service ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-teal-400'
              }`}
              disabled={isSubmitting}
            >
              {services.map((service) => (
                <option key={service.value} value={service.value} disabled={!service.value}>
                  {service.icon} {service.label}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="📞 Phone"
                className={`w-full px-3 py-2.5 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all ${
                  errors.phone ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-teal-400'
                }`}
                disabled={isSubmitting}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="📧 Email"
                className={`w-full px-3 py-2.5 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all ${
                  errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-teal-400'
                }`}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="💬 Tell us about your project..."
              rows={3}
              className={`w-full px-3 py-2.5 text-sm border-2 rounded-xl focus:ring-0 focus:outline-none transition-all resize-none ${
                errors.message ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-teal-400'
              }`}
              disabled={isSubmitting}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => !isSubmitting && handleClose()}
              disabled={isSubmitting}
              className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <span>✅</span>
                  <span>Sent!</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <span>🚀</span>
                </>
              )}
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
            Need help? Call us at{' '}
            <a 
              href="tel:+917907278704" 
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              +91 7907278704
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;