// Reglas de ESLint: avisan de variables sin uso, imports rotos y errores comunes con los hooks de React.
// Se corre con `npm run revisar`.
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  // Lo compilado y los dos componentes de terceros (React Bits) no se revisan.
  { ignores: ['dist', '.ssr', 'node_modules', 'test-results', 'playwright-report', 'src/piezas/SplashCursor.jsx', 'src/piezas/GooeyNav.jsx'] },
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { react, 'react-hooks': reactHooks },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Los componentes no declaran sus props con PropTypes: la forma de los datos está en contenido/tipos.js.
      'react/prop-types': 'off',
      // React 18 todavía pide este atributo en minúscula.
      'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    // Scripts, configuración y pruebas corren en Node.
    files: ['scripts/**', 'pruebas/**', '*.config.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.node, ...globals.browser } },
  },
]
