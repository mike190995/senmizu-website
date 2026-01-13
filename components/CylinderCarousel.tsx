import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

interface CarouselItemProps {
  item: any;
  isActive: boolean;
  onClick: () => void;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item, isActive, onClick }) => (
  <div
    onClick={onClick}
    data-cursor-interactive
    className={`group absolute w-[300px] h-[300px] rounded-lg shadow-lg bg-slate-800 transition-all duration-500 ease-in-out transform-style-3d ${
      isActive ? 'ring-2 ring-cyan-500 ring-offset-4 ring-offset-slate-900' : ''
    }`}
  >
    {item.videoUrl ? (
      <video
        src={item.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover rounded-lg"
      />
    ) : (
      <img
        src={item.imageUrl}
        alt={`Portfolio item: ${item.title}`}
        className="absolute inset-0 h-full w-full object-cover rounded-lg"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent rounded-lg" />
    <div className="absolute bottom-0 left-0 w-full p-6 transition-all duration-500 ease-in-out transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
      <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">{item.category}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{item.title}</h3>
    </div>
  </div>
);

export interface CylinderCarouselRef {
  resetCarouselState: () => void;
}

interface CylinderCarouselProps {
  items: any[];
  onItemClick: (item: any) => void;
}

const CylinderCarousel = forwardRef<CylinderCarouselRef, CylinderCarouselProps>(({ items, onItemClick }, ref) => {
  const [rotation, setRotation] = useState(0);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true); // New state for auto-rotate

  const totalItems = items.length;
  const angle = 360 / totalItems;
  const radius = 400; // Adjust this value to change the radius of the cylinder

  useEffect(() => {
    if (autoRotateEnabled && !isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => prev + angle);
      }, 3000); // Auto-rotate every 3 seconds
      return () => clearInterval(interval);
    }
  }, [angle, autoRotateEnabled, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentRotation(rotation);
    setAutoRotateEnabled(false); // Disable auto-rotate on manual interaction
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    // Adjust sensitivity of swipe
    const newRotation = currentRotation + diffX * 0.5; 
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Snap to nearest item
    const nearestAngle = Math.round(rotation / angle) * angle;
    setRotation(nearestAngle);
    // Re-enable auto-rotate after a short delay, or based on user preference
    // For now, let's keep it disabled after manual interaction until explicitly re-enabled
    // setAutoRotateEnabled(true); 
  };

  const resetCarouselState = () => {
    setRotation(0); // Reset rotation to initial state
    setActiveItemId(null); // Reset active item
    setIsDragging(false);
    setStartX(0);
    setCurrentRotation(0);
    setAutoRotateEnabled(true); // Re-enable auto-rotate
  };

  useImperativeHandle(ref, () => ({
    resetCarouselState,
  }));

  // Re-enable auto-rotate after a period of inactivity
  useEffect(() => {
    if (!autoRotateEnabled && !isDragging) {
      const timeout = setTimeout(() => {
        setAutoRotateEnabled(true);
      }, 5000); // Re-enable after 5 seconds of inactivity
      return () => clearTimeout(timeout);
    }
  }, [autoRotateEnabled, isDragging, rotation]);

  const handleItemClick = (item: any, index: number) => {
    setRotation(-index * angle);
    setActiveItemId(item.id);
    onItemClick(item);
    setAutoRotateEnabled(false); // Disable auto-rotate on item click
  };

  const handlePrev = () => {
    setRotation(prev => prev + angle);
    setAutoRotateEnabled(false);
  };

  const handleNext = () => {
    setRotation(prev => prev - angle);
    setAutoRotateEnabled(false);
  };

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center perspective-1000 mt-32"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // End drag if mouse leaves the carousel area
      onTouchStart={e => handleMouseDown(e as any)}
      onTouchMove={e => handleMouseMove(e as any)}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
    >
      <button
        onClick={handlePrev}
        data-cursor-interactive
        className="absolute left-4 z-20 p-4 rounded-full bg-slate-800/50 text-white border border-slate-700 hover:bg-slate-700/70 hover:text-cyan-400 transition-all duration-300"
        aria-label="Previous item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={handleNext}
        data-cursor-interactive
        className="absolute right-4 z-20 p-4 rounded-full bg-slate-800/50 text-white border border-slate-700 hover:bg-slate-700/70 hover:text-cyan-400 transition-all duration-300"
        aria-label="Next item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      <div
        className="relative w-[300px] h-[400px] carousel-item-container"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {items.map((item, index) => {
          const itemAngle = angle * index;

          return (
            <div
              key={item.id}
              className="absolute w-full h-full carousel-item-positioned"
              style={{
                '--item-rotation-angle': `${itemAngle}deg`,
                '--item-translateZ': `${radius}px`,
              } as React.CSSProperties}
            >
              <CarouselItem
                item={item}
                isActive={activeItemId === item.id}
                onClick={() => handleItemClick(item, index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CylinderCarousel;
