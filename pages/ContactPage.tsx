import React, { useState } from 'react';
import Alert from '../components/Alert';
import SuccessConfirmation from '../components/SuccessConfirmation';

const IconMail: React.FC = () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const IconPhone: React.FC = () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-6 w-6 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const ContactPage: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    // --- WEB3FORMS SETUP ---
    // 1. Go to https://web3forms.com/
    // 2. Enter your email: hello@senmizu.com
    // 3. Paste the access key you receive here
    const access_key = 'a354089d-da4a-4fa4-b84b-7afc02c9d047';
    // -------------------------

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleDismissError = () => {
        setStatus('idle');
        setMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setStatus('error');
            setMessage('Please enter your full name.');
            return;
        }
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }
        if (!formData.message.trim()) {
            setStatus('error');
            setMessage('Please write a message before sending.');
            return;
        }

        if (access_key === 'a354089d-da4a-4fa4-b84b-7afc02c9d047') {
            setStatus('error');
            setMessage('Please add your Web3Forms access key to the code.');
            return;
        }

        setStatus('submitting');
        setMessage('');

        const submissionData = {
            ...formData,
            access_key: access_key,
            subject: `New Contact Form Submission from ${formData.name}`,
            from_name: "Senmizu Website",
        };

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setMessage("Thank you for your message! We'll get back to you shortly.");
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                console.error('Submission Error:', result);
                setStatus('error');
                setMessage(result.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setStatus('error');
            setMessage('A network error occurred. Please try again.');
        }
    };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <div className="max-w-5xl w-full mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
            Get In Touch
            </h1>
            <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? We'd love to hear from you.
            </p>

            <div className="grid md:grid-cols-2 gap-16 text-left">
                {/* Contact Form */}
                <div>
                     {status === 'error' && <Alert message={message} type="error" onDismiss={handleDismissError} />}
                     {status === 'success' ? (
                        <SuccessConfirmation title="Message Sent!" message={message} />
                    ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                            <input data-cursor-interactive type="text" id="name" required value={formData.name} onChange={handleChange} className="w-full h-12 px-4 text-white bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm transition-all" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                            <input data-cursor-interactive type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full h-12 px-4 text-white bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm transition-all" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                            <textarea data-cursor-interactive id="message" rows={4} required value={formData.message} onChange={handleChange} className="w-full px-4 py-3 text-white bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm transition-all"></textarea>
                        </div>
                        <button 
                            data-cursor-interactive 
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full h-14 flex items-center justify-center bg-cyan-500 text-slate-900 font-bold rounded-lg hover:bg-cyan-400 active:scale-95 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed">
                                {status === 'submitting' ? <LoadingSpinner /> : 'Send Message'}
                        </button>
                    </form>
                    )}
                </div>

                {/* Map */}
                <div className="rounded-lg overflow-hidden shadow-2xl">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7840.598608546994!2d-61.47573706393781!3d10.711381857733638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c36068759c5fe95%3A0x490f53f7e68a2def!2sCantaro!5e0!3m2!1sen!2stt!4v1760502819816!5m2!1sen!2stt" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactPage;
