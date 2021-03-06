module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.{html,js'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark', 'light', 'winter', 'bumblebee'],
  },
};
