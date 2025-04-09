import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  ...eslint.configs.recommended,
  ...eslintConfigPrettier,
  ...pluginReact.configs.flat.recommended,
  tseslint.configs.recommended,
  {
    '@typescript-eslint/no-explicit-any': 'off', // any 사용 허용
  },
);