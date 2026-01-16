import React from 'react';

export interface PortfolioItemProps {
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
  mediaLink: string | string[];
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ title, subtitle, body, tags, mediaLink }) => {
  const mediaItems = Array.isArray(mediaLink) ? mediaLink : [mediaLink];
  const displayMedia = mediaItems[0] || '';

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
        <video
          controls
          preload="metadata"
          className="w-full rounded-lg shadow-lg aspect-video bg-black/40"
        >
          <source src={displayMedia} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={displayMedia}
          alt={title}
          loading="lazy"
          className="w-full rounded-lg shadow-lg object-cover"
        />
      )}
    </div>
  );
};

export default PortfolioItem;