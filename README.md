# jerri-ui

> 杰人软件前端组件库

## 运行项目

``` bash
# 安装依赖
npm install

# 切换到主线程项目
npm run serve
```

## 构建

```bash
npm run lib:build
```

## 项目结构

```
├── lib                                npm发布后组件库导出文件夹
├── dist                               打包生成的静态资源文件，用于生产部署
├── node-modules                       依赖文件夹
├── public                             静态资源文件
├── tests                              单元测试
|
├── src                                应用逻辑代码
│    │— assets                         资源文件
│    │   │— constants                  常量
│    │   └─ images                     图片
│    │
│    │— components                     组件库组件
│    │— directives                     指令
│    │— filters                        过滤器
│    │— mixins                         混入
│    │— router                         vue-router
│    │— store                          vuex
│    │— themes                         样式风格
│    │— utils                          工具方法
│    │— views                          操场页面
│    │— App.vue                        根组件
│    └─ main.js                        应用入口文件, 初始化vue实例并使用需要的插件
│
└── package.json                       项目描述文件
```
