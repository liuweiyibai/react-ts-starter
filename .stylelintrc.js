module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-less', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    // 校验规则略
    'at-rule-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
