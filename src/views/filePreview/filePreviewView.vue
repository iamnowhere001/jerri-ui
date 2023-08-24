<!--
/**************************************************************************** 
所属系统: 组件库
所属模块: 预览文件组件操场
创建时间: 2020年07月25日 16:47:54
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <jr-container>
    <jr-button class="j-mr-10" @click="openPreview(false)"
      >打开弹窗预览</jr-button
    >
    <jr-button @click="openPreview(true)"
      >整个页面预览(无法关闭 需要关闭请刷新)</jr-button
    >
    <!-- 文件预览组件 -->
    <jr-file-preview
      :action="action"
      :visible.sync="visible"
      :fileList="fileList"
      :fileIndex="fileIndex"
      @del-file="delFile"
      :fullPage="fullPage"
    ></jr-file-preview>
  </jr-container>
</template>
<script>
export default {
  name: "filePreviewView",
  label: "文件预览操场",
  components: {},
  mixins: [],
  data() {
    return {
      // 预览路径
      action: "//192.168.99.29:8200/",
      visible: false,
      fullPage: false,
      fileIndex: 4,
      fileList: [
        {
          fileName: "视频",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/6c976aafbe0d478e0f48cc249aeaf36e/03000801005D9FF6B818403003E8808101508D-617C-4396-BE3B-5D0053D19AFA.mov",
        },

        {
          fileName: "datu",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com//ns/cb183e47c0780c4c0a3de02fa7ef7208/2020.6.30 杨梅红线上画院网站-帮助中心.jpg",
        },
        {
          fileName: "用户体验组工作日志-姚敏-20200611",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/7fb34bd5d9eeffbdf59aafe2835c4324/%e6%b5%8b%e8%af%95docx.docx",
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
          fileName: "竖着的视频",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/d694fbfee2e71affe28d1f4070547070/f7.mov",
        },
        {
          fileName: "播放音频拉",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ymmad/829469da82d4f29ccda8a1c6033a550b/rec-5106ms-16kbps-16000hz.mp3",
        },

        // 多余
        {
          fileName: "用户体验组工作日志-姚敏-20200611",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/7fb34bd5d9eeffbdf59aafe2835c4324/%e6%b5%8b%e8%af%95docx.docx",
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
          fileName: "视频",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns2/6c976aafbe0d478e0f48cc249aeaf36e/03000801005D9FF6B818403003E8808101508D-617C-4396-BE3B-5D0053D19AFA.mov",
        },
        {
          fileName: "用户体验组工作日志-姚敏-20200611",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/7fb34bd5d9eeffbdf59aafe2835c4324/%e6%b5%8b%e8%af%95docx.docx",
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
          fileName: "用户体验组工作日志-姚敏-20200611",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/7fb34bd5d9eeffbdf59aafe2835c4324/%e6%b5%8b%e8%af%95docx.docx",
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
          fileName: "用户体验组工作日志-姚敏-20200611",
          url:
            "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/ns/7fb34bd5d9eeffbdf59aafe2835c4324/%e6%b5%8b%e8%af%95docx.docx",
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
  created() {},
  methods: {
    delFile(i) {
      console.log(i);
    },
    openPreview(full) {
      this.fullPage = full;
      this.visible = true;
    },
  },
};
</script>
<style scoped lang="scss"></style>
