// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const globals = require('globals');

module.exports = defineConfig([
    expoConfig,
    eslintPluginPrettierRecommended,
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            curly: ['error', 'multi'],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\u0000'], // side effects — import './global.css'
                        ['^node:'], // node builtins
                        ['^@?\\w'], // external packages
                        ['^@/'], // internal alias
                        ['^\\.'], // relative
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
        },
    },
    {
        // Scripts de tooling rodam em Node puro (CommonJS), não no bundle do app.
        files: ['scripts/**/*.js'],
        languageOptions: {
            globals: globals.node,
        },
    },
    {
        ignores: ['dist/*', 'expo-env.d.ts', '.expo/*'],
    },
]);
