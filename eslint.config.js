import { createRequire } from 'node:module';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';

// const require = createRequire(import.meta.url);

export default [
  {
    plugins: {
      // prettier: require('eslint-plugin-prettier'),
    },
    ignores: ['dist', 'node_modules'],
    rules: {
      'no-console': 'warn',
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
  // require('eslint-config-prettier'),
  eslintPluginPrettierRecommended,
];
