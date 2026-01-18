import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import WaterBackground from './components/WaterBackground';
import FluidCursor from './components/SplashCursor';
import LightCursor from './components/LightCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';

import useCanonicalTag from './hooks/useCanonicalTag';
import AudioPlayer from './components/AudioPlayer';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));


export type Page = 'Home' | 'About' | 'Services' | 'Portfolio' | 'Blog' | 'Contact';

const IconFacebook: React.FC = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const IconInstagram: React.FC = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.398 1.363.444 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.046 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.398-2.427.444-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.046-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.398-1.363-.444-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.046-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363.398 2.427-.444C9.531 2.013 9.885 2 12.315 2zM8 12a4 4 0 118 0 4 4 0 01-8 0zm4-2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" clipRule="evenodd" />
  </svg>
);

const IconYoutube: React.FC = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" clipRule="evenodd" />
  </svg>
);

const MainContent: React.FC = () => {
  const location = useLocation();
  useCanonicalTag();
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPreloaderExiting, setIsPreloaderExiting] = useState(false);
  const [activePage, setActivePage] = useState<Page>('Home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('Home');

  useEffect(() => {
    const pageTitleMap: { [key: string]: string } = {
      '/': 'Home - Senmizu Creatives',
      '/about': 'About Us - Senmizu Creatives',
      '/services': 'Our Services - Senmizu Creatives',
      '/portfolio': 'Our Portfolio - Senmizu Creatives',
      '/blog': 'Blog - Senmizu Creatives',
      '/contact': 'Contact Us - Senmizu Creatives',
    };

    const pageDescriptionMap: { [key: string]: string } = {
      '/': 'Senmizu Creatives is a digital experience agency specializing in web development, visual storytelling, and custom software solutions. We build fluid, beautiful, and impactful digital experiences.',
      '/about': 'Learn more about Senmizu Creatives, our mission, values, and the team behind our innovative digital solutions.',
      '/services': 'Explore the range of digital services offered by Senmizu Creatives, including web development, motion graphics, and custom software.',
      '/portfolio': 'View our portfolio of successful projects in web development, visual storytelling, and enterprise software solutions.',
      '/blog': 'Stay updated with the latest insights, stories, and news from Senmizu Creatives on technology, design, and business.',
      '/contact': 'Get in touch with Senmizu Creatives for inquiries, project collaborations, or to learn more about our services.',
    };

    const currentPath = location.pathname;
    document.title = pageTitleMap[currentPath] || 'Senmizu Creatives - Digital Experience Agency';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescriptionMap[currentPath] || 'Senmizu Creatives is a digital experience agency specializing in web development, visual storytelling, and custom software solutions. We build fluid, beautiful, and impactful digital experiences.');
    }
  }, [location]);

  useEffect(() => {
    // Sync active page with current path on mount/change
    const path = location.pathname.slice(1);
    const page = path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Home';

    // Simple mapping check or default to Home
    if (['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].includes(page)) {
      setActivePage(page as Page);
      setCurrentPage(page);
    } else if (location.pathname === '/' || location.pathname === '') {
      setActivePage('Home');
      setCurrentPage('Home');
    }
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderExiting(true);
      setTimeout(() => {
        setShowPreloader(false);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const [useSplashCursor, setUseSplashCursor] = useState<boolean>(() => {
    try {
      const val = localStorage.getItem('useSplashCursor');
      return val ? JSON.parse(val) : true;
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('useSplashCursor', JSON.stringify(useSplashCursor));
    } catch (e) {
      // ignore
    }
  }, [useSplashCursor]);

  const handleNavClick = (page: Page) => {
    if (page === activePage || isTransitioning) return;

    setCurrentPage(page);

    setIsTransitioning(true);
    setTimeout(() => {
      setActivePage(page);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <>
      {showPreloader && <Preloader isExiting={isPreloaderExiting} />}

      <div className={`w-full min-h-screen text-slate-100 cursor-none flex flex-col ${showPreloader ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        {useSplashCursor ? <FluidCursor /> : <LightCursor />}
        <WaterBackground />
        <Navbar activePage={activePage} onNavClick={handleNavClick} useSplashCursor={useSplashCursor} onToggleCursor={() => setUseSplashCursor(v => !v)} />

        <main className="relative w-full flex-grow flex flex-col items-center justify-center pt-20">
          <div className={`w-full h-full transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}`}>
            <Suspense fallback={<div className="flex items-center justify-center w-full h-full"><div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:postId" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Suspense>
          </div>
        </main>

        <footer className={`w-full max-w-7xl mx-auto px-8 py-4 flex flex-col sm:flex-row justify-between items-center opacity-0 ${!showPreloader ? 'animate-footer-in' : ''} sm:pr-24`}>
          <p className="text-white text-xs sm:text-sm mb-4 sm:mb-0">
            &copy; 2024 Senmizu Creatives Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white">
            <a href="https://www.instagram.com/senmizu_ltd/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" data-cursor-interactive className="p-2 rounded-full transform transition-all duration-300 hover:text-brand-primary hover:bg-brand-primary/10 hover:scale-110 hover:-translate-y-1">
              <IconInstagram />
            </a>
            <a href="https://www.facebook.com/senmizutt/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" data-cursor-interactive className="p-2 rounded-full transform transition-all duration-300 hover:text-brand-primary hover:bg-brand-primary/10 hover:scale-110 hover:-translate-y-1">
              <IconFacebook />
            </a>
            <a href="https://www.youtube.com/@senmizu892" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" data-cursor-interactive className="p-2 rounded-full transform transition-all duration-300 hover:text-brand-primary hover:bg-brand-primary/10 hover:scale-110 hover:-translate-y-1">
              <IconYoutube />
            </a>
          </div>
        </footer>
        <ScrollToTopButton />
        <AudioPlayer />
      </div>
    </>
  );
};

export default MainContent;
