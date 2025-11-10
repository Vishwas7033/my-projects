import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-secondary p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-textlight mb-6 text-center">Login</h2>
      {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-center text-textdark mt-4">
        Don't have an account? <Link to="/register" className="text-highlight hover:underline">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
