import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: globals.browser },
    ignores: ["**/node_modules/", ".dist/"],
    rules: {
      "no-undef": "error",
      "no-console": "warn",
      "prefer-const": "error",
      "no-unused-vars": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
