/****************************************************************************

所属系统: 组件库
所属模块: 评级组件
创建时间: 2019年7月11日 11:42:28
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="star"
       :class="{ 'dis-event': !isEdit }">
    <span v-for="el in star"
          class="icon-score"
          :key="el"
          @click="checkStar(el)"
          @mouseover="huoverStar(el)"
          @mouseleave="hoverIndex=value"
          :class="[{ active: el === index }]"></span>
    <div class="desc"
         v-if="levelDesc.length===5">{{levelDesc[hoverIndex-1]}}</div>
  </div>
</template>
<script>
export default {
  name: "JrRating",
  props: {
    // 星星数量
    value: {
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    // 等级描述
    levelDesc: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 点击的星星索引
      index: -1,
      hoverIndex: -1,
      // 星星数组
      star: [1, 2, 3, 4, 5]
    };
  },
  watch: {
    /**
     * @desc 传入的星星数量转换
     * @author 陈宇奇
     * @date 2020年1月4日 16:11:32
     */
    value: {
      handler(val) {
        this.hoverIndex = val;
        switch (val) {
          case 0:
            this.index = -1;
            break;
          case 1:
            this.index = 5;
            break;
          case 2:
            this.index = 4;
            break;
          case 3:
            this.index = 3;
            break;
          case 4:
            this.index = 2;
            break;
          case 5:
            this.index = 1;
            break;
        }
      },
      immediate: true
    },
    /**
     * @desc 监听传入的等级描述数组
     * @param {Array} arr 等级描述
     * @author 陈宇奇
     * @date 2020年1月4日 16:12:05
     */
    levelDesc(arr) {
      if (arr.length !== 5) {
        throw new Error("请检查等级描述数量和星星数量是否一致");
      }
    }
  },
  methods: {
    /**
     * @desc 选择评级
     * @param {Number} i 选择的索引
     * @author 陈宇奇
     * @date 2019年7月11日 11:33:20
     */
    checkStar(i) {
      // 点击相同项减少一个星星
      if (this.index === i) {
        this.index = i + 1;
        // 星星的数量传给父组件
        this.$emit("input", this.switchStar(this.index));
      } else {
        this.$emit("input", this.switchStar(i));
      }
    },
    huoverStar(i) {
      this.hoverIndex = this.switchStar(i);
    },
    switchStar(star) {
      // 因为样式进行了文本取反 所以点击的数量根据索引过滤
      let num = 0;
      switch (star) {
        case 5:
          num = 1;
          break;
        case 4:
          num = 2;
          break;
        case 3:
          num = 3;
          break;
        case 2:
          num = 4;
          break;
        case 1:
          num = 5;
          break;
      }
      return num;
    }
  }
};
</script>
<style scoped lang='scss'>
@import "./rating.scss";
</style>
