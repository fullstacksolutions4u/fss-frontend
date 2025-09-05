import React, { useState, useEffect } from 'react';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    { 
      name: 'Home', 
      path: '/', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      description: 'Back to homepage'
    },
    { 
      name: 'Services', 
      path: '/#services', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      description: 'Our development services'
    },
    { 
      name: 'Portfolio', 
      path: '/#portfolio', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'View our projects'
    },
    { 
      name: 'Contact', 
      path: '/#contact', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      description: 'Get in touch with us'
    }
  ];

  const popularPages = [
    'Full Stack Development',
    'React Applications',
    'Node.js Backend',
    'Database Solutions',
    'Web Performance',
    'MERN Stack Projects'
  ];

  const handleNavigation = (path) => {
    if (path.startsWith('/#')) {
      // Handle anchor links
      window.location.href = path;
    } else {
      // Navigate to different pages
      window.location.href = path;
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to home with search query (you can implement search functionality)
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 relative overflow-hidden flex items-center">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(6, 95, 115, 0.3) 0%, 
              rgba(230, 57, 70, 0.2) 25%, 
              transparent 50%)`
          }}
        />
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-red-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-red-500/10 to-teal-600/10 rounded-lg rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-teal-600/10 to-slate-900/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-40 w-40 h-40 border-2 border-teal-500/20 rounded-full animate-pulse"></div>
        
        {/* Floating Dots */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-teal-500 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Animated 404 Display */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] lg:text-[15rem] font-bold leading-none select-none">
              <span className="bg-gradient-to-r from-teal-600 via-slate-900 to-red-500 bg-clip-text text-transparent animate-gradient-x inline-block">
                4
              </span>
              <span className="bg-gradient-to-r from-red-500 via-teal-600 to-slate-900 bg-clip-text text-transparent animate-gradient-x-reverse inline-block mx-4">
                0
              </span>
              <span className="bg-gradient-to-r from-teal-600 via-slate-900 to-red-500 bg-clip-text text-transparent animate-gradient-x inline-block">
                4
              </span>
            </h1>
            
            {/* Floating Elements around 404 */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-teal-500/20 to-red-500/20 rounded-full animate-bounce"></div>
            <div className="absolute -top-12 -right-12 w-12 h-12 bg-gradient-to-br from-red-500/20 to-teal-600/20 rounded-lg rotate-45 animate-spin-slow"></div>
            <div className="absolute -bottom-8 left-1/4 w-8 h-8 bg-gradient-to-br from-teal-600/20 to-slate-900/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto">
            The page you're looking for seems to have taken a different route. 
            Don't worry, we'll help you find your way back!
          </p>
        </div>

        {/* Search Bar */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-2 border border-white/30 shadow-xl">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for pages, services, or projects..."
                  className="flex-1 px-4 py-3 bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-red-500 hover:from-red-500 hover:to-teal-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className={`transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className="group bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-red-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                    {link.name}
                  </h3>
                  <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                    {link.description}
                  </p>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Pages & Support */}
        <div className={`transform transition-all duration-1000 delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Popular Pages */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Popular Pages
              </h3>
              <div className="space-y-2">
                {popularPages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation('/')}
                    className="block w-full text-left px-3 py-2 text-slate-600 hover:text-teal-600 hover:bg-white/20 rounded-lg transition-all duration-200"
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
                Need Help?
              </h3>
              <p className="text-slate-600 mb-4">
                Can't find what you're looking for? We're here to help!
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => handleNavigation('/#contact')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-teal-600 to-red-500 hover:from-red-500 hover:to-teal-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Contact Support
                </button>
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                  <span>📧 info@fullstacksolutions.com</span>
                  <span>📞 +1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Go Back Button */}
        <div className={`transform transition-all duration-1000 delay-1100 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mt-12">
            <button
              onClick={() => window.history.back()}
              className="group relative px-8 py-4 bg-white/20 backdrop-blur-lg border-2 border-slate-300 hover:border-teal-500 text-slate-700 hover:text-teal-600 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes gradient-x-reverse {
          0%, 100% { background-size: 200% 200%; background-position: right center; }
          50% { background-size: 200% 200%; background-position: left center; }
        }
        
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        .animate-gradient-x-reverse { animation: gradient-x-reverse 4s ease infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default NotFound;