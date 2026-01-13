import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PortfolioItem, { PortfolioItemProps } from './PortfolioItem';

interface SlickCarouselProps {
  items: PortfolioItemProps[];
  onItemClick: (item: PortfolioItemProps) => void;
}

const SlickCarousel: React.FC<SlickCarouselProps> = ({ items, onItemClick }) => {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-4/5 mx-auto md:w-full">
      <Slider {...settings}>
        {items.map((item, index) => {
          const displayMedia = Array.isArray(item.mediaLink) ? item.mediaLink[0] : item.mediaLink;
          return (
            <div key={index} onClick={() => onItemClick(item)}>
              <div className="p-4">
                <div className="group relative block w-full h-64 overflow-hidden rounded-lg shadow-lg bg-slate-800">
                  {displayMedia.endsWith('.mp4') ? (
                    <video
                      src={displayMedia}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={displayMedia}
                      alt={`Portfolio item: ${item.title}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-6 transition-all duration-500 ease-in-out transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-2xl font-bold text-white mt-1">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlickCarousel;
