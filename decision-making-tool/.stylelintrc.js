module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  defaultSeverity: 'warning',
  rules: {
    'max-nesting-depth': [
      1,
      {
        ignore: ['pseudo-classes']
      }
    ]
  }
};
