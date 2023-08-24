/****************************************************************************

所属系统:
所属模块: 模块—[子模块]
创建时间:
维护人: 叶志
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="j-container">
    <jr-head title='表格文件上传'></jr-head>
    <div class="file-box">
      <jr-table-file-upload v-model="fileList"
                            action='//192.168.99.29:8200/'
                            businessCode="NS2"
                            :isFileNameEdit='true'></jr-table-file-upload>
    </div>
  </div>
</template>
<script>
export default {
  name: "tableFileUploadView",
  label: "表格文件上传",
  components: {},
  mixins: [],
  data() {
    return {
      fileList: []
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang='scss'>
.file-box {
  width: 1200px;
  margin: 0 auto;
}
</style>
