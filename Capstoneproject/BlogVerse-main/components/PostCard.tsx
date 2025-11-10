import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const snippet = post.content.length > 150 
    ? `${post.content.substring(0, 150)}...` 
    : post.content;

  const backgroundImageUrl = `https://picsum.photos/seed/${post._id}/800/400`;

  return (
    <div 
      className="relative p-6 rounded-lg shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-secondary bg-opacity-80 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-textlight mb-2">
          <Link to={`/posts/${post._id}`} className="hover:text-highlight">{post.title}</Link>
        </h2>
        <div className="flex items-center text-sm text-highlight mb-4 flex-wrap gap-x-2">
          <div className="flex items-center">
            <img 
              src={post.author.profilePicture || `https://picsum.photos/seed/${post.author._id}/24/24`} 
              alt={post.author.username}
              className="w-6 h-6 rounded-full mr-2 border border-highlight"
            />
            <Link to={`/profile/${post.author._id}`} className="font-semibold hover:underline">{post.author.username}</Link>
          </div>
          <span className="hidden sm:inline">|</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          {post.category && (
            <>
              <span className="hidden sm:inline">|</span>
              <span className="bg-accent text-xs font-semibold px-2 py-1 rounded-full text-textlight">{post.category}</span>
            </>
          )}
        </div>
        <p className="text-textdark mb-4">{snippet}</p>
        <Link to={`/posts/${post._id}`} className="font-semibold text-highlight hover:underline">
          Read more &rarr;
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
