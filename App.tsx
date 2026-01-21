
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LiveBackground from './components/LiveBackground';
import { MobileHeader, MobileNavbar } from './components/MobileNav';
import CapsuleNavbar from './components/CapsuleNavbar';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import PremiumPage from './pages/PremiumPage';
import AboutPage from './pages/AboutPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <LiveBackground mousePosition={mousePosition} />
      <MobileHeader />
      <CapsuleNavbar />
      <div className="relative z-10 isolate min-h-screen w-full overflow-x-hidden pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      <MobileNavbar />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
