
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
