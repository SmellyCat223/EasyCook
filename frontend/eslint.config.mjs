// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
// import { fixupConfigRules } from "@eslint/compat";


// export default [
//   {languageOptions: { globals: globals.node }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   ...fixupConfigRules(pluginReactConfig),
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "no-console": "warn",
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
  },
  globals: globals.node,
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    ...fixupConfigRules(pluginReactConfig),
  ],
};