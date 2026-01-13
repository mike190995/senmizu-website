import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PortfolioItem, { PortfolioItemProps } from '../components/PortfolioItem';
import { portfolioItems } from '../data/portfolioItems';
import SlickCarousel from '../components/SlickCarousel';
import PortfolioModal from '../components/PortfolioModal';

const PortfolioPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItemProps | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleItemClick = (item: PortfolioItemProps) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="max-w-6xl w-full mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-4">
          Our Work
        </h1>
        <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto">
          Explore a selection of our projects that showcase our passion for creating fluid, beautiful, and impactful digital experiences.
        </p>
        <SlickCarousel
          items={portfolioItems}
          onItemClick={handleItemClick}
        />
      </div>
      {mounted && createPortal(
        <PortfolioModal item={selectedItem} onClose={handleCloseModal} />,
        document.body
      )}
    </div>
  );
};

export default PortfolioPage;