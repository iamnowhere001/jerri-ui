/****************************************************************************
所属系统: 组件库
所属模块: 组件—全屏预览
创建时间: 2020年09月08日 10:10
***************************************************************************/
<template>
  <div class="content">
    <h2 class="j-mb-20">1</h2>
    <!-- 文件预览组件 -->
    <jr-full-preview
      :visible.sync="visible"
      :fileList="fileList"
      :fileIndex="fileIndex"
    ></jr-full-preview>
  </div>
</template>

<script>
export default {
  name: "fullPreviewView",
  label: "全屏预览",
  data() {
    return {
      visible: false,
      fileIndex: 0,
      fileList: [
        {
          fileName: "datu",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com//ns/cb183e47c0780c4c0a3de02fa7ef7208/2020.6.30 杨梅红线上画院网站-帮助中心.jpg",
        },
        {
          fileName: "嘻嘻",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/810d3c7f3cce3fe9aa34db88c0ec8080/6dc1761ed21b0ef4b9c0ffecd0c451da81cb3e5f233.jpg",
        },
        {
          fileName: "测试图片",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
        {
          fileName: "嘻嘻",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/810d3c7f3cce3fe9aa34db88c0ec8080/6dc1761ed21b0ef4b9c0ffecd0c451da81cb3e5f.jpg",
        },
        {
          fileName: "测试图片",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
        {
          fileName: "嘻嘻",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/810d3c7f3cce3fe9aa34db88c0ec8080/6dc1761ed21b0ef4b9c0ffecd0c451da81cb3e5f.jpg",
        },
        {
          fileName: "测试图片",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
        {
          fileName: "嘻嘻",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/810d3c7f3cce3fe9aa34db88c0ec8080/6dc1761ed21b0ef4b9c0ffecd0c451da81cb3e5f.jpg",
        },
        {
          fileName: "测试图片",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
        {
          fileName: "嘻嘻",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/810d3c7f3cce3fe9aa34db88c0ec8080/6dc1761ed21b0ef4b9c0ffecd0c451da81cb3e5f.jpg",
        },
        {
          fileName: "测试图片",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/b2b457fa910cf93545cc439ecbed3132/dea85a1082a543e5b1132df4d78036d1.jpg",
        },
      ],
    };
  },
  created() {
    setTimeout(() => {
      this.visible = true;
    }, 500);
  },
};
</script>
