import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, autoplay = false, autoplaySpeed = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = React.useCallback(() => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  React.useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, goToNext]);

  return (
    <div className="relative w-full">
      <div className="relative h-96 overflow-hidden rounded-lg">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="w-full h-full object-contain" />
      </div>
      <button onClick={goToPrevious} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
        &#10094;
      </button>
      <button onClick={goToNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;