import React from 'react';
import AudioPlayer from './AudioPlayer';
import { BlogContentBlock } from '../types/blog';

interface BlogPostProps {
  title: string;
  audioSrc?: string;
  featuredImage: string;
  category: string;
  date: string;
  readTime: string;
  onClick?: () => void;
  tags?: string[];
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  audioSrc,
  featuredImage,
  category,
  date,
  readTime,
  onClick,
  tags,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div onClick={handleClick} className="bg-black/20 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden border border-white/10" data-cursor-interactive>
      <img className="w-full h-56 object-cover" src={featuredImage} alt={title || "Blog post featured image"} />
      <div className="p-6">
        <div className="flex flex-wrap items-center mb-3">
          <span className="inline-block bg-brand-primary/20 text-brand-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mr-2">
            {category}
          </span>
          {tags && tags.map(tag => (
            <span key={tag} className="inline-block bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mr-2 mb-2">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-2xl text-white mb-2 leading-tight">{title}</h3>
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>{date}</span>
          <span>{readTime}</span>
        </div>
      </div>
      {audioSrc && (
        <div className="px-6 pb-4">
          <AudioPlayer src={audioSrc} title={title} />
        </div>
      )}
    </div>
  );
};

export default BlogPost;