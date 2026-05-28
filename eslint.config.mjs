import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import js from '@eslint/js';
import reactCompiler from 'eslint-plugin-react-compiler';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['webpack.config.js', 'babel.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-compiler/react-compiler': 'warn',
    },
  },
  prettierRecommended,
];
