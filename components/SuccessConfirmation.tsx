import React from 'react';

const IconCheckCircle: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface SuccessConfirmationProps {
  title: string;
  message: string;
}

const SuccessConfirmation: React.FC<SuccessConfirmationProps> = ({ title, message }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-800/50 p-8 rounded-lg animate-fade-in border border-slate-700 text-center">
      <div className="animate-icon-pop-in mb-4">
        <IconCheckCircle />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-cyan-300">{message}</p>
    </div>
  );
};

export default SuccessConfirmation;