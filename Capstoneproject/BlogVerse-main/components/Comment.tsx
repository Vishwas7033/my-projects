
import React from 'react';
import { Link } from 'react-router-dom';
import { Comment as CommentType } from '../types';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="bg-accent p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <img 
          src={comment.author.profilePicture || `https://picsum.photos/seed/${comment.author._id}/40/40`} 
          alt={comment.author.username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold text-textlight">
            <Link to={`/profile/${comment.author._id}`} className="hover:underline">{comment.author.username}</Link>
          </p>
          <p className="text-xs text-highlight">{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <p className="text-textdark">{comment.text}</p>
    </div>
  );
};

export default Comment;
