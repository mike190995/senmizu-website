import React, { useEffect } from 'react';
import { PortfolioItemProps } from './PortfolioItem';
import ImageCarousel from './ImageCarousel';

interface PortfolioModalProps {
  item: PortfolioItemProps | null;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!item) return null;

  const renderMedia = () => {
    if (Array.isArray(item.mediaLink)) {
      return <ImageCarousel images={item.mediaLink} autoplay={true} autoplaySpeed={3000} />;
    }

    if (item.mediaLink.endsWith('.mp4')) {
      return (
        <video controls autoPlay loop muted className="w-full rounded-t-lg shadow-lg max-h-[60vh] object-contain">
          <source src={item.mediaLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return <img src={item.mediaLink} alt={item.title} loading="lazy" className="w-full rounded-t-lg shadow-lg max-h-[60vh] object-contain" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 overflow-y-auto custom-scrollbar-hidden" onClick={onClose}>
      <button
        onClick={onClose}
        className="fixed top-4 left-4 md:top-8 md:left-8 z-[110] text-white hover:text-cyan-400 transition-colors duration-300 focus:outline-none"
        aria-label="Close modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="relative bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto custom-scrollbar-hidden" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-4xl font-bold hover:text-gray-300"
        >
          &times;
        </button>
        <div className="flex flex-col">
          <div className="flex-shrink-0">
            {renderMedia()}
          </div>
          <div className="p-6">
            <h2 className="text-4xl font-bold mb-2 text-white">{item.title}</h2>
            <h3 className="text-xl text-cyan-400 mb-4">{item.subtitle}</h3>
            <p className="text-lg text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: item.body }} />
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;