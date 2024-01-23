module.exports = {
  rubyPlugins: "plugin/single_quotes,plugin/trailing_comma",
  plugins: [
    "@prettier/plugin-ruby",
    "prettier-plugin-react",
    "prettier-plugin-tailwindcss"
  ],
  trailingComma: "es5",
  arrowParens: "avoid",
  printWidth: 200,
  tabWidth: 2,
  semicolons: true,
  useTabs: false,
  semi: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  proseWrap: "always",
  endOfLine: "lf",
};