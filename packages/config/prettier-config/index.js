/* eslint-env node */

module.exports = {
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  arrowParens: 'always',
  bracketSpacing: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@apestaartje/(.*)$',
    '^../(.*)$',
    '^./(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
