/****************************************************************************

所属系统: 组件库
所属模块: 组件 - 消息提示组件


***************************************************************************/

<template>
  <div class="content">

    <h2 class="j-mb-20">消息提示组件</h2>

    <!-- 常规按钮高度 -->
    <div class="left">
      <p class="nav">常规提示</p>
      <jr-button @click="tips(1)">提示</jr-button>

      <p class="nav">位置</p>
      <jr-button @click="tips(2)">顶部显示</jr-button>

      <p class="nav">类型</p>
      <jr-button @click="tips(3)"
                 type="plain">警示</jr-button>
      <jr-button @click="tips(4)"
                 class="j-ml-10"
                 type="plain">提示</jr-button>

    </div>
  </div>
</template>

<script>
export default {
  name: "messageView",
  label: "message消息提示",
  methods: {
    tips(type) {
      switch (type) {
        case 1:
          this.$msg("提交成功");
          break;
        case 2:
          this.$msg("提交成功", 1500, () => {}, {
            align: "top"
          });
          break;
        case 3:
          this.$msg("非法提交", 1500, () => {}, {
            color: "dange"
          });
          break;
        case 4:
          this.$msg("自动保存成功", 1500, () => {}, {
            color: "warn"
          });
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.content {
  padding: 20px 50px;
}
</style>
