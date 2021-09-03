# 环境配置

## 重新定义 webpack 配置

```bash
# 写入环境变量命令工具
yarn add dotenv-cli --dev
yarn add react-app-rewired  customize-cra--dev
```

## 提交代码

```bash
yarn lint --fix
yarn lint:style --fix

# 建议提交代码前先运行上面命令

git add ./
git commit # 此时自动进入lint校验，校验通过后输入commit信息
```

## commit 常用的 type 类别

- upd：更新某功能（不是 feat, 不是 fix）
- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

## 禁用

```js
/* stylelint-disable */
// 当遇见无解 css 代码块lint校验不通过

// @ts-ignore
// 当遇见无解ts问题

// eslint 禁用，直接参考文档
// https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments

// prettier 忽略格式化，参考文档
// https://prettier.io/docs/en/ignore.html
```

## stylelint 参考

[stylelint 配置使用，自动修复 css，书写顺序](https://juejin.cn/post/6940127032932040735#heading-6)

[stylelint 插件：css、less、scss 语法校验说明](https://ask.dcloud.net.cn/article/36067)

## svg 导入方案

[react-scripts](https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/package.json)

```bash
# react-scripts 中已经内置

yarn add @svgr/webpack --dev
```
