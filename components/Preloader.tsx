import React from 'react';

interface PreloaderProps {
  isExiting: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isExiting }) => {
  return (
    <div
      className={`fixed inset-0 bg-slate-900 flex items-center justify-center z-50 transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Ripple Effect */}
        <div className="absolute w-40 h-40 bg-brand-primary/20 rounded-full animate-preloader-ripple"></div>

        {/* Logo Image */}
        <img
          src="/senmizuWhiteLogo.svg"
          alt="Senmizu Logo"
          className="relative h-36 w-auto animate-preloader-text"
        />
        {/* Tagline Text */}
        <p className="relative mt-4 text-lg text-slate-400 animate-preloader-text">
          Let's make waves!
        </p>
      </div>
    </div>
  );
};

export default Preloader;
