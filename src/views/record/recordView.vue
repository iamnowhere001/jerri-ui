/****************************************************************************

所属系统: 组件库
所属模块: 录音组件
创建时间: 2020年5月13日 14:30:21

***************************************************************************/
<template>
  <div class="j-pt-30 j-pl-30">
    <jr-record businessCode="DPC"
               action="//192.168.99.29:8200/"
               ref="record"
               @upload-complate="complate"></jr-record>
    <jr-button class="j-pl-15"
               @click="save">保存</jr-button>

    <div class="j-pt-50">
      <jr-record businessCode="DPC"
                 action="//192.168.99.29:8200/"
                 :url="url"></jr-record>
      <jr-button class="j-pl-15"
                 @click="install">插入语言</jr-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "recordView",
  label: "录音",
  data() {
    return {
      url: ""
    };
  },
  methods: {
    save() {
      this.$refs.record.uploadRecord();
    },
    complate(file) {
      // 文件上传完成 去做自己的事情吧
      console.log(file);
    },
    install() {
      this.url =
        "http://jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/dpc/382909695b08d5bc1b2e6636de78e8e9/ab09d1536e1be.mp3";
    }
  }
};
</script>
