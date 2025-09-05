import React, { useState, useEffect } from 'react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = [
    { id: 'all', name: 'All Projects', count: 6 },
    { id: 'fullstack', name: 'Full Stack', count: 4 },
    { id: 'frontend', name: 'Frontend', count: 3 },
    { id: 'backend', name: 'Backend', count: 2 }
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A complete online shopping solution with user authentication, payment processing, inventory management, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
      category: ['fullstack'],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
      liveUrl: "https://demo-ecommerce.example.com",
      githubUrl: "https://github.com/fullstacksolutions/ecommerce-platform",
      featured: true,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team collaboration features, and progress tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
      category: ['fullstack', 'frontend'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
      liveUrl: "https://demo-taskmanager.example.com",
      githubUrl: "https://github.com/fullstacksolutions/task-manager",
      featured: true,
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Real Estate Website",
      description: "Modern property listing platform with advanced search filters, virtual tours, and contact management system.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&crop=center",
      category: ['fullstack'],
      technologies: ['React', 'Express', 'MongoDB', 'Mapbox API'],
      liveUrl: "https://demo-realestate.example.com",
      githubUrl: "https://github.com/fullstacksolutions/real-estate-platform",
      featured: false,
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Restaurant Booking System",
      description: "Complete reservation management system with table booking, menu display, and customer relationship management.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&crop=center",
      category: ['fullstack', 'backend'],
      technologies: ['React', 'Node.js', 'MongoDB', 'Twillio API'],
      liveUrl: "https://demo-restaurant.example.com",
      githubUrl: "https://github.com/fullstacksolutions/restaurant-booking",
      featured: true,
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      id: 5,
      title: "Modern Portfolio Website",
      description: "Responsive portfolio showcase with smooth animations, contact forms, and content management capabilities.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&crop=center",
      category: ['frontend'],
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: "https://demo-portfolio.example.com",
      githubUrl: "https://github.com/fullstacksolutions/modern-portfolio",
      featured: false,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: 6,
      title: "Blog & CMS Platform",
      description: "Full-featured blogging platform with rich text editor, comment system, and comprehensive content management.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6076b?w=800&h=600&fit=crop&crop=center",
      category: ['fullstack', 'backend'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS S3'],
      liveUrl: "https://demo-blog.example.com",
      githubUrl: "https://github.com/fullstacksolutions/blog-platform",
      featured: false,
      gradient: "from-indigo-500 to-blue-600"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleProjects(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProjects]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.category.includes(activeFilter)
      ));
    }
    setVisibleProjects([]);
  }, [activeFilter]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="portfolio" className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-teal-50 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-16 w-72 h-72 bg-gradient-to-br from-teal-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-600 via-slate-900 to-red-500 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8">
            Discover our latest projects showcasing innovative solutions and cutting-edge technologies
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-red-500 mx-auto rounded-full"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-teal-600 to-red-500 text-white shadow-xl'
                  : 'bg-white/20 backdrop-blur-lg text-slate-700 hover:bg-white/30 border border-white/30'
              }`}
            >
              <span className="relative z-10 flex items-center">
                {filter.name}
                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                  activeFilter === filter.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {filter.count}
                </span>
              </span>
              {activeFilter !== filter.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-index={index}
              className={`project-card group relative bg-white/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/30 hover:border-white/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
                visibleProjects.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => openModal(project)}
            >
              
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Overlay Icons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {project.description.length > 100 
                    ? `${project.description.substring(0, 100)}...` 
                    : project.description
                  }
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-white/40 backdrop-blur-sm text-slate-700 rounded-full border border-white/30 group-hover:bg-white/60 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 text-sm bg-gradient-to-r from-teal-500 to-red-500 text-white rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveUrl, '_blank');
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-600 to-red-500 hover:from-red-500 hover:to-teal-600 text-white font-medium rounded-lg transition-all duration-300 text-sm"
                  >
                    Live Demo
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank');
                    }}
                    className="px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/30 hover:bg-white/50 text-slate-700 font-medium rounded-lg transition-all duration-300 text-sm"
                  >
                    Code
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center p-8 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 max-w-2xl mx-auto">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Have a Project in Mind?
              </h3>
              <p className="text-slate-600 mb-6">
                Let's bring your vision to life with our expertise in modern web development.
              </p>
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-red-500 hover:from-red-500 hover:to-teal-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Project
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="relative">
              
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Image */}
              <div className="h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-slate-200 mb-6 leading-relaxed text-lg">{selectedProject.description}</p>
                
                {/* All Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-red-500 hover:from-red-500 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 text-center"
                  >
                    View Live Demo
                  </a>
                  <a 
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-semibold rounded-xl transition-all duration-300 text-center"
                  >
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </section>
  );
};

export default Portfolio;