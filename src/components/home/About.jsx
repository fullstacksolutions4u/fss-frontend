import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, satisfaction: 0 });
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleSections(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Stats counter animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('.about-section');
    sections.forEach(section => observer.observe(section));

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { projects: 150, clients: 85, years: 5, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    Object.keys(targets).forEach(key => {
      const target = targets[key];
      let current = 0;
      const stepValue = target / steps;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, increment);
    });
  };

  const techStack = [
    { name: 'React', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-600 to-teal-600' },
    { name: 'Express', icon: '🚀', color: 'from-gray-600 to-gray-800' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-indigo-600' },
    { name: 'Tailwind', icon: '🎨', color: 'from-teal-500 to-cyan-500' }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Innovation First",
      description: "We leverage cutting-edge technologies and modern development practices to build future-ready applications."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Performance Driven",
      description: "Every line of code is optimized for speed, scalability, and exceptional user experience across all devices."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Continuous Learning",
      description: "We stay ahead of industry trends, constantly updating our skills to deliver the most advanced solutions."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Client Partnership",
      description: "We work as an extension of your team, ensuring transparent communication and collaborative development."
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-white via-slate-50 to-teal-50 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-br from-teal-500/5 to-red-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-br from-red-500/5 to-slate-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-600 via-slate-900 to-red-500 bg-clip-text text-transparent">
              About Full Stack Solutions
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Crafting digital excellence through innovative full-stack development
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-red-500 mx-auto rounded-full mt-8"></div>
        </div>

        {/* Main Story Section */}
        <div 
          data-index="0" 
          className={`about-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 transform transition-all duration-1000 ${
            visibleSections.includes(0) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Building Tomorrow's Web, Today
            </h3>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                At <span className="text-teal-600 font-semibold">Full Stack Solutions</span>, we're passionate about transforming ideas into powerful digital experiences. With over 5 years of expertise in the MERN stack ecosystem, we've helped businesses of all sizes achieve their digital goals through innovative web applications.
              </p>
              <p>
                Our journey began with a simple mission: to bridge the gap between complex technology and seamless user experiences. Today, we're proud to be a trusted partner for companies seeking scalable, high-performance web solutions that drive real business results.
              </p>
              <p>
                From startup MVPs to enterprise-grade applications, we combine technical excellence with creative problem-solving to deliver solutions that not only meet your current needs but scale with your future growth.
              </p>
            </div>
          </div>
          
          {/* Animated Tech Stack Visualization */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="group relative bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {tech.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800">{tech.name}</h4>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              ))}
            </div>
            
            {/* Central connecting element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-teal-500 to-red-500 rounded-full animate-pulse z-10"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          ref={statsRef}
          data-index="1"
          className={`about-section mb-20 transform transition-all duration-1000 delay-300 ${
            visibleSections.includes(1) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">
                  {counters.projects}+
                </div>
                <div className="text-slate-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                  {counters.clients}+
                </div>
                <div className="text-slate-600 font-medium">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-slate-700 mb-2">
                  {counters.years}+
                </div>
                <div className="text-slate-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-700 mb-2">
                  {counters.satisfaction}%
                </div>
                <div className="text-slate-600 font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div 
          data-index="2"
          className={`about-section mb-20 transform transition-all duration-1000 delay-500 ${
            visibleSections.includes(2) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Our Core Values
            </h3>
            <p className="text-xl text-slate-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-red-500 text-white rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {value.description}
                </p>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          data-index="3"
          className={`about-section text-center transform transition-all duration-1000 delay-700 ${
            visibleSections.includes(3) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/30 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Ready to Transform Your Vision?
            </h3>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Let's collaborate to build something extraordinary. From concept to deployment, we're here to make your digital dreams a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.querySelector('#portfolio');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-red-500 hover:from-red-500 hover:to-teal-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
              >
                <span className="relative z-10 flex items-center justify-center">
                  View Our Work
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
              </button>
              
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-white/20 backdrop-blur-lg border-2 border-slate-300 hover:border-teal-500 text-slate-700 hover:text-teal-600 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Conversation
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;