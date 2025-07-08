import React from 'react';

interface CircularLoaderProps {
  size?: number; // diameter in pixels
  color?: string; // Tailwind color (e.g. 'text-purple-500')
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 40,
  color = 'text-purple-500',
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
      style={{ width: size, height: size }}
      role="status"
    />
  );
};

export default CircularLoader;
