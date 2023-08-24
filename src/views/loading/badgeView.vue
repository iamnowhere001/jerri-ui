/****************************************************************************

所属系统: 组件库
所属模块: 操场 - 按钮组件
创建时间: 2020年3月10日10:50:28
维护人: 陈泽光
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　         　　　　　　　　　　 │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/

<template>
  <div class="j-container">
    <div class="j-pt-50">
      <jr-button @click="handleLoadingStep()">全局loading</jr-button>
      <jr-button class="j-ml-40"
                 @click="handleLoadingStep(true)">全局白屏loading</jr-button>
      <jr-button @click="visible = !visible"
                 type="plain"
                 class="j-ml-40">局部loading</jr-button>
      <div>
        <jr-loading-petal :visible="visible"></jr-loading-petal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loadingView",
  label: "loading",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleLoadingStep(whiteMask) {
      this.$loading(true, whiteMask);
      // 测试开启的时候连续调用会不会影响到白屏的效果
      this.$loading();
      this.$loading();
      this.$loading();
      setTimeout(() => {
        this.$loading(false);
      }, 2000);
    },

    handleLoadingPetal() {}
  }
};
</script>
