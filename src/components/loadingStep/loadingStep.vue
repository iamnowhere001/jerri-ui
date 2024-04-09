/****************************************************************************
所属系统: 组件库
所属模块: 省略号loading
创建时间: 2020-01-02
***************************************************************************/
<template>
  <!-- 全局load -->
  <div class="j-mask"
       :class="{'white-mask':whiteMask}"
       id="loading">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  // 点点点
  name: "JrLoadStep"
};
</script>

<style lang="scss" scoped>
@import "loadingStep.scss";
</style>
