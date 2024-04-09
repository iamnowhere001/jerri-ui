/****************************************************************************
所属系统: 组件库 
所属模块: 组件 - 视频播放组件 

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
  label: "必填项提示",
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
