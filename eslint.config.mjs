import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import globals from 'globals';
import * as pluginReactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...eslint.configs.recommended,
  ...eslintConfigPrettier,
  ...pluginReact.configs.flat.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    }
  },
  {
    plugins: {
      'react-hooks': pluginReact.hooks,
    },
    settings: { react : { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Next.js 사용 시 React import 필요 없음
    }
  },
  {
    '@typescript-eslint/no-explicit-any': 'off', // any 사용 허용
  },
);