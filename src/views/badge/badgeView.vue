/****************************************************************************
所属系统: 组件库 
所属模块: 组件 - 角标组件 


***************************************************************************/

<template>
  <div class="content">
    <h2 class="j-mb-20">角标组件</h2>
    
    <div>
      <jr-badge :value="233" class="j-mr-40">
        <jr-button>红色角标默认最大值为99</jr-button>
      </jr-badge>

      <jr-badge value="hot" type="success" animation="fade" class="j-mr-40">
        <jr-button plain>绿色角标配置动画</jr-button>
      </jr-badge>

      <jr-badge type="warn" value="dad">
        <jr-button>橙色角标,字符串角标没限制长度</jr-button>
      </jr-badge>
    </div>

    <div class="j-mt-20">
      <jr-badge :is-dot="true">
        <span>红圆点角标：</span>
        <i class="icon-inbox-tab j-icon"></i>
      </jr-badge>
      <!-- 扩散效果 -->
      <jr-badge :is-dot="true" animation="diffusion" class="j-ml-40 j-mr-40">
        <span>波纹红圆点角标：</span>
        <i class="icon-inbox-tab j-icon"></i>
      </jr-badge>
      <!-- 淡入淡出 -->
      <jr-badge :is-dot="true" animation="fade">
        <span>动画效果红圆点角标：</span>
        <i class="icon-inbox-tab j-icon"></i>
      </jr-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: "badgeView",
  label: "角标",
  created() {},
  mounted() {
    // console.log(123, this.$utils.isArray([1, 2, 4]));
  },
  methods: {
    deleteBtn() {
      console.log("删除");
    },
  },
};
</script>
