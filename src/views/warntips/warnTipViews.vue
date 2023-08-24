/****************************************************************************
所属系统: 组件库 所属模块: 操场 - 视频播放组件 创建时间: 2020年3月10日10:50:28
维护人: 陈泽光 *┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

<template>
  <div>
    <div>
      <label class="j-relative text">
        <strong>名称：</strong>
        <jr-input v-model="inputVal"></jr-input>
        <jr-warnTips
          v-show="isShowPop"
          left="50"
          top="5"
          width="100"
        ></jr-warnTips>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "jrWarnTipViews",
  label: "必填项提示组件",
  data() {
    return {
      isShowPop: true,
      inputVal: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.text {
  width: 300px;
  display: inline-block;
  /deep/ .jr-input {
    width: calc(100% - 44px);
  }
}
</style>
