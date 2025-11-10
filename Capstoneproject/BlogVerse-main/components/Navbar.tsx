import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-secondary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="text-2xl font-bold text-highlight">
            BlogVerse
          </Link>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 rounded-l-md bg-accent text-textdark focus:outline-none placeholder-textdark"
              />
              <button type="submit" className="px-4 py-2 bg-highlight text-white rounded-r-md hover:bg-opacity-80 transition-colors">
                Search
              </button>
            </form>
            {isAuthenticated ? (
              <>
                <Link to="/create" className="text-textlight hover:text-highlight transition-colors">
                  Create Post
                </Link>
                <div className="relative group">
                  <Link to={`/profile/${user?._id}`} className="flex items-center space-x-2 text-textlight hover:text-highlight transition-colors">
                    <img 
                      src={user?.profilePicture || `https://picsum.photos/seed/${user?._id}/32/32`} 
                      alt={user?.username}
                      className="w-8 h-8 rounded-full border-2 border-accent group-hover:border-highlight transition-colors"
                    />
                    <span className="hidden lg:inline">{user?.username}</span>
                  </Link>
                </div>
                 <button onClick={handleLogout} className="bg-accent text-textlight px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors">
                    Logout
                  </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-textlight hover:text-highlight transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-highlight text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;