module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
    jest_globals: true
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "prettier", "import", "react-hooks", "cypress", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:json/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    // 'prettier/@typescript-eslint',
    "eslint:recommended",
    "prettier",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    // Makes logger function available everywhere. Else eslint will complaint of undef-var.
    logger: true,
    module: true,
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "react/display-name": "off",
    // not-auto-fixable: Prevent missing props validation in a React component definition.
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    // not-auto-fixable: Detect unescaped HTML entities, which might represent malformed tags.
    "react/no-unescaped-entities": "off",
    // not-auto-fixable: Prevent missing displayName in a React component definition. Useful when using React extensions in browser and checking for component name.
    // not-auto-fixable: Reports when this.state is accessed within setState.
    "react/no-access-state-in-setstate": "error",
    // not-auto-fixable: Prevent usage of dangerous JSX props.
    "react/no-danger": "error",
    // not-auto-fixable: Report when a DOM element is using both children and dangerouslySetInnerHTML.
    "react/no-danger-with-children": "error",
    // not-auto-fixable: Prevent definitions of unused prop types.
    "react/no-unused-prop-types": "error",
    // not-auto-fixable: Report missing key props in iterators/collection literals. Important rule!
    "react/jsx-key": "error",
    // not-auto-fixable: Enforce no duplicate props.
    "react/jsx-no-duplicate-props": "error",
    // not-auto-fixable: Disallow undeclared variables in JSX.
    "react/jsx-no-undef": "error",
    // not-auto-fixable: Enforce PascalCase for user-defined JSX components.
    "react/jsx-pascal-case": ["error", { allowNamespace: true }],
    // not-auto-fixable: Prevent variables used in JSX to be marked as unused.
    "react/jsx-uses-vars": "error",
    // not-auto-fixable: Ensures https://reactjs.org/docs/hooks-rules.html.
    "react-hooks/rules-of-hooks": "error",
    // not-auto-fixable: Ensures https://reactjs.org/docs/hooks-rules.html - Checks effect dependencies.
    "react-hooks/exhaustive-deps": "off",
    // not-auto-fixable: Prefer a default export if module exports a single name.
    "import/prefer-default-export": "off",
    // not-auto-fixable: Forbid a module from importing a module with a dependency path back to itself.
    "import/no-cycle": ["error", { maxDepth: 1, ignoreExternal: true }],
    // not-auto-fixable: Prevent unnecessary path segments in import and require statements.
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    // not-auto-fixable: Report any invalid exports, i.e. re-export of the same name.
    "import/export": "error",
    // not-auto-fixable: Forbid the use of mutable exports with var or let.
    "import/no-mutable-exports": "error",
    // not-auto-fixable: Ensure all imports appear before other statements.
    "import/first": "error",
    // not-auto-fixable: Ensure all exports appear after other statements.
    "import/exports-last": "error",
    // auto-fixable: Enforce a newline after import statements.
    "import/newline-after-import": ["error", { count: 1 }],
    // auto-fixable: Respect all Prettier rules and apply it.
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module", // allow the use of imports statements
    ecmaVersion: 2020, // allow the parsing of modern ecmascript
  },
};
