module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  variants: {
    scrollbar: ['rounded'], 
  },
  theme: {
    extend: {
      screens: {
        '982px': '982px',
        '890px': '890px', 
        'max-890': { 'max': '890px' },  
        'max-530': { 'max': '530px' },
        'xsm': '590px',
        '405px': '405px', 
        '530px': '530px', 
        '441px': '441px', 
        '640px': '640px', 
        '425px': '425px', 
        'max440': { 'max': '440px' }, 
        '387px': '387px', 
        'max386': { 'max': '386px' },
      },



      transitionProperty: {
        'box-shadow': 'box-shadow',
      },
    },
  },
  plugins: [  require('tailwind-scrollbar'),],
};
