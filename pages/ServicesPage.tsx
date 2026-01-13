import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => (
  <div data-cursor-interactive className="bg-slate-800/50 backdrop-blur-md p-8 rounded-lg border border-slate-700 text-center transition-all duration-300 hover:border-cyan-500 hover:-translate-y-2">
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const ServicesPage: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in">
       <div className="max-w-5xl mx-auto">
         <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
           Our Services
         </h1>
         <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto">
           We provide a complete suite of services to bring your digital vision to life, from initial concept to final launch.
         </p>

         <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard 
              title="Strategic Cloud Consultations"
              description="Ready to navigate the next digital horizon? Our strategic consultations are a collaborative partnership designed to map your journey to success. We dive deep into your unique challenges and goals to architect a powerful, adaptable cloud strategy built on the Google ecosystem, ensuring you’re ready to make a real impact."
            />
            <ServiceCard 
              title="Web 3.0 Development"
              description="Let's pioneer the future, together. Our Web 3.0 development services help you ride the wave of innovation, building the next generation of decentralized applications on a resilient and scalable foundation. We leverage the power of Google's cloud infrastructure to navigate these uncharted waters, creating solutions that are both visionary and robust."
            />
            <ServiceCard 
              title="Native App Development"
              description="We create powerful native applications that feel naturally seamless and drive tangible success for your business. Built exclusively within the Google ecosystem, our apps set the regional standard for performance and user experience, delivering measurable results that ripple through your operations."
            />
            <ServiceCard 
              title="AI Agent Development & Automations"
              description="Ride the grand wave of artificial intelligence with our custom AI agents and automation solutions. We build intelligent, adaptable systems within the Google Cloud ecosystem that streamline your operations, unlock new efficiencies, and create powerful momentum for your business’s growth."
            />
         </div>
       </div>
    </div>
  );
};

export default ServicesPage;
