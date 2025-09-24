import React, { useState, useEffect, useRef } from 'react';
import EnquiryForm from './EnquiryForm';
import logo from '../../assets/logo.png'; // ✅ Import your logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mentoringDropdown, setMentoringDropdown] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const servicesRef = useRef(null);
  const mentoringRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesDropdown(false);
      }
      if (mentoringRef.current && !mentoringRef.current.contains(event.target)) {
        setMentoringDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [{ name: 'Home', href: '#home' }];

  const services = [
    {
      name: 'Software Development',
      description:
        'Custom software solutions, web applications, and mobile apps built with modern technologies',
      icon: '💻',
      url: '/services/software-development',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Digital Marketing',
      description:
        'SEO, social media marketing, and digital advertising strategies to grow your business',
      icon: '📈',
      url: '/services/digital-marketing',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Video Editing',
      description:
        'Professional video editing and post-production services for all platforms',
      icon: '🎬',
      url: '/services/video-editing',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const mentoringLinks = [
    { name: 'Become Mentor', href: '#become-mentor' },
    { name: 'Join Mentorship Program', href: '#join-mentorship' },
    {
      name: 'Join our Community',
      href: 'https://chat.whatsapp.com/BighIMZ913m3mnaHIIkVVv?mode=ems_wa_t',
      external: true,
    },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setServicesDropdown(false);
    setMentoringDropdown(false);
  };

  const handleServiceClick = (url) => {
    window.location.href = url;
    setServicesDropdown(false);
    setIsOpen(false);
  };

  const handleEnquiryClick = () => {
    setShowEnquiryForm(true);
    setIsOpen(false);
  };

  const handleCloseEnquiry = () => {
    setShowEnquiryForm(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white shadow-lg border-b border-gray-100'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo Section */}
          <div className="flex-shrink-0">
            <a href="#home" className="group flex items-center space-x-3">
              <div className="relative">
                <img
                  src={logo}
                  alt="Full Stack Solutions Logo"
                  className="h-12 w-12 rounded-full object-cover transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-teal-600 rounded-full opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
              </div>
              <span className="text-lg sm:text-xl font-heading font-bold text-black hidden sm:block">
                Full Stack Solutions
              </span>
            </a>
          </div>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="group relative px-4 py-2 rounded-lg text-black hover:text-teal-600 font-medium transition-all duration-300 hover:bg-gray-50"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => setServicesDropdown(!servicesDropdown)}
                  className="group relative px-4 py-2 rounded-lg text-black hover:text-teal-600 font-medium transition-all duration-300 hover:bg-gray-50 flex items-center space-x-1"
                >
                  <span>Services</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesDropdown ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
                </button>

                <div
                  className={`absolute top-full mt-2 w-80 lg:w-96 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                    servicesDropdown
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                  style={{
                    left: '50%',
                    transform: servicesDropdown
                      ? 'translateX(-50%) translateY(0)'
                      : 'translateX(-50%) translateY(-8px)',
                  }}
                >
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-3">
                      {services.map((service) => (
                        <button
                          key={service.name}
                          onClick={() => handleServiceClick(service.url)}
                          className="group p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 text-left bg-white hover:bg-gray-50"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-white text-lg flex-shrink-0`}
                            >
                              {service.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-black group-hover:text-teal-600 transition-colors duration-200 text-sm">
                                {service.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center text-xs text-teal-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Learn more
                            <svg
                              className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mentoring Dropdown */}
              <div className="relative" ref={mentoringRef}>
                <button
                  onClick={() => setMentoringDropdown(!mentoringDropdown)}
                  className="group relative px-4 py-2 rounded-lg text-black hover:text-teal-600 font-medium transition-all duration-300 hover:bg-gray-50 flex items-center space-x-1"
                >
                  <span>Mentoring</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mentoringDropdown ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
                </button>

                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                    mentoringDropdown
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="p-2">
                    {mentoringLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={
                          link.external
                            ? undefined
                            : (e) => handleSmoothScroll(e, link.href)
                        }
                        target={link.external ? '_blank' : undefined}
                        rel={
                          link.external ? 'noopener noreferrer' : undefined
                        }
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-black group-hover:text-teal-600 transition-colors duration-200 flex items-center space-x-2">
                            <span>{link.name}</span>
                            {link.external && (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transform group-hover:translate-x-1 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Contact + Enquiry (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+917907278704"
              className="flex items-center space-x-2 px-4 py-2 text-black hover:text-teal-600 font-medium transition-all duration-300 rounded-lg border-2 border-teal-400 hover:border-teal-600 transform hover:scale-105"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+91 7907278704</span>
            </a>
            <button
              onClick={handleEnquiryClick}
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Enquiry Form</span>
            </button>
          </div>

          {/* ✅ Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-black hover:text-teal-600 hover:bg-gray-50 transition-all duration-300"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu (also updated with text-black) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block px-4 py-3 rounded-lg text-black hover:text-teal-600 hover:bg-gray-50 font-medium transition-all duration-300 transform hover:translate-x-2"
              >
                {link.name}
              </a>
            ))}

            <div className="border-t border-gray-100 pt-4 mt-4">
              <div className="text-sm font-semibold text-black uppercase tracking-wider px-4 mb-2">
                Services
              </div>
              {services.map((service) => (
                <button
                  key={service.name}
                  onClick={() => handleServiceClick(service.url)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:text-teal-600 hover:bg-gray-50 transition-all duration-300 text-left"
                >
                  <span className="text-lg">{service.icon}</span>
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-xs text-slate-500">
                      {service.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              <div className="text-sm font-semibold text-black uppercase tracking-wider px-4 mb-2">
                Mentoring
              </div>
              {mentoringLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={
                    link.external
                      ? undefined
                      : (e) => handleSmoothScroll(e, link.href)
                  }
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:text-teal-600 hover:bg-gray-50 transition-all duration-300"
                >
                  <span className="font-medium flex items-center space-x-2">
                    <span>{link.name}</span>
                    {link.external && (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </span>
                </a>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              <a
                href="tel:+917907278704"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:text-teal-600 hover:bg-gray-50 transition-all duration-300 mb-3"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium">+91 7907278704</span>
              </a>
              <button
                onClick={handleEnquiryClick}
                className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Enquiry Form</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <EnquiryForm isOpen={showEnquiryForm} onClose={handleCloseEnquiry} />
    </nav>
  );
};

export default Navbar;
