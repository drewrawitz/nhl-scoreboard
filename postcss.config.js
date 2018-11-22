module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: { browsers: ['> 5%'] },
    'postcss-inline-svg': {
      path: 'assets/svg/'
    },
    'postcss-responsive-type': {},
    'postcss-simple-vars': {},
    'postcss-calc': {},
    'postcss-custom-media': {},
    'postcss-hexrgba': {},
    'postcss-pxtorem': {
      unitPrecision: 4,
      propWhiteList: [],
      replace: true
    },
    'postcss-apply': {},
    'postcss-nested': {}
  }
};
