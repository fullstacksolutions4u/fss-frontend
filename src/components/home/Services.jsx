import React, { useState, useEffect } from 'react';
import './ShinyText.css'; // Import ShinyText CSS for enhanced effects

const Services = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies for optimal performance and user experience.",
      icon: "🌐",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      gradient: "from-teal-500 to-blue-600",
      hoverGradient: "group-hover:from-teal-600 group-hover:to-blue-700",
      borderGradient: "hover:border-teal-400"
    },
    {
      id: 2,
      title: "App Development",
      description: "Cross-platform mobile applications that deliver seamless performance across iOS and Android platforms.",
      icon: "📱",
      technologies: ["React Native", "Flutter", "iOS", "Android"],
      gradient: "from-purple-500 to-pink-600",
      hoverGradient: "group-hover:from-purple-600 group-hover:to-pink-700",
      borderGradient: "hover:border-purple-400"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions to boost your online presence and drive meaningful engagement.",
      icon: "📈",
      technologies: ["SEO", "Social Media", "PPC", "Analytics"],
      gradient: "from-red-500 to-orange-600",
      hoverGradient: "group-hover:from-red-600 group-hover:to-orange-700",
      borderGradient: "hover:border-red-400"
    },
    {
      id: 4,
      title: "Content Creation",
      description: "Professional video editing and content creation services that captivate audiences and tell your story.",
      icon: "🎬",
      technologies: ["Video Editing", "Motion Graphics", "Animation", "Branding"],
      gradient: "from-green-500 to-emerald-600",
      hoverGradient: "group-hover:from-green-600 group-hover:to-emerald-700",
      borderGradient: "hover:border-green-400"
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setVisibleCards(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-20 overflow-hidden" style={{ backgroundColor: '#f0f8ff' }}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-teal-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-red-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-sm font-semibold text-slate-600 border border-white/40">
              What We Offer
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="shiny-text bg-gradient-to-r from-slate-700 via-teal-600 to-red-500 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Comprehensive full-stack development solutions designed to transform your digital vision into reality with cutting-edge technology and creative excellence.
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-1 bg-gradient-to-r from-transparent to-teal-500 rounded-full"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-red-500 rounded-full"></div>
            <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-index={index}
              className={`service-card group relative bg-white/40 backdrop-blur-lg rounded-3xl p-8 border border-white/50 ${service.borderGradient} transition-all duration-700 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/20 ${
                visibleCards.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 100%)'
              }}
            >
              
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
              
              {/* Service Icon with enhanced styling */}
              <div className="relative mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-700 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed text-base md:text-lg group-hover:text-slate-700 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Technologies */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white/50 backdrop-blur-sm text-slate-700 rounded-full text-sm font-medium border border-white/30 hover:bg-white/70 hover:scale-105 transition-all duration-200"
                        style={{ animationDelay: `${techIndex * 100}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learn More Button */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className={`w-full bg-gradient-to-r ${service.gradient} ${service.hoverGradient} text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                    <span className="shiny-text">Learn More</span>
                  </button>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-white/40 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="shiny-text bg-gradient-to-r from-slate-700 to-teal-600 bg-clip-text text-transparent">
                Ready to Start Your Project?
              </span>
            </h3>
            <p className="text-slate-600 mb-6 text-lg">
              Let's discuss how we can bring your vision to life with our expertise and innovative solutions.
            </p>
            <button className="bg-gradient-to-r from-teal-600 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-teal-700 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="shiny-text">Get Free Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;