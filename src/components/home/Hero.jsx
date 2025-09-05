import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import webDevelopmentAnimation from '../../assets/animations/web-development.json';
import appDevelopmentAnimation from '../../assets/animations/app-development.json';
import digitalMarketingAnimation from '../../assets/animations/digital-marketing.json';
import contentCreationAnimation from '../../assets/animations/content-creation.json';
import './ShinyText.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    'Web Development',
    'App Development', 
    'Digital Marketing',
    'Content Creation & Video Editing'
  ];

  // Map services to their corresponding Lottie animations
  const getAnimationForService = (service) => {
    switch (service) {
      case 'Web Development':
        return webDevelopmentAnimation;
      case 'App Development':
        return appDevelopmentAnimation;
      case 'Digital Marketing':
        return digitalMarketingAnimation;
      case 'Content Creation & Video Editing':
        return contentCreationAnimation;
      default:
        return webDevelopmentAnimation;
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentService = services[currentServiceIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentService.length) {
          setDisplayText(currentService.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentService.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentServiceIndex((prev) => (prev + 1) % services.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentServiceIndex, services]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Thank you! We will contact you soon.');
    setShowPopup(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  // Close popup when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0 pb-0.5" style={{ backgroundColor: '#f0f8ff' }}>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Dynamic Service Text */}
            <div className="text-left">
              <div className="text-lg md:text-xl lg:text-2xl font-heading font-bold">
                <div className="text-slate-700 mb-2">We shape the future of your business through</div>
                <div className="min-h-[1.2em]">
                  <span className="bg-gradient-to-r from-teal-600 via-red-500 to-teal-700 bg-clip-text text-transparent">
                    {displayText}
                  </span>
                  <span className="animate-pulse text-teal-600">|</span>
                </div>
              </div>
              
              {/* Get Started Button with ShinyText */}
              <div className="mt-8">
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-slate-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <span className="shiny-text">Get Started</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Lottie Animation */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative">
              
              {/* Lottie Animation */}
              <div className="relative">
                <Lottie 
                  animationData={getAnimationForService(services[currentServiceIndex])}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '400px' }}
                  className="transform hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-end items-center mb-6">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Content Creation">Content Creation</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              {/* Submit Button with ShinyText */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-red-500 text-white py-3 px-4 rounded-md font-semibold hover:from-teal-700 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <span className="shiny-text">Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;