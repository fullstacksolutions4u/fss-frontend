// File: src/pages/Home.jsx
import React from 'react';

// Import all section components
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';

import Portfolio from './Portfolio';

import Stats from '../components/home/Stats';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <Services />
      
      {/* Stats Section */}
      <Stats />
      
     
      
      {/* Portfolio Section */}
      <Portfolio />
      
      {/* Testimonials Section */}
      <Testimonials />
      
   
    </div>
  );
};

export default Home;