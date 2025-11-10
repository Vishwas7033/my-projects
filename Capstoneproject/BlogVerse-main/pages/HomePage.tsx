import React, { useState, useEffect } from 'react';
import { getPosts, getCategories } from '../services/mockApi';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'BlogVerse - Home';
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedPosts, fetchedCategories] = await Promise.all([
          getPosts(),
          getCategories()
        ]);
        setPosts(fetchedPosts);
        setCategories(['All', ...fetchedCategories]);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <div 
        className="relative bg-cover bg-center rounded-lg h-80 mb-12 flex items-center justify-center text-center p-4"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop')"}}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-60 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Welcome to BlogVerse</h1>
          <p className="text-xl text-textlight mt-2 drop-shadow-md">Explore ideas, share stories, and connect with a world of writers.</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-textlight mb-4">Filter by Genre</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-highlight text-white'
                  : 'bg-secondary text-textdark hover:bg-accent hover:text-textlight'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-4xl font-bold text-textlight mb-8">Latest Posts</h2>
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
           <p className="text-center text-textdark text-xl bg-secondary p-8 rounded-lg">
            No posts found in this genre.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;