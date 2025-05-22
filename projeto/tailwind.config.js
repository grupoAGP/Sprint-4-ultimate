/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          highPriority: '#FF4C4C',
          mediumPriority: '#FFD700',
          lowPriority: '#4C6EFF',
          otherProblem: '#8E44AD',
          darkBackground: '#0f0f0f',
          darkCard: '#1c1c1c',
        },
      },
    },
    plugins: [],
  };