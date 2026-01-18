import React from 'react';
import { BlogPost } from '../types/blog';
import { useAudio } from '../context/AudioContext';
import { Play, Pause } from 'lucide-react';

const PlayButton: React.FC<{ audioSrc: string; title: string }> = ({ audioSrc, title }) => {
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();
  const isCurrentTrack = currentTrack?.src === encodeURI(audioSrc);
  const isMsgPlaying = isCurrentTrack && isPlaying;

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack({ src: encodeURI(audioSrc), title });
    }
  };

  return (
    <button
      onClick={handlePlay}
      className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-brand-primary/90 transition-colors"
    >
      {isMsgPlaying ? <Pause size={18} /> : <Play size={18} />}
      <span className="font-medium">{isMsgPlaying ? 'Pause' : 'Play Episode'}</span>
    </button>
  );
};

interface BlogPostLayoutProps {
  post: BlogPost;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ post }) => {
  // Default to empty values if post is not provided to prevent errors
  const {
    title = 'Blog Post Not Found',
    bannerImage = 'https://placehold.co/1600x400/3a3a6a/f0f0f0?text=Image+Not+Available',
    audioSrc,
    content,
    tags,
  } = post || {};

  return (
    <div className="font-sans">
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <article className="bg-white rounded-lg shadow-xl overflow-hidden">
          <img
            src={bannerImage}
            alt={`Banner for ${title}`}
            className="w-full h-auto object-cover"
            loading="lazy"
          />

          <div className="p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h1>

            <div className="flex flex-wrap items-center mb-3">
              {tags && tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>

            {/* Render the actual AudioPlayer if audioSrc is available */}
            {audioSrc && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Listen to the Episode</h3>
                  <p className="text-sm text-gray-500">Audio version of this article</p>
                </div>
                <PlayButton
                  audioSrc={audioSrc}
                  title={title}
                />
              </div>
            )}

            {/* Render the dynamic content blocks */}
            <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
              {content?.map((block, index) => {
                if (block.type === 'text') {
                  return <p key={index} dangerouslySetInnerHTML={{ __html: block.content }} />;
                }
                if (block.type === 'image') {
                  return (
                    <img
                      key={index}
                      src={block.src}
                      alt={block.alt || 'Blog image'}
                      className="w-full h-auto rounded-lg shadow-md my-8"
                      loading="lazy"
                    />
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
                      {block.content}
                    </h2>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-md my-8 text-base">
                      <ul className="list-disc pl-5 space-y-3">
                        {block.content.map((item, itemIndex) => (
                          <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPostLayout;
