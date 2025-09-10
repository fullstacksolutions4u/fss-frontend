import React, { useState } from 'react';

const SoftwareDevelopment = () => {
  const [activeTab, setActiveTab] = useState('web');

  const technologies = {
    web: {
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies',
      tech: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'TypeScript', 'JavaScript'],
      features: [
        'Responsive Design',
        'Progressive Web Apps',
        'Single Page Applications',
        'Server-Side Rendering',
        'API Integration',
        'Real-time Features'
      ]
    },
    mobile: {
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications for iOS and Android',
      tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin', 'Firebase', 'MongoDB'],
      features: [
        'Cross-Platform Development',
        'Native Performance',
        'Push Notifications',
        'Offline Functionality',
        'App Store Optimization',
        'Social Media Integration'
      ]
    },
    backend: {
      title: 'Backend Development',
      description: 'Scalable server solutions and robust API development',
      tech: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker'],
      features: [
        'RESTful APIs',
        'GraphQL Implementation',
        'Database Design',
        'Cloud Deployment',
        'Microservices Architecture',
        'Security Implementation'
      ]
    }
  };

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'Admin Dashboard']
    },
    {
      title: 'Healthcare Management System',
      description: 'Comprehensive healthcare platform for patient management, appointment scheduling, and medical records.',
      technologies: ['Vue.js', 'Express.js', 'PostgreSQL', 'Socket.io'],
      image: '🏥',
      features: ['Patient Portal', 'Appointment Booking', 'Medical Records', 'Real-time Notifications']
    },
    {
      title: 'Learning Management System',
      description: 'Interactive learning platform with video streaming, progress tracking, and certification system.',
      technologies: ['Next.js', 'Python', 'MySQL', 'AWS'],
      image: '📚',
      features: ['Video Streaming', 'Progress Tracking', 'Quizzes & Tests', 'Certification System']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements, define project scope, and create a detailed roadmap.',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Creating wireframes, UI/UX designs, and technical architecture documentation.',
      icon: '🎨'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Agile development process with regular updates and milestone deliveries.',
      icon: '💻'
    },
    {
      step: '04',
      title: 'Testing & Deployment',
      description: 'Comprehensive testing, optimization, and secure deployment to production.',
      icon: '🚀'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">💻</span>
              Software Development Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              Custom Software
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into powerful digital solutions with our expert software development team. 
              We build scalable, secure, and user-friendly applications that drive business growth.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: '200+', label: 'Projects Completed' },
              { number: '50+', label: 'Happy Clients' },
              { number: '99%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Our Expertise</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We specialize in various aspects of software development to meet all your digital needs
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 bg-white rounded-2xl p-2 shadow-lg max-w-2xl mx-auto">
            {Object.entries(technologies).map(([key, tech]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tech.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                  {technologies[activeTab].title}
                </h3>
                <p className="text-lg text-slate-600 mb-8">
                  {technologies[activeTab].description}
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Key Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {technologies[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Get Started Today
                </button>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-6">Technologies We Use:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {technologies[activeTab].tech.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="text-blue-600 font-medium">{tech}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore some of our recent software development projects and success stories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-6">{project.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow duration-300">
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Our Development Process</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery from concept to deployment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Build Your Next Software Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create a custom solution that exceeds your expectations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareDevelopment;