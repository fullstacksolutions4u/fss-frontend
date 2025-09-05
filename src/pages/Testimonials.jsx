import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "CEO & Founder",
      company: "TechStart Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b302?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Working with Full Stack Solutions was a game-changer for our startup. They built our e-commerce platform from scratch using the MERN stack, and the results exceeded all our expectations. The team's attention to detail and technical expertise is outstanding.",
      project: "E-Commerce Platform",
      companyLogo: "🚀"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      position: "Marketing Director",
      company: "Creative Minds Agency",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "The portfolio website they created for our agency is absolutely stunning. Not only does it look incredible, but the performance is lightning-fast. Our client inquiries increased by 200% after the launch. Highly recommend their services!",
      project: "Portfolio Website",
      companyLogo: "🎨"
    },
    {
      id: 3,
      name: "Emma Thompson",
      position: "Restaurant Owner",
      company: "Bella Vista Restaurant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Our restaurant booking system has transformed how we manage reservations. The intuitive interface makes it easy for both customers and staff. The team was professional, responsive, and delivered exactly what we needed on time and within budget.",
      project: "Booking System",
      companyLogo: "🍽️"
    },
    {
      id: 4,
      name: "David Park",
      position: "Small Business Owner",
      company: "Park Consulting Group",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "From concept to deployment, Full Stack Solutions handled everything perfectly. They built a custom web application that streamlined our entire business process. The support and maintenance service is exceptional - they're always there when we need them.",
      project: "Business Web App",
      companyLogo: "💼"
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Nonprofit Director",
      company: "Hope Foundation",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "The website redesign completely transformed our online presence. Donations increased by 150% and volunteer sign-ups doubled. The team understood our mission and created something that truly represents our values. Outstanding work!",
      project: "Website Redesign",
      companyLogo: "❤️"
    },
    {
      id: 6,
      name: "James Wilson",
      position: "Tech Entrepreneur",
      company: "Innovation Labs",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Their full-stack development expertise is unmatched. They built our complex data visualization platform with React and Node.js, handling everything from architecture to deployment. The code quality and documentation are exemplary.",
      project: "Data Platform",
      companyLogo: "📊"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('testimonials');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToTestimonial = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        } animate-star-fill`}
        style={{ animationDelay: `${index * 100}ms` }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="relative py-20 bg-gradient-to-br from-white via-slate-50 to-teal-50 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-16 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-80 h-80 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-600 via-slate-900 to-red-500 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Here's what our amazing clients have to say about working with us.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-red-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Testimonial Display */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative max-w-4xl mx-auto">
            
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 lg:-translate-x-16 w-12 h-12 bg-white/20 backdrop-blur-lg border border-white/30 hover:border-white/50 rounded-full flex items-center justify-center text-slate-700 hover:text-teal-600 transition-all duration-300 transform hover:scale-110 z-10"
              title="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 lg:translate-x-16 w-12 h-12 bg-white/20 backdrop-blur-lg border border-white/30 hover:border-white/50 rounded-full flex items-center justify-center text-slate-700 hover:text-teal-600 transition-all duration-300 transform hover:scale-110 z-10"
              title="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonial Card */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/30 shadow-2xl">
              <div className="text-center mb-8">
                
                {/* Quote Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-red-500 rounded-2xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                {/* Star Rating */}
                <div className="flex items-center justify-center mb-6">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].testimonial}"
                </blockquote>

                {/* Project Tag */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-red-500 text-white rounded-full text-sm font-medium mb-8">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {testimonials[currentIndex].project}
                </div>

                {/* Client Info */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg border-2 border-gray-200">
                      {testimonials[currentIndex].companyLogo}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-slate-800">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-teal-600 font-medium">
                      {testimonials[currentIndex].position}
                    </p>
                    <p className="text-slate-600">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className={`flex items-center justify-center mt-8 space-x-3 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-teal-500 to-red-500 scale-125'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Testimonial Grid Preview */}
        <div className={`mt-16 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 text-left ${
                  index === currentIndex ? 'ring-2 ring-teal-500 bg-white/20' : ''
                }`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-semibold text-slate-800 text-sm">
                      {testimonial.name}
                    </h5>
                    <p className="text-slate-600 text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {testimonial.testimonial.length > 100
                    ? `${testimonial.testimonial.substring(0, 100)}...`
                    : testimonial.testimonial
                  }
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center justify-center p-8 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 max-w-2xl mx-auto">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-slate-600 mb-6">
                Let's create something amazing together. Your success story could be next!
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

      <style jsx>{`
        @keyframes star-fill {
          from { transform: scale(0) rotate(180deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-star-fill { animation: star-fill 0.5s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default Testimonials;