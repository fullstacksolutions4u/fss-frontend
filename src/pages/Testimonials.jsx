import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      company: "TechStart Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b302?w=80&h=80&fit=crop&crop=face",
      testimonial: "Working with Full Stack Solutions was a game-changer for our startup. The results exceeded all expectations.",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      company: "Creative Minds Agency",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      testimonial: "The portfolio website they created is absolutely stunning. Our client inquiries increased by 200%.",
    },
    {
      id: 3,
      name: "Emma Thompson",
      company: "Bella Vista Restaurant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      testimonial: "Our booking system has transformed how we manage reservations. Professional and delivered on time.",
    }
  ];

  // Auto-play carousel - continuous loop
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= testimonials.length ? 0 : nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Client Testimonials
          </h2>
          <p className="text-slate-600">
            What our clients say about us
          </p>
        </div>

        <div className="relative h-48 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border h-full flex items-center">
                <div className="flex items-start space-x-4 w-full">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <blockquote className="text-slate-700 mb-3 text-sm leading-relaxed">
                      "{testimonials[currentIndex].testimonial}"
                    </blockquote>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-teal-500'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;