import React from 'react';
import { BlogPost } from '../types/blog';
import AudioPlayer from './AudioPlayer';

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
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Listen to the Episode</h3>
                <AudioPlayer src={audioSrc} title={title} />
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
