import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    setError('');
    setLoading(true);
    try {
      await register({ username, email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to register. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-secondary p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-textlight mb-6 text-center">Register</h2>
      {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-textlight mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-primary text-textdark rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-textlight mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-primary text-textdark rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-textlight mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-primary text-textdark rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-highlight text-white py-2 rounded-md hover:bg-opacity-80 disabled:bg-gray-500"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
       <p className="text-center text-textdark mt-4">
        Already have an account? <Link to="/login" className="text-highlight hover:underline">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
