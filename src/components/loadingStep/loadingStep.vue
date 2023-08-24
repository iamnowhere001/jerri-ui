/****************************************************************************

所属系统: 组件库
所属模块: 省略号loading
创建时间: 2020-01-02
维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
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
