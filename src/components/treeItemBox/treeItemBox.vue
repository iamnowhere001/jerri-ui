<!--
/****************************************************************************

所属系统: 树结构分栏组件
所属模块: 模块—[子模块]
创建时间: 2019年9月9日 16:42:09


***************************************************************************/
-->
<template>
  <div
    class="tree-box"
    :class="`radius-direction-${radiusDirection}`"
    :style="{ width, height }"
  >
    <div class="tree-box-title j-ellip" v-title>
      <span>{{ title }}</span>
    </div>
    <jr-scroll-view
      maxHeight="100%"
      v-bind="$attrs"
      @scroll-end="handlerScrollEnd"
      :showLoading.sync="isShow"
    >
      <ul v-if="typeList.length" key="list">
        <li v-for="(el, i) in typeList" :key="i">
          <!-- 每一项的插槽 -->
          <slot name="item" :item="{ el, index: i }" :index="i" :el="el">
            <div>{{ el }}</div>
          </slot>
        </li>
      </ul>
      <div
        class="tree-not-data j-center"
        :class="{ 'has-btn': $slots.btns }"
        key="not-data"
        v-else
      >
        {{ placeholder }}
      </div>
    </jr-scroll-view>

    <!-- 按钮插槽 -->
    <slot name="btns" v-if="$slots.btns"> </slot>
  </div>
</template>

<script>
export default {
  name: "JrTreeItemBox",
  inheritAttrs: false,
  props: {
    // 通栏宽度
    width: {
      type: String,
      default: "400px",
    },
    // 通栏高度
    height: {
      type: String,
      default: "594px",
    },
    // 圆角出现方向
    radiusDirection: {
      type: String,
      validator(val) {
        return ["left", "right", "all", "none"].includes(val);
      },
      default: "all",
    },
    // 通栏标题
    title: {
      type: String,
      default: "标题",
    },
    // 列表数据
    typeList: {
      type: Array,
      default: () => [],
    },
    // 暂无数据占位
    placeholder: {
      type: String,
      default: "暂无内容",
    },
    // 是否显示loading
    showLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 是否显示下拉加载loding
      isShow: false,
    };
  },
  watch: {
    /**
     * @desc 监听父组件的loading赋值
     * @param {Boolean} newVal 监听到的值
     * @author 陈宇奇
     * @date 2019年9月23日 16:39:03
     */
    showLoading(newVal) {
      // 关闭loading才赋值
      !newVal && (this.isShow = newVal);
    },
    /**
     * @desc 监听传递给加载更多组件loading值
     * @param {Boolean} newVal 监听到的值
     * @author 陈宇奇
     * @date 2019年9月23日 16:39:03
     */
    isShow(newVal) {
      // 如果子组件的loading到底开启 则修改父组件的loading值
      newVal && this.$emit("update:showLoading", true);
    },
  },
  methods: {
    /**
     * @desc 滚动到底部
     * @author 陈宇奇
     * @date 2019年9月9日 16:43:14
     */
    handlerScrollEnd() {
      // 滚动到底部通知父组件
      this.$emit("scroll-end");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./treeItemBox.scss";
</style>
