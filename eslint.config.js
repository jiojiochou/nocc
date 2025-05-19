import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export default [
  {
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
    ignores: [
      '/dist',
      '/node_modules',
      '/packages/**/dist',
      '/packages/**/node_modules',
      '/play**/dist',
      '/play**/node_modules',
    ],
  },
  require('eslint-config-prettier'),
];
