/****************************************************************************
所属系统: 组件库
所属模块: 菊花loading
创建时间: 2020-01-02

***************************************************************************/
<template>
  <!-- 菊花loading -->
  <div class="load visible"
       v-if="visible">
    <div class="container">
      <div class="spinner">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
        <div class="bar10"></div>
        <div class="bar11"></div>
        <div class="bar12"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 转圈圈
  name: "JrLoadingPetal",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
@import "./loadingPetal.scss";
</style>
