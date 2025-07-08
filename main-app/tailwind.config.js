/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Enable toggling via class (like 'dark')
  theme: {
    extend: {
      colors: {
        // Neutral UI Colors
        background: '#f9fafb',
        foreground: '#111827',
        card: '#ffffff',
        'card-foreground': '#1f2937',

        // Primary Colors
        primary: '#2563eb', // Blue-600
        'primary-foreground': '#ffffff',

        // Secondary Colors
        secondary: '#6b7280', // Gray-500
        'secondary-foreground': '#ffffff',

        // Muted
        muted: '#e5e7eb',
        'muted-foreground': '#6b7280',

        // Accent
        accent: '#10b981', // Emerald
        'accent-foreground': '#ffffff',

        // Destructive
        destructive: '#ef4444', // Red-500
        'destructive-foreground': '#ffffff',

        // Borders, Inputs, Rings
        border: '#e5e7eb',
        input: '#f3f4f6',
        ring: '#3b82f6',

        // Chart Colors
        'chart-1': '#4CAF50',   // Green
        'chart-2': '#2196F3',   // Blue
        'chart-3': '#9C27B0',   // Purple
        'chart-4': '#F44336',   // Red
        'chart-5': '#FF9800',   // Orange
      },
    },
  },
  plugins: [],
};
