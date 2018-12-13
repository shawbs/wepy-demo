module.exports = {
  root: true,
  globals: { wx: true },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0, //允许剪头函数单个参数不用括号
    // allow async-await
    // 'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'space-before-function-paren': 0,
    'camelcase': 0, //允许使用非驼峰命名变量
    'indent': [ 1, "tab"], //缩进间隔为1个tab
    'no-tabs': 0, //允许tab空格
    'eol-last': 0, //结尾不需要空行
    'no-eval': 0, //允许使用eval
    'one-var': 0, //允许多次使用var
  }
}
