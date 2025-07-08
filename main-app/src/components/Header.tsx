// it contains top and bottom tabs or navbar with logo and search and logout functionality
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, role } = useAuth();

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/music_bg_img.png';
    img.onload = () => setImageLoaded(true);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navBg = isDarkMode ? 'bg-black/70 border-white/10' : 'bg-white/70 border-black/10';

  const iconBaseStyle =
    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ring-1';

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 z-40 px-6 flex items-center justify-between border-b ${navBg} backdrop-blur-xl`}
      >
        <div className="flex items-center space-x-2">
          {imageLoaded && (
            <img
              src="/music_bg_img.png"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover grayscale contrast-125 shadow-md"
            />
          )}
          <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            MusicApp
          </h1>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t ${navBg} backdrop-blur-xl px-4 py-2`}
      >
        <div className="flex justify-between items-center max-w-md mx-auto space-x-4">
          {/* Home */}
          <button
            onClick={() => navigate('/')}
            className={`${iconBaseStyle} ${
              isActive('/')
                ? 'bg-purple-600 text-white ring-purple-400'
                : isDarkMode
                  ? 'bg-white/10 text-white ring-white/20 hover:bg-white/20'
                  : 'bg-black/10 text-black ring-black/10 hover:bg-black/20'
            }`}
            title="Home"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Explore */}
          <button
            onClick={() => navigate('/explore')}
            className={`${iconBaseStyle} ${
              isActive('/explore')
                ? 'bg-purple-600 text-white ring-purple-400'
                : isDarkMode
                  ? 'bg-white/10 text-white ring-white/20 hover:bg-white/20'
                  : 'bg-black/10 text-black ring-black/10 hover:bg-black/20'
            }`}
            title="Explore"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Role Indicator */}
          <div
            className={`${iconBaseStyle} font-bold uppercase text-xs ${
              role === 'admin'
                ? 'bg-gradient-to-br from-pink-600 to-purple-600 text-white ring-purple-400'
                : isDarkMode
                  ? 'bg-white/10 text-white ring-white/20'
                  : 'bg-black/10 text-black ring-black/10'
            }`}
            title={`Role: ${role}`}
          >
            {role.charAt(0)}
          </div>

          {/* Logout */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className={`${iconBaseStyle} bg-red-600 text-white hover:bg-red-700 ring-red-400 shadow-md`}
              title="Logout"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>

      {/* Page spacing */}
      <div className="pt-16 pb-20" />
    </>
  );
};

export default Header;
