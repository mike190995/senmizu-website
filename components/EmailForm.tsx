import React, { useState, useRef } from 'react';

const ArrowRightIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-slate-900"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-6 w-6 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // The Google Apps Script URL provided by the user
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzjQM1KMjlgU95u4f-Xy83GW8yNHG0b5YjVwCfQAxasP4zLkDGXAy_JzcHTlMCPeXO_lA/exec';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      // Reset error after a few seconds
      setTimeout(() => {
        if (status === 'error') {
            setStatus('idle');
            setMessage('');
        }
      }, 3000);
      return;
    }
    
    setStatus('submitting');
    setMessage('Sending...');

    fetch(scriptURL, { method: 'POST', body: new FormData(formRef.current) })
      .then(response => response.json())
      .then(data => {
        if (data.result === 'success') {
          setStatus('success');
          setMessage('Thanks for subscribing!');
          setEmail(''); // Clear the input field
          setTimeout(() => {
            setStatus('idle');
            setMessage('');
          }, 5000); // Reset form to idle after 5 seconds
        } else {
          // This catches errors returned from the Apps Script `catch` block
          throw new Error(data.details || 'Unknown error from script');
        }
      })
      .catch(error => {
        console.error('Error!', error.message);
        setStatus('error');
        setMessage('Oops! An error occurred.');
        setTimeout(() => {
            if (status === 'error') {
                setStatus('idle');
                setMessage('');
            }
        }, 5000); // Reset form to idle after 5 seconds
      });
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-24">
      <form ref={formRef} onSubmit={handleSubmit} className="w-full relative h-16" name="submit-to-google-sheet">
        <input type="hidden" name="Category" value="Subscriber" />
        <input
          data-cursor-interactive
          type="email"
          name="email" // Make sure the name attribute matches your Google Sheet column
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to be notified"
          className="w-full h-16 px-6 py-4 text-white bg-black/50 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary backdrop-blur-sm transition-all duration-300 placeholder-slate-500 disabled:opacity-50"
          aria-label="Email Address"
          disabled={status === 'submitting'}
        />
        <button
          data-cursor-interactive
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-28 bg-brand-primary rounded-full flex items-center justify-center hover:bg-opacity-80 active:scale-95 transition-all duration-300 overflow-hidden disabled:bg-slate-600 disabled:hover:bg-slate-600"
          aria-label="Submit email"
          disabled={status === 'submitting'}
        >
          <span className="relative z-10">
            {status === 'submitting' ? <LoadingSpinner /> : <ArrowRightIcon />}
          </span>
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default EmailForm;
