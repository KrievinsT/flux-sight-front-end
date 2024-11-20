module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  variants: {
    scrollbar: ['rounded'], // Optional for rounded scrollbar styles
  },
  theme: {
    extend: {
      transitionProperty: {
        'box-shadow': 'box-shadow',
      },
    },
  },
  plugins: [  require('tailwind-scrollbar'),],
};
