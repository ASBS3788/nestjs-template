// @ts-check

import globals from 'globals'
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import jestPlugin from 'eslint-plugin-jest'

export default defineConfig([
    // Глобальное игнорирование
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', 'eslint.config.mjs'],
    },

    // Настройки JS
    {
        files: ['**/*.js'],

        extends: [js.configs.recommended, tseslint.configs.disableTypeChecked],

        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
        },
    },

    // Настройки TS
    {
        files: ['**/*.ts'],

        extends: [js.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked],

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
            },
        },

        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
        },
    },

    // Jest тесты
    {
        files: ['**/*.{test,spec}.{ts,js}', 'test/**/*.{ts,js}'],

        ...jestPlugin.configs['flat/recommended'],

        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    },

    // Prettier всегда последним
    eslintPluginPrettierRecommended,
])
