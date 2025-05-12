export default [
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
    ignores: ['/dist', '/node_modules', '/packages/**/dist', '/packages/**/node_modules', '/play**/dist', '/play**/node_modules'],
  },
]
