module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "prettier", // 新增
    "./.eslintrc-auto-import.json", // 新增
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: {
      js: "espree",
      ts: "@typescript-eslint/parser",
      "<template>": "espree",
    },
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "vue",
    "prettier", // 新增
  ],
  rules: {
    "prettier/prettier": "error", // 新增
    "vue/no-unused-components": "warn", // 检查未使用的组件
    "vue/no-unused-vars": "error", // 检查未使用的变量
    "vue/html-indent": ["error", 2], // HTML 缩进
    "vue/multi-word-component-names": "off",
    "vue/no-useless-template-attributes": "off",
    // Vue属性排序
    "vue/attributes-order": "warn",

    // ESLint 核心规则
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境中禁止使用 console
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境中禁止使用 debugger
    indent: ["error", 2], // 代码缩进
    "linebreak-style": ["error", "unix"], // 行尾风格
    quotes: ["error", "double"], // 引号风格
    semi: ["error", "always"], // 分号使用

    // TypeScript 插件规则
    "@typescript-eslint/explicit-module-boundary-types": "off", // 关闭显式模块边界类型要求
    "@typescript-eslint/no-explicit-any": "off", // 关闭对 any 类型的警告
    "@typescript-eslint/no-var-requires": "off", // 关闭对 require 的警告
    "@typescript-eslint/no-empty-function": "off", // 关闭对空函数的警告
    // strict
    // HTML 白空间敏感性
    "vue/html-whitespace-sensitivity": "0",

    // 允许更长的行
    "max-len": ["warn", { code: 120 }],
  },
};
