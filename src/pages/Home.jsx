import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Stats from '../components/home/Stats';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Services />
      <Stats />
      <Testimonials />
    </div>
  );
};

export default Home;