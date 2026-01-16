import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { ImageContent } from '../types/blog';
import { useAudio } from '../context/AudioContext';
import { PlayCircle } from 'lucide-react';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playTrack } = useAudio();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <div className="text-white text-center py-12">Blog post not found.</div>;
  }

  const handlePlayAudio = () => {
    if (post.audioSrc) {
      playTrack({
        src: encodeURI(post.audioSrc),
        title: post.title
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <header className="text-center mb-12">
        {post.bannerImage && (
          <img
            src={post.bannerImage}
            alt={post.title || "Blog post banner image"}
            className="w-full h-96 object-cover rounded-lg mb-8"
            fetchPriority="high"
          />
        )}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          {post.title}
        </h1>
        <div className="text-lg text-slate-400 mb-6">
          <span className="inline-block bg-brand-primary/20 text-brand-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mr-3">
            {post.category}
          </span>
          <span>{post.date} &bull; {post.readTime}</span>
        </div>
        {post.audioSrc && (
          <div className="max-w-xl mx-auto mt-6">
            <button
              onClick={handlePlayAudio}
              className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white rounded-full transition-all transform hover:scale-105 shadow-lg group"
            >
              <PlayCircle className="w-6 h-6 group-hover:animate-pulse" />
              <span>Listen to this Article</span>
            </button>
          </div>
        )}
      </header>

      <div className="mx-auto text-white max-w-4xl">
        {post.content.map((block, index) => {
          if (block.type === 'text') {
            return (
              <div key={index} className="prose prose-invert lg:prose-xl mx-auto mb-8">
                <div dangerouslySetInnerHTML={{ __html: block.content }} />
              </div>
            );
          } else if (block.type === 'image') {
            const imageBlock = block as ImageContent;
            const imageClasses = `w-full h-auto object-cover rounded-lg shadow-lg my-8 ${imageBlock.position === 'left' ? 'md:float-left md:w-1/2 md:mr-8' :
              imageBlock.position === 'right' ? 'md:float-right md:w-1/2 md:ml-8' :
                ''
              }`;
            return (
              <div key={index} className={`my-8 ${imageBlock.position === 'left' || imageBlock.position === 'right' ? 'md:flex' : ''}`}>
                <img
                  src={imageBlock.src}
                  alt={imageBlock.alt || ''}
                  className={imageClasses}
                  loading="lazy"
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default BlogPostDetail;