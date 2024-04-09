/****************************************************************************

所属系统: 组件库
所属模块: 滚动触底加载数据组件
创建时间: 2019年9月23日 11:08:33


***************************************************************************/
<template>
  <div class="jr-scroll-view"
       :style="{maxHeight}"
       @scroll="scroll"
       ref="wrapper">
    <slot></slot>
    <jr-loading-petal :visible="showLoading"></jr-loading-petal>
  </div>
</template>
<script>
export default {
  name: "JrScrollView",
  components: {},
  props: {
    // 容器最大高度
    maxHeight: {
      type: String,
      required: true
    },
    // 是否显示loading
    showLoading: {
      type: Boolean,
      default: false
    },
    // 是否开启上拉加载更多
    pullup: {
      type: Boolean,
      default: true
    }
  },
  mixins: [],
  data() {
    return {
      // 容器绑定的滚动事件
      scroll: () => {}
    };
  },
  created() {
    this.initScrollFn();
  },
  methods: {
    /**
     * @desc 滚动事件节流初始化
     * @author 陈宇奇
     * @date 2019年9月23日 11:33:28
     */
    initScrollFn() {
      // 滚动节流
      this.scroll = this.$utils.throttle(this.scrollFn, 500);
    },
    /**
     * @desc 滚动触底抛出方法
     * @author 陈宇奇
     * @date 2019年9月23日 11:32:22
     */
    scrollFn() {
      // 没开启上拉加载直接返回
      if (!this.pullup) {
        return;
      }
      let scroll = this.$refs.wrapper,
        resault =
          scroll.scrollHeight - (scroll.clientHeight + scroll.scrollTop);
      // 到底并且没loading中才触发父组件方法
      if (!resault && !this.showLoading) {
        // 开启loading
        this.$emit("update:showLoading", true);
        this.$nextTick(() => {
          // 存在loading的时候将滚动区域滚到最底
          scroll.scrollTop = scroll.scrollHeight;
          // 滚动到底部通知父组件
          this.$emit("scroll-end", scroll);
        });
      }
    }
  }
};
</script>
<style scoped lang='scss'>
@import "scrollView.scss";
</style>
