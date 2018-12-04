module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  plugins: ['chai-friendly'],
  overrides: [{
    files: '*.test.js',
    rules: {
      'no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'error',
    },
  }],
  rules: {
    'object-curly-spacing': ['error', 'never'],
    'object-curly-newline': ['error', {
      ObjectExpression: {minProperties: 5, multiline: true, consistent: true},
      ObjectPattern: {minProperties: 5, multiline: true, consistent: true},
      ImportDeclaration: {minProperties: 5, multiline: true, consistent: true},
      ExportDeclaration: {minProperties: 5, multiline: true, consistent: true},
    }],
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }],
    'prefer-const': ['error', {destructuring: 'all'}],
    'operator-linebreak': ['error', 'before', {overrides: {'+': 'after'}}],
    'consistent-return': 'off',
    'nonblock-statement-body-position': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    curly: 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'no-multi-assign': 'off',
    'no-confusing-arrow': 'off',
    'lines-between-class-members': 'off',
  },
};
