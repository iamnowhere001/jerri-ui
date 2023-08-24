/****************************************************************************

所属系统: 组件库
所属模块: 扇形进度条
创建时间: 2020-01-02
维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="upload"
       ref="circleWrap">
    <slot></slot>
    <div class="up-img"
         v-if="isShow">
      <div class="up-mask"
           :style="{width: `${2*radius}px`, height: `${2*radius}px`}"
           :class="{'suc':progress>=1}"></div>
    </div>

    <div class="circle"
         :style="{width: `${2*radius -2}px`, height: `${2*radius - 2}px`}"
         v-if="isShow">
      <svg width="100%"
           height="100%">
        <circle cx="50%"
                cy="50%"
                :r="radius"
                :stroke-width="2*radius"
                :stroke="strokeColor"
                fill="transparent"
                ref="circle"
                :transform="`matrix(0,-1,1,0,0,${2*radius})`"
                stroke-dasharray="1069 0"></circle>
      </svg>
    </div>

  </div>
</template>

<script>
export default {
  name: "JrProgressSector",
  props: {
    // 进度
    progress: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      isShow: true,
      dasharray: "",
      radius: 0,
      strokeColor: ""
    };
  },
  mounted() {
    this.init();
  },

  watch: {
    /**
     * @desc 监听进度， 可改为computed
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    progress(val) {
      if (val >= 0 && val < 1) {
        this.isShow = true;
        this.init();
      }

      this.$nextTick(() => {
        this.$refs.circle.style = "transition: stroke-dasharray 0.3s;";
        this.computeStroke();
        if (val >= 1) {
          this.strokeColor = "transparent";
          setTimeout(() => {
            this.isShow = false;
          }, 800);
        }
      });
    }
  },

  methods: {
    /**
     * @desc 重新计算
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    computeStroke() {
      let perimeter = Math.PI * 2 * this.radius;
      this.$refs.circle.setAttribute(
        "stroke-dasharray",
        perimeter * (1 - this.progress) + " " + perimeter * this.progress
      );
    },

    /**
     * @desc 初始化进度条，初始值将不会产生动画效果
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    init() {
      this.$nextTick(() => {
        this.strokeColor = "rgba(0,0,0,0.5)";
        let warp = this.$refs.circleWrap.getBoundingClientRect();
        let minVal = Math.min(warp.width, warp.height);
        this.radius = ((minVal * 0.7) / 2).toFixed(0);
        this.computeStroke();
        if (this.progress >= 1) {
          this.isShow = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./sector.scss";
</style>
