import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Page } from '../App';

interface NavbarProps {
  activePage: Page;
  onNavClick: (page: Page) => void;
  useSplashCursor?: boolean;
  onToggleCursor?: () => void;
}

const navLinks: Page[] = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];

const MenuIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// CursorIcon removed — toggles will use only the pill indicator and text label now.

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavClick, useSplashCursor = true, onToggleCursor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const handleLinkClick = (page: Page) => {
    onNavClick(page);
    setIsOpen(false);
    if (page === 'Home') {
      navigate('/');
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  useEffect(() => {
    const controlNavbar = () => {
      // If mobile menu is open, always show the navbar
      if (isOpen) {
        setIsVisible(true);
        return;
      }

      if (window.scrollY > lastScrollY && window.scrollY > 80) { // Scrolling down
        setIsVisible(false);
      } else { // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, isOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-20 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center bg-black/50 backdrop-blur-sm rounded-b-lg border-b border-white/10">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('Home')}
          data-cursor-interactive
          className="focus:outline-none"
          aria-label="Senmizu, go to home page"
        >
          <img src="/senmizuWhiteLogo.svg" alt="Senmizu Logo" className="h-8 w-auto" />
        </button>
        
        
        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <button
                data-cursor-interactive
                onClick={() => handleLinkClick(link)}
                className={`text-base font-medium transition-colors duration-300 ${
                  activePage === link ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
                aria-current={activePage === link ? 'page' : undefined}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {isOpen ? (
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-cursor-interactive
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded="true"
            >
              <CloseIcon />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-cursor-interactive
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded="false"
            >
              <MenuIcon />
            </button>
          )}
        </div>
        {/* Cursor Toggle */}
        <div className="ml-4 hidden md:flex items-center gap-3">
          {/* Animated pill toggle for desktop */}
          {useSplashCursor ? (
            <button
              data-cursor-interactive
              onClick={() => onToggleCursor?.()}
              className="relative inline-flex items-center h-8 px-4 rounded-full bg-white/5 hover:bg-white/10 focus:outline-none"
              role="switch"
              aria-checked="true"
              aria-label="Disable splash cursor"
              title="Splash cursor enabled"
            >
              <span className="absolute left-1 w-6 h-6 rounded-full bg-[#00FFBF] transform transition-transform translate-x-6 shadow-sm" />
              <span className="relative z-10 text-sm font-medium text-[#00FFBF] pl-10">Splash</span>
            </button>
          ) : (
            <button
              data-cursor-interactive
              onClick={() => onToggleCursor?.()}
              className="relative inline-flex items-center h-8 px-4 rounded-full bg-white/5 hover:bg-white/10 focus:outline-none"
              role="switch"
              aria-checked="false"
              aria-label="Enable splash cursor"
              title="Splash cursor disabled"
            >
              <span className="absolute left-1 w-6 h-6 rounded-full bg-white transform transition-transform translate-x-0 shadow-sm" />
              <span className="relative z-10 text-sm font-medium text-white pl-10">Light</span>
            </button>
          )}
        </div>
      </nav>

    {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 left-0 w-screen h-screen bg-black/90 backdrop-blur-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Close Button */}
        <div className="absolute top-4 right-4 sm:right-8">
          <button
            onClick={() => setIsOpen(false)}
            data-cursor-interactive
            className="text-white focus:outline-none p-2"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
          <ul className="flex flex-col items-center justify-center h-full gap-8 p-6">
        {/* Mobile cursor toggle - centered pill */}
        <li className="w-full flex justify-center">
          {useSplashCursor ? (
            <button
              data-cursor-interactive
              onClick={() => onToggleCursor?.()}
              className="relative inline-flex items-center h-10 px-5 rounded-full bg-white/5 hover:bg-white/10 focus:outline-none"
              role="switch"
              aria-checked="true"
              title="Disable splash cursor"
            >
              <span className="absolute left-2 w-6 h-6 rounded-full bg-[#00FFBF] transform transition-transform translate-x-6 shadow-sm" />
              <span className="relative z-10 text-base font-semibold text-[#00FFBF] pl-10">Splash</span>
            </button>
          ) : (
            <button
              data-cursor-interactive
              onClick={() => onToggleCursor?.()}
              className="relative inline-flex items-center h-10 px-5 rounded-full bg-white/5 hover:bg-white/10 focus:outline-none"
              role="switch"
              aria-checked="false"
              title="Enable splash cursor"
            >
              <span className="absolute left-2 w-6 h-6 rounded-full bg-white transform transition-transform translate-x-0 shadow-sm" />
              <span className="relative z-10 text-base font-semibold text-white pl-10">Light</span>
            </button>
          )}
        </li>
              {navLinks.map((link) => (
                  <li key={link}>
                      <button
                          data-cursor-interactive
                          onClick={() => handleLinkClick(link)}
                          className={`text-lg font-medium transition-colors duration-300 w-full text-center py-2 ${
                              activePage === link ? 'text-brand-primary' : 'text-slate-200 hover:text-brand-primary'
                          }`}
                          aria-current={activePage === link ? 'page' : undefined}
                      >
                          {link}
                      </button>
                  </li>
              ))}
          </ul>
      </div>

    </header>
  );
};

export default Navbar;
