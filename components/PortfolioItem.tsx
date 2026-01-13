import React from 'react';

export interface PortfolioItemProps {
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
  mediaLink: string | string[];
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ title, subtitle, body, tags, mediaLink }) => {
  const displayMedia = Array.isArray(mediaLink) ? mediaLink[0] : mediaLink;

  return (
    <div className="portfolio-item mb-12">
      <h2 className="text-4xl font-bold mb-2">{title}</h2>
      <h3 className="text-xl text-gray-400 mb-4">{subtitle}</h3>
      <p className="text-lg text-gray-300 mb-4">{body}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
      {displayMedia.endsWith('.mp4') ? (
        <video controls className="w-full rounded-lg shadow-lg">
          <source src={displayMedia} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={displayMedia} alt={title} className="w-full rounded-lg shadow-lg" />
      )}
    </div>
  );
};

export default PortfolioItem;