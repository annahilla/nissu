module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
      },
    ],
    'no-tabs': 'off',
    indent: ['error', 2],
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
};
