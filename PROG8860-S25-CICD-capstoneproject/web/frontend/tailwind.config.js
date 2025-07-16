/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Add paths to your template files here
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grid-white': "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-size': '40px 40px',
      },
    },
  },
  plugins: [],
};
