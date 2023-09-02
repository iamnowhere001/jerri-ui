module.exports = {
  types: [
    { value: "🎉 init", name: "🎉 init: 项目初始化" },
    { value: "✨ feat", name: "✨ feat:添加新特性" },
    { value: "🐞 fix", name: "🐞 fix: 修复bug" },
    { value: "📃 docs", name: "📃 docs: 仅仅修改文档" },
    {
      value: "🌈 style",
      name: "🌈 style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑",
    },
    {
      value: "🦄 refactor",
      name: "🦄 refactor: 代码重构，没有加新功能或者修复bug",
    },
    { value: "🎈 perf", name: "🎈 perf: 优化相关、比如提升性能、体验" },
    { value: "🧪 test", name: "🧪 test: 增加测试用例" },
    { value: "🔧 build", name: "🔧 build: 依赖相关的内容" },
    {
      value: "🐎 ci",
      name: "🐎 ci: ci配置相关 例如对k8s，docker的配置文件的修改",
    },
    {
      value: "🐳 chore",
      name: "🐳 chore: 改变构建流程、或者增加依赖库、工具等",
    },
    { value: "↩ revert", name: "↩ revert: 回滚到上一个版本" },
  ],
  messages: {
    type: "请选择提交类型(必填)",
    customScope: "请输入文件修改范围(可选)",
    subject: "请简要描述提交(必填)",
    body: "请输入详细描述(可选)",
    breaking: "列出任何BREAKING CHANGES(可选)",
    footer: "请输入要关闭的issue(可选)",
    confirmCommit: "确定提交此说明吗？",
  },
  allowCustomScopes: true,
  // 跳过问题
  // skipQuestions: ["body", "footer"],
  subjectLimit: 72,
};
