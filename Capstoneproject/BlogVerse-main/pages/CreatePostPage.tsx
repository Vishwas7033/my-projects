import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost, getPost, updatePost, getCategories } from '../services/mockApi';

const CreatePostPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEditing = Boolean(id);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const categoriesData = await getCategories();
        setAllCategories(categoriesData);

        if (isEditing && id) {
          const post = await getPost(id);
          setTitle(post.title);
          setContent(post.content);
          setCategory(post.category);
        }
      } catch (err) {
        setError('Failed to fetch initial data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim()) {
      setError('Category is required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      if (isEditing) {
        const updatedPost = await updatePost(id!, { title, content, category });
        navigate(`/posts/${updatedPost._id}`);
      } else {
        const newPost = await createPost({ title, content, category });
        navigate(`/posts/${newPost._id}`);
      }
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} post.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-textlight mb-6">
        {isEditing ? 'Edit Post' : 'Create New Post'}
      </h2>
      {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-textlight mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-primary text-textdark rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-textlight mb-2" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            list="category-suggestions"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-primary text-textdark rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            placeholder="e.g., Technology, Lifestyle"
            required
          />
          <datalist id="category-suggestions">
            {allCategories.map(cat => <option key={cat} value={cat} />)}
          </datalist>
        </div>
        
        <div className="mb-6">
          <label className="block text-textlight mb-2" htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 bg-primary text-textdark rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            rows={15}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-highlight text-white py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-500"
        >
          {loading ? 'Submitting...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
