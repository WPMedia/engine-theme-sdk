module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  globals: {
    Fusion: 'readonly',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx', 'jest/*.js', '.storybook/**', 'stories/**'] }],
    'import/no-unresolved': [2, { ignore: ['react', '^fusion:.+$'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/static-property-placement': 'off',
  },
  settings: {
      'import/resolver': {
          node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
      },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
};
