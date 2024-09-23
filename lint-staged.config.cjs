module.exports = {
  '*.{js,jsx,ts,tsx,cjs}': [
    'eslint --cache --fix --report-unused-disable-directives --max-warnings=0',
    () => 'pnpm run checkTypes',
  ],
};
