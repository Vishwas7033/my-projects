import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchPosts } from '../services/mockApi';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await searchPosts(query);
        setResults(posts);
      } catch (err) {
        setError('Failed to perform search.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
        performSearch();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);

  }, [query]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-textlight mb-8">
        Search Results for: <span className="text-highlight">"{query}"</span>
      </h1>

      {loading && <div className="flex justify-center items-center h-64"><Spinner /></div>}
      
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="space-y-6">
          {results.length > 0 ? (
            results.map(post => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-center text-textdark text-xl bg-secondary p-8 rounded-lg">
              No posts found matching your search.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
