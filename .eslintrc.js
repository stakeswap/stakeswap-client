module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    project: ['tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    quotes: [1, 'single'],
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-param-reassign': 0,
    'no-unsafe-optional-chaining': 0,
    'import/prefer-default-export': 0,
    'no-alert': 0,
    'no-nested-ternary': 0,
    'no-bitwise': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
