/****************************************************************************

所属系统: 组件库
所属模块: 气泡组件
创建时间: 2020-09-01
维护人: 陈泽光
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/

<template>
  <span>
    <!-- 原本内容插槽 -->
    <slot></slot>
    <transition name="fade">
      <div class="popover"
           ref="popper"
           v-show="isShow"
           :style="popperStyle">

        <!-- 气泡主体 -->
        <div class="popover-content">
          <slot name="content">
            <div v-text="content"></div>
          </slot>
        </div>

        <!-- 箭头 -->
        <div class="popover-arrow"
             v-show="showArrow"
             x-arrow></div>
      </div>
    </transition>
  </span>
</template>
<script>
// mixin文件
import popperMixin from "./mixin";

export default {
  name: "JrPopover",
  mixins: [popperMixin],
  props: {
    // 是否显示箭头
    showArrow: {
      type: Boolean,
      default: true,
    },
    // 触发方式 hover click focus
    trigger: {
      type: String,
      default: "hover",
    },
    // 宽度
    width: {
      type: Number,
    },
  },
  data() {
    return {
      reference: null,
      popper: null,
      isShow: false,
    };
  },
  computed: {
    popperStyle() {
      if (this.width && this.width !== 400) {
        return { width: `${this.width}px`, maxWidth: "none" };
      }
      return null;
    },
  },
  methods: {
    /**
    * @desc 隐藏气泡
    * @author 陈泽光
    * @date 2020年09月07日 08:15:01
    */
    hidePopper() {
      if (this.trigger !== "hover"){
        this.isShow = false;
      }
      this.timer = setTimeout(() => {
        this.isShow = false;
        this.popperTimer = setTimeout(() => {
          this.popper.destroy();
          this.popper = null;
        }, 300);
      }, 300);
    },
  },
};
</script>
<style scoped>
@import "./popover.scss";
</style>
