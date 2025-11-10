import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPost, getCommentsForPost, addComment, deletePost } from '../services/mockApi';
import { Post, Comment as CommentType } from '../types';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/Spinner';
import Comment from '../components/Comment';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCommenting, setIsCommenting] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const postData = await getPost(id);
      const commentsData = await getCommentsForPost(id);
      setPost(postData);
      setComments(commentsData);
      document.title = `BlogVerse - ${postData.title}`;
    } catch (err) {
      setError('Failed to load post data.');
      document.title = 'BlogVerse - Post Not Found';
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.trim()) return;

    setIsCommenting(true);
    try {
      const addedComment = await addComment(id, newComment);
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment', err);
      alert('Failed to add comment.');
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(id);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete post', err);
      alert('Failed to delete post.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (error || !post) {
    return <div className="text-center text-red-500">{error || 'Post not found.'}</div>;
  }

  const isAuthor = user?._id === post.author._id;
  const bannerImageUrl = `https://picsum.photos/seed/${post._id}/1200/400`;

  return (
    <div className="bg-secondary shadow-md max-w-4xl mx-auto rounded-lg overflow-hidden">
      <div 
        className="h-64 bg-cover bg-center"
        style={{backgroundImage: `url(${bannerImageUrl})`}}
      ></div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold text-textlight">{post.title}</h1>
            <div className="flex items-center text-sm text-highlight mt-2 flex-wrap gap-x-2">
               <img 
                src={post.author.profilePicture || `https://picsum.photos/seed/${post.author._id}/32/32`} 
                alt={post.author.username}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>By <Link to={`/profile/${post.author._id}`} className="font-semibold hover:underline">{post.author.username}</Link></span>
              <span className="hidden sm:inline">|</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
               {post.category && (
                <>
                  <span className="hidden sm:inline">|</span>
                  <span className="bg-accent text-xs font-semibold px-2 py-1 rounded-full text-textlight">{post.category}</span>
                </>
              )}
            </div>
          </div>
          {isAuthor && (
            <div className="flex space-x-2">
              <Link to={`/edit/${post._id}`} className="bg-highlight text-white px-3 py-1 rounded hover:bg-opacity-80">Edit</Link>
              <button onClick={handleDelete} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
            </div>
          )}
        </div>

        <div className="prose prose-invert max-w-none text-textdark leading-relaxed whitespace-pre-wrap mb-8">
          {post.content}
        </div>

        <hr className="border-accent mb-8" />
        
        <h3 className="text-2xl font-bold text-textlight mb-4">Comments ({comments.length})</h3>
        
        <div className="space-y-4 mb-8">
          {comments.length > 0 ? (
            comments.map(comment => <Comment key={comment._id} comment={comment} />)
          ) : (
            <p className="text-textdark">No comments yet.</p>
          )}
        </div>

        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 bg-primary text-textdark rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
              rows={4}
              required
            />
            <button type="submit" disabled={isCommenting} className="mt-2 bg-highlight text-white px-4 py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-500">
              {isCommenting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="text-textdark">
            <Link to="/login" className="text-highlight hover:underline">Log in</Link> to post a comment.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostPage;
