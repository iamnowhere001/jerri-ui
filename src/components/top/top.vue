/****************************************************************************

所属系统: 组件库
所属模块: 回到顶部组件
创建时间: 2020-01-02

***************************************************************************/
<template>
  <!-- 图标 -->
  <div class="jr-back-to-top"
       @click="toTop"
       v-show="visible">
    <i class="icon-top-all"></i>
  </div>
</template>

<script>
export default {
  name: "JrTop",
  props: {
    // 滚动超出这个范围就显示按钮
    visibilityHeight: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      // 定时器
      timer: null,
      // 滚动的文档
      el: null,
      // 外层盒子
      container: null,
      // 控制按钮显示和隐藏
      visible: false
    };
  },
  mounted() {
    // 初始化组件
    this.init();
    // 监听滚动事件
    this.container.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    // 清除滚动事件
    this.container.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    /**
     * @desc 隐藏或显示组件
     * @author 周克朱
     * @date 2019-7-22 11:55:28
     */
    init() {
      this.container = document;
      this.el = document.documentElement;
    },
    /**
     * @desc 滚动时监听scrollTop是否达到显示按钮的值
     * @author 周克朱
     * @date 2019-12-24 14:56:37
     */
    onScroll() {
      const scrollTop = this.el.scrollTop;

      // 处理显示和隐藏
      this.visible = scrollTop >= this.visibilityHeight;
    },
    /**
     * @desc 回到顶部功能
     * @author 周克朱
     * @date 2019-7-22 11:55:28
     */
    toTop() {
      // 清除滚动事件
      this.container.removeEventListener("scroll", this.onScroll);
      // 直接隐藏按钮
      this.visible = false;

      // 开始回到顶部操作
      this.timer = requestAnimationFrame(this.scrollAnimate);
    },
    /**
     * @desc 滚动操作函数
     * @author 周克朱
     * @date 2019-7-22 11:55:28
     */
    scrollAnimate() {
      // 获取滚动内容滚出去的距离
      let oTop = document.documentElement.scrollTop;
      if (oTop > 0) {
        // 继续滚到顶部
        scrollTo(0, oTop - oTop * 0.2);
        this.timer = requestAnimationFrame(this.scrollAnimate);
      } else {
        // 动画结束重新添加滚动事件
        this.container.addEventListener("scroll", this.onScroll);
        // 已经到顶，清除帧动画
        cancelAnimationFrame(this.timer);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./top.scss";
</style>
