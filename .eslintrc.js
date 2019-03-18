module.exports = {
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'parser': 'babel-eslint',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  rules: {
   

    'no-useless-escape': 'off',

    'indent': 'off', // 空格2个

    'vue/script-indent': ['error', 2, {
      'baseIndent': 1
    }],

    'space-before-function-paren': 'error',

    'vue/max-attributes-per-line': 'off',

    'vue/require-prop-types': 'off',

    'no-control-regex': 'off'
  }
}
