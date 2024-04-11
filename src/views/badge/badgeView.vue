
<template>
  <div class="content">
    <h2 class="j-mb-20">角标</h2>

    <div>
      <jr-badge :value="233" class="j-mr-40">
        <jr-button>默认最大值为99</jr-button>
      </jr-badge>

      <jr-badge value="hot" type="success" animation="fade" class="j-mr-40">
        <jr-button plain>配置动画</jr-button>
      </jr-badge>

      <jr-badge type="warn" value="dad">
        <jr-button>字符串角标没限制长度</jr-button>
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
};
</script>
