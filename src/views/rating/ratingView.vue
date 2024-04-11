/****************************************************************************
所属系统: 组件库
所属模块: 评级组件
创建时间: 2019年7月11日 11:42:28
***************************************************************************/
<template>
  <div class="j-pt-30 j-pl-30">
    <h2 class="j-pb-30">没等级描述</h2>
    <div class="box j-pb-30">
      <jr-rating v-model="star"></jr-rating>
    </div>
    <h2 class="j-pb-30">有等级描述</h2>
    <div class="box j-pb-30">
      <jr-rating v-model="star1"
                 :levelDesc='["不再考虑", "不重要", "一般", "重要", "非常重要"]'></jr-rating>
    </div>
  </div>
</template>
<script>
export default {
  name: "ratingView",
  label: "评级",
  data() {
    return {
      star: 0,
      star1: 2
    };
  },

  watch: {
    star(num) {
      console.log(`选择了${num}个星`);
    }
  },
  methods: {}
};
</script>

