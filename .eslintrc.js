/** @type {import('eslint').Linter.Config} */
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json',
        tsconfigRootDir: './',
        sourceType: 'module'
    },
    settings: {
        react: {
            pragma: 'React',
            version: '16.14.0'
        },
        'import/resolver': {
            typescript: {}
        },
        linkComponents: [
            { name: 'Link', linkAttribute: 'to' },
            { name: 'NavLink', linkAttribute: 'to' }
        ]
    },
    env: {
        browser: true,
        es2020: true
    },
    plugins: ['react', 'react-hooks', 'prettier', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest-dom/recommended'
    ],
    rules: {
        eqeqeq: 'error',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/prop-types': 0,
        'react/display-name': 0,
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        'no-use-before-define': 0,
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
};
