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
        darkGray: '#525252',
        green: 'rgba(78, 150, 78, 0.6)',
        orange: 'rgba(255, 144, 9, 0.6)',
        lightOrange: 'rgba(255, 144, 9, 0.3)',
        blue: 'rgba(94, 186, 204, 0.6)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
