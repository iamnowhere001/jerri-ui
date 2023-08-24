<!--
/****************************************************************************

所属系统: tabs切换
所属模块: tabs切换—[椭圆tab]
创建时间: 2019-09-28
维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->

<template>
  <div class="ellipse">
    <ul ref="tabs">
      <li
        v-for="(it, index) in list"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="getTarget($event, index)"
      >
        <slot :item="it">{{ it.label }}</slot>
      </li>
    </ul>
    <div class="bgc" ref="bgc"></div>
  </div>
</template>

<script>
export default {
  name: "ellipseTab",
  components: {},
  props: {
    value: [String, Number],
    list: {
      type: Array,
      default: () => {},
    },
    berforLeave: {
      type: Function,
    },
  },
  data() {
    return {
      sourceEle: null,
      currentIndex: 0,
    };
  },
  created() {},
  mounted() {
    // 获取背景滑块
    this.sourceEle = this.$refs.bgc;
    // 初始化当前滑块位置
    this.initBgc();
  },
  computed: {},
  watch: {
    value(newVal) {
      newVal && this.initBgc();
    },
  },
  methods: {
    /**
     * @desc 获取目标元素
     * @param {Number} @i 点击选择的页签下标
     * @date 2019年9月28日10:49:14
     */
    async getTarget(e, i) {
      if (this.currentIndex === i) {
        return;
      }
      let target = e.target;
      let res = await this.handleBerforLeave(i);
      if (res === false) {
        return;
      }
      this.getAttr(target, i);
    },
    /**
     * @desc 根据激活元素移动滑块
     * @param {Number} @i 点击选择的页签下标
     * @date 2019年9月28日10:49:14
     */
    getAttr(el, i) {
      this.sourceEle.style.width = `${el.clientWidth}px`;
      this.sourceEle.style.height = `${el.clientHeight}px`;
      this.sourceEle.style.left = `${el.offsetLeft}px`;
      setTimeout(() => {
        this.currentIndex = i;
      }, 50);
      this.$emit("change", this.list[i].props);
    },

    /**
     * @desc 初始化当前滑块位置
     * @param {Number} @i 点击选择的页签下标
     * @date 2019年9月29日10:49:14
     */
    initBgc() {
      let index = this.getIndexByArr(this.value, this.list);
      let target = this.$refs.tabs.children[index];
      this.getAttr(target, index);
    },

    /**
     * @desc 查找val值在arr数组中的索引
     * @param {any} val 查找的目标值val
     * @param {Array} arr 原数组
     * @date 2019年7月17日10:49:14
     */
    getIndexByArr(val, arr) {
      let i = 0;
      arr.find((item, index) => {
        if (item.props === val) {
          i = index;
        }
      });
      return i;
    },

    /**
     * @desc 对离开前的函数封装成Promise
     * @date 2019年9月28日10:49:14
     */
    handleBerforLeave(i) {
      if (!this.berforLeave) {
        return Promise.resolve(true);
      }
      return Promise.resolve(this.berforLeave(i));
    },
  },
};
</script>

<style scoped lang="scss">
.ellipse {
  position: relative;
  display: inline-block;
  border-radius: $--border-radius-tabs;
  border: 1px solid $--color-c3;
  background-color: $--color-c6;
  ul {
    position: relative;
    display: flex;
    z-index: 1;
    li {
      user-select: none;
      min-width: 76px;
      text-align: center;
      line-height: 26px;
      height: 26px;
      padding: 0 12px;
      margin: 1px;
      color: $--color-c8;
      cursor: pointer;
    }
  }
  .bgc {
    position: absolute;
    top: 1px;
    border-radius: $--border-radius-tabs;
    background-color: $--color-c8;
    transition: all 0.2s;
    box-shadow: $--box-shadow-ellipse;
  }
  .active {
    color: $--color-c6;
  }
}
</style>
