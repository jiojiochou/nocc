import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['/dist', '/node_modules', '/packages/**/dist', '/packages/**/node_modules'],
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-unused-vars': ['warn'],
    'no-console': 'warn',
  },
})
