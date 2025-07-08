import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email, role);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className={`w-full max-w-md backdrop-blur-xl rounded-xl bg-white/5 shadow-lg p-8 transition-all duration-700 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-white/80 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm text-white/80 mb-1">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            >
              <option value="user" className="bg-gray-900 text-white">User</option>
              <option value="admin" className="bg-gray-900 text-white">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all text-white font-medium py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Optional Message or Footer */}
        <p className="text-sm text-center text-white/60 mt-6">Don’t have an account? <span className="text-purple-400 underline cursor-pointer">Contact Admin</span></p>
      </div>
    </div>
  );
};

export default LoginForm;
