import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import About from './components/home/About.jsx';
import ServicesPage from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="App min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
            
            {/* Navigation */}
            <Navbar />
            
            {/* Main Content */}
            <main className="relative">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/dashboard" element={<Admin />} />
                <Route path="/admin/users" element={<Admin />} />
                <Route path="/admin/contacts" element={<Admin />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />
          
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;