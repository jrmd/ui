import tseslint from "typescript-eslint";
export default tseslint.config(
  {
    ignores: [
      "**/.next/**",
      "**/.next-*/**",
      "**/node_modules/**",
      "**/public/**",
      "**/generated/**",
      "**/dist/**",
      "fixtures/**",
      "templates/**",
      "**/next-env.d.ts",
      "playwright-report/**",
      "test-results/**",
      ".impeccable/**",
    ],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
