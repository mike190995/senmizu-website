import React, { useState, useEffect } from 'react';

const IconArrowUp: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set up scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            data-cursor-interactive
            aria-label="Scroll to top"
            className={`fixed bottom-8 right-8 z-20 h-14 w-14 rounded-full bg-cyan-500/80 backdrop-blur-sm text-slate-900 shadow-lg transition-all duration-300 ease-in-out hover:bg-cyan-400 hover:scale-110 active:scale-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
            }`}
        >
            <span className="flex items-center justify-center">
                <IconArrowUp />
            </span>
        </button>
    );
};

export default ScrollToTopButton;
