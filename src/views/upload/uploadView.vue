/****************************************************************************

所属系统: 组件库
所属模块: 操场 - 回到顶部组件
创建时间: 2020年3月10日10:50:28
维护人: 陈泽光
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　         　　　　　　　　　　 │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/

<template>
  <div class="content">

    <h2 class="j-mb-20">上传组件</h2>

    <div class="left">
      <jr-button @click="handleUpload">点击上传</jr-button>

      <jr-upload accept=".xls,.doc,.txt,.pdf,.png,.mp4"
                 :isMany="true"
                 :maxLen="6"
                 :listNum="0"
                 :maxSize="200"
                 business-code="NS2"
                 :action="'//192.168.99.29:8200/'"
                 :re-upload-id='reUploadId'
                 ref="jrInput"
                 @add-file='getFile'
                 @file-progress='getProgress'
                 @upload-err="uploadError"
                 @file-result="getResult">
      </jr-upload>
    </div>

  </div>
</template>

<script>
export default {
  name: "uploadView",
  label: "上传组件操场",
  data() {
    return {
      reUploadId: ""
    };
  },
  methods: {
    handleUpload() {
      this.$refs.jrInput.upload();
    },
    getFile() {},
    getProgress(result) {
      console.info("文件上传进度", result.proess, result);
    },
    uploadError() {},
    getResult(result) {
      console.info("文件上传完成", result.fileUrl, result);
    }
  }
};
</script>

<style lang="scss">
.jr-back-to-top {
  width: 32px;
  height: 32px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 10;
  cursor: pointer;
  background-color: #000000;
  border-radius: 4px;
  opacity: 0.3;

  &:hover {
    background-color: #000000;
    border-radius: 4px;
    opacity: 0.5;
  }
  > i {
    &.icon-top-all {
      font-size: 32px;
      color: #fff;
    }
  }
}
</style>
