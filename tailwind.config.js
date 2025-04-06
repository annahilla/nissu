/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        beige: '#E9E8DF',
        brown: '#A68F75',
        green: '#4E964E',
        orange: '#FF9009',
        blue: '#5EBACC',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
