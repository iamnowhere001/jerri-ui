/****************************************************************************
所属系统: 组件库
所属模块: 头像裁剪
创建时间: 2019年8月28日14:50:57
维护人: vivvn
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="j-pt-30 j-pl-30">
    <h2 class="j-pb-20">头像裁剪</h2>
    <jr-button @click="showBox(),isShowCircle=false">打开头像裁剪</jr-button>
    <jr-button class="j-ml-20"
               @click="showBox(),isShowCircle=true">打开显示圆形头像裁剪</jr-button>

    <jr-head-cut :visible.sync="isShow"
                 businessCode="DPC"
                 action="//192.168.99.219/"
                 :isShowCircle="isShowCircle"
                 @on-result="getResult" />
  </div>
</template>
<script>
export default {
  name: "headCutView",
  label: "头像裁剪操场",
  mixins: [],
  data() {
    return {
      isShow: false,
      isShowCircle: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    showBox() {
      this.isShow = true;
    },
    getResult(res) {
      console.log(res);
      this.isShow = false;
    }
  }
};
</script>
<style scoped lang="scss"></style>
