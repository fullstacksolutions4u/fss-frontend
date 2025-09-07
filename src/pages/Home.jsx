import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Services />
      <Testimonials />
    </div>
  );
};

export default Home;