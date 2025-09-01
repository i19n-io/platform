import js from '@eslint/js'
import * as pluginQuasar from '@quasar/app-vite/eslint'
import tsParser from '@typescript-eslint/parser'
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import consistentDefaultExportName from 'eslint-plugin-consistent-default-export-name'
import { importX } from 'eslint-plugin-import-x'
import nodeImport from 'eslint-plugin-node-import'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default defineConfigWithVueTs(
  {
    ignores: ['eslint.config.ts', 'src/core/graphql'],
  },
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended() already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    // ignores: []
  },

  pluginQuasar.configs.recommended(),
  js.configs.recommended,

  /**
   * https://eslint.vuejs.org
   *
   * pluginVue.configs.base
   *   -> Settings and rules to enable correct ESLint parsing.
   * pluginVue.configs[ 'flat/essential']
   *   -> base, plus rules to prevent errors or unintended behavior.
   * pluginVue.configs["flat/strongly-recommended"]
   *   -> Above, plus rules to considerably improve code readability and/or dev experience.
   * pluginVue.configs["flat/recommended"]
   *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
   */
  pluginVue.configs['flat/recommended'],

  pluginUnicorn.configs.all,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,

  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: { parser: tsParser },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ project: '<root>/tsconfig.json' }),
      ],
    },
    plugins: {
      'node-import': nodeImport,
      'consistent-default-export-name': consistentDefaultExportName,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      'node-import/prefer-node-protocol': 'error',
      'consistent-default-export-name/default-export-match-filename': [
        'error',
        'kebab',
      ],
      'consistent-default-export-name/default-import-match-filename': 'error',

      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always',
          'pathGroups': [
            {
              pattern: '~/+(core|shared)/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '~/e2e/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '~/**',
              group: 'external',
              position: 'after',
            },
          ],
        },
      ],
    },
  },

  // https://github.com/vuejs/eslint-config-typescript
  vueTsConfigs.strictTypeChecked,
  vueTsConfigs.stylisticTypeChecked,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly', // BEX related
      },
    },

    // add your custom rules here
    rules: {
      'prefer-promise-reject-errors': 'off',

      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      // https://github.com/sindresorhus/eslint-plugin-unicorn#rules
      'unicorn/import-style': [
        'error',
        {
          styles: {
            'node:path': {
              default: false,
              named: true,
            },
            'path': {
              default: false,
              named: true,
            },
          },
        },
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            env: false,
            props: false,
          },
        },
      ],

      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: true },
      ],
    },
  },

  {
    files: ['src-pwa/custom-service-worker.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },

  prettierSkipFormatting,
)
