import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPostLayout from '../components/BlogPostLayout';
import { mockBlogPosts } from '../data/mockBlogPosts';
import { BlogPost } from '../types/blog';

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post: BlogPost | undefined = mockBlogPosts.find(p => p.id === postId);

  if (!post) {
    return <div className="text-white text-center py-10">Blog post not found.</div>;
  }

  return (
    <div className="lg:w-4/5 mx-auto">
      <BlogPostLayout post={post} />
    </div>
  );
};

export default BlogPostPage;
