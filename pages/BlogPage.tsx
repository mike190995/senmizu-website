import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import BlogPost from '../components/BlogPost';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Sort posts by date descending to ensure the featured post is the most recent
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredPost = sortedPosts[0];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  const handleBackClick = () => {
    navigate('/blog');
  };

  const filteredPosts = sortedPosts.filter((post) => {
    const searchTermLower = searchTerm.toLowerCase();
    const titleMatch = post.title.toLowerCase().includes(searchTermLower);
    const contentMatch = post.content ? post.content.some(block => block.type === 'text' && block.content.toLowerCase().includes(searchTermLower)) : false;
    const tagMatch = post.tags ? post.tags.some(tag => tag.toLowerCase().includes(searchTermLower)) : false;
    return titleMatch || contentMatch || tagMatch;
  });


  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 pb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Our Blog
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Insights, stories, and updates from our team on the latest in technology, design, and business.
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-16">
        <div className="relative flex items-center shadow-lg rounded-full">
          <input
            type="text"
            placeholder="Search for articles..."
            className="w-full px-6 py-3 border border-white/10 bg-black/20 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white text-lg placeholder-slate-400"
            data-cursor-interactive
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg
            className="absolute right-4 h-6 w-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="mb-16">
          <div className="flex justify-center lg:w-4/5 lg:mx-auto">
            <BlogPost
              key={featuredPost.id}
              title={featuredPost.title}
              audioSrc={featuredPost.audioSrc}
              featuredImage={featuredPost.featuredImage}
              category={featuredPost.category}
              date={featuredPost.date}
              readTime={featuredPost.readTime}
              tags={featuredPost.tags}
              onClick={() => handlePostClick(featuredPost.id)}
              isFeatured={false}
            />
          </div>
        </section>
      )}

      {/* All Posts Section (if more than one post exists) */}
      {filteredPosts.filter(post => post.id !== featuredPost?.id).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => post.id !== featuredPost?.id).map((post) => (
            <BlogPost
              key={post.id}
              title={post.title}
              audioSrc={post.audioSrc}
              featuredImage={post.featuredImage}
              category={post.category}
              date={post.date}
              readTime={post.readTime}
              tags={post.tags}
              onClick={() => handlePostClick(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;