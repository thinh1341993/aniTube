// eslint.config.js
const js = require('@eslint/js');
const prettierPlugin = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const reactNativePlugin = require('eslint-plugin-react-native');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  // Sử dụng cấu hình mặc định của ESLint
  js.configs.recommended,

  // Cấu hình TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: babelParser,
    },
  },

  // Plugin React Native
  {
    plugins: {
      'react-native': reactNativePlugin,
    },
    rules: {
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
    },
  },

  // Plugin Import
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-duplicates': 'warn',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },

  // Plugin Prettier
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Vô hiệu hóa các quy tắc xung đột với Prettier
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];
