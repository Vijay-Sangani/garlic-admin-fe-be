import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import a11yPlugin from "eslint-plugin-jsx-a11y";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import securityPlugin from "eslint-plugin-security";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      ".next",
      "dist",
      "build",
      "coverage",
      "node_modules",
      "out",
      "**/*.config.{js,ts}",
      "**/*.d.ts",
      "next-env.d.ts",
    ],
  },

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      prettierConfig,
    ],

    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      "jsx-a11y": a11yPlugin,
      security: securityPlugin,
      perfectionist: perfectionistPlugin,
      "@next/next": nextPlugin,
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },

    rules: {
      /* ---------------- General ---------------- */
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-useless-concat": "error",
      "no-param-reassign": "error",
      "no-nested-ternary": "error",
      "no-throw-literal": "error",
      "object-shorthand": "error",
      "array-callback-return": "error",
      "no-duplicate-imports": "error",
      "arrow-body-style": ["error", "as-needed"],
      "@typescript-eslint/no-magic-numbers": "error",

      /* ---------------- Import Rules ---------------- */
      "import/default": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/namespace": ["error", { allowComputed: true }],
      "import/no-absolute-path": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      /* ---------------- TypeScript ---------------- */
      "@typescript-eslint/no-magic-numbers": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/prefer-as-const": "warn",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      /* ---------------- Naming Convention (Merged) ---------------- */
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
          filter: {
            regex:
              "^(bg-|text-|border-|shadow-|rounded-|w-|h-|p-|m-|translate-|scale-|rotate-|flex|grid|gap|justify-|items-|content-|overflow-|z-|duration-|delay-|ease-|transition|sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|disabled:|dark:|data-|aria-|pointer-events-|after:|opacity-|ml-|mr-|mt-|mb-|px-|py-|pl-|pr-|pt-|pb-|leading-|tracking-|font-|fixed|relative|absolute|inset-|top-|bottom-|left-|right-|backdrop-|\\[|\\]|#)",
            match: false,
          },
        },
        { selector: "variable", format: ["camelCase", "PascalCase"] },
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
        {
          selector: "variable",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "should", "has", "can", "did", "will", "show", "hide", "use", "does"],
        },
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "objectLiteralProperty",
          format: null,
          filter: {
            regex: "^(@|__)html$|^@context$|^@type$",
            match: true,
          },
        },
      ],

      "@typescript-eslint/member-ordering": [
        "warn",
        {
          default: { optionalityOrder: "required-first", order: "alphabetically" },
          classes: "never",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/explicit-function-return-type": "error",

      /* ---------------- React ---------------- */
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-fragments": "error",
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react/function-component-definition": ["error", { namedComponents: "arrow-function" }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* ---------------- Next.js ---------------- */
      "@next/next/no-img-element": "error",
      "@next/next/no-page-custom-font": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-title-in-document-head": "error",
      "@next/next/no-html-link-for-pages": "error",

      /* ---------------- Accessibility ---------------- */
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-role": "error",

      /* ---------------- Security ---------------- */
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-fs-filename": "error",

      /* ---------------- Code Structure ---------------- */
      complexity: ["error", 30],
      "max-depth": ["error", 3],
      "max-lines": ["error", { max: 300, skipComments: true }],
      "max-params": ["error", 3],
      "max-lines-per-function": ["error", { max: 200, skipBlankLines: true, skipComments: true }],

      "perfectionist/sort-jsx-props": ["error", { type: "alphabetical", order: "asc" }],
    },
  },

  {
    files: ["pages/api/**/*.{ts,js}", "app/api/**/*.{ts,js}"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off",
    },
  },

  {
    files: ["next.config.{js,ts}", "middleware.{js,ts}"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "import/no-default-export": "off",
    },
  }
);
