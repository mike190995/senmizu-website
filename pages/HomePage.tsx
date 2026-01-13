import React from 'react';
import EmailForm from '../components/EmailForm';

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 uppercase">
          SENMIZU
        </h1>
        <h2 className="text-2xl md:text-4xl font-light text-slate-300 mb-8">
          Something new is on the horizon.
        </h2>
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
          We're crafting a unique experience. Sign up below to be the first to know when we launch.
        </p>
        <EmailForm />
      </div>
    </div>
  );
};

export default HomePage;
