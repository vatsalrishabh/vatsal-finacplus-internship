import React, { useState, useEffect } from "react";
import SongLibrary from "./components/SongLibrary.tsx";
import "./styles/global.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      setIsLoading(false);
    } catch (err) {
      console.error('Error in initialization:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white animate-pulse">
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-red-50 dark:bg-gray-900">
        <h2 className="text-2xl text-red-600 font-bold mb-4">Error loading application</h2>
        <pre className="bg-white dark:bg-gray-800 p-4 rounded shadow-md text-sm text-red-800 dark:text-red-300">
          {error}
        </pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-background/60 dark:from-black dark:via-gray-900 dark:to-gray-800 text-foreground transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent animate-text-glow">
            🎵 Music Library
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-md focus:outline-none ${
              darkMode
                ? 'bg-gradient-to-br from-purple-700 to-purple-900 shadow-purple-500/40'
                : 'bg-gradient-to-br from-gray-200 to-gray-300 shadow-gray-500/30'
            }`}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>

        <SongLibrary />
      </div>

      <style>
        {`
          @keyframes text-glow {
            0%, 100% { text-shadow: 0 0 10px rgba(236, 72, 153, 0.5); }
            50% { text-shadow: 0 0 20px rgba(236, 72, 153, 0.8); }
          }
          .animate-text-glow {
            animation: text-glow 2.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default App;
