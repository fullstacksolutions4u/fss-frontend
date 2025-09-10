import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Lottie from 'lottie-react';
import spinnerAnimation from './assets/animations/spinner.json';

// Lazy load page components for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./components/home/About.jsx'));
const ServicesPage = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SoftwareDevelopment = lazy(() => import('./pages/SoftwareDevelopment'));
const DigitalMarketing = lazy(() => import('./pages/DigitalMarketing'));
const VideoEditing = lazy(() => import('./pages/VideoEditing'));

// Loading fallback components with Lottie animation
const PageLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50">
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-4">
        <Lottie 
          animationData={spinnerAnimation} 
          loop={true} 
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p className="text-slate-600 font-medium">Loading...</p>
    </div>
  </div>
);

const SectionLoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-2">
        <Lottie 
          animationData={spinnerAnimation} 
          loop={true} 
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p className="text-slate-500 text-sm">Loading content...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="App min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
            
            {/* Navigation - Load immediately */}
            <Navbar />
            
            {/* Main Content with Suspense boundaries */}
            <main className="relative">
              <Suspense fallback={<PageLoadingSpinner />}>
                <Routes>
                  {/* Public Routes */}
                  <Route 
                    path="/" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <Home />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/home" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <Home />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/about" 
                    element={
                      <Suspense fallback={<SectionLoadingFallback />}>
                        <About />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/services" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <ServicesPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/portfolio" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <Portfolio />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/contact" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <Contact />
                      </Suspense>
                    } 
                  />

                  {/* Individual Service Routes */}
                  <Route 
                    path="/services/software-development" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <SoftwareDevelopment />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/services/digital-marketing" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <DigitalMarketing />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/services/video-editing" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <VideoEditing />
                      </Suspense>
                    } 
                  />
                  
                  {/* Admin Routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <Admin />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <Admin />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <Admin />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/admin/contacts" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <Admin />
                      </Suspense>
                    } 
                  />
                  
                  {/* 404 Route */}
                  <Route 
                    path="*" 
                    element={
                      <Suspense fallback={<PageLoadingSpinner />}>
                        <NotFound />
                      </Suspense>
                    } 
                  />
                </Routes>
              </Suspense>
            </main>
            
            {/* Footer - Load immediately for SEO */}
            <Footer />
          
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;