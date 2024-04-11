/****************************************************************************
所属系统: 组件库
所属模块: 必填项警示子组件

***************************************************************************/
<template>
  <div class="j-warning-box"
       :style="{ left:left + 'px', top:top + 'px' ,width:width ? width + 'px':'initial'}"
       @click="clickEvent">
    <span class="j-warning">
      <i class="icon-warning-big"></i>
      <!-- 警示文字跟随 -->
      {{text}}
    </span>
  </div>
</template>
<script>
export default {
  name: "JrWarnTips",
  props: {
    // 警示显示的文字
    text: {
      type: String,
      default: ""
    },
    // 离左边定位距离
    left: {
      type: Number,
      default: 0
    },
    // 离顶部定位距离
    top: {
      type: Number,
      default: 0
    },
    // 显示的宽度
    width: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * @desc 触发点击事件
     * @author 陈泽光
     * @date 2020年5月21日09:01:55
     */
    clickEvent() {
      this.$emit("click", true);
    }
  }
};
</script>
<style scoped lang='scss'>
.j-warning-box {
  display: inline-block;
  position: absolute;
  background-color: #fff;
  .j-warning {
    position: initial;
    cursor: pointer;
    left: 46px;
    // width: 60px;
    display: inline-block;
    height: 23px;
    background-color: $--color-c6;
    text-align: center;
    & /deep/ .j-warning {
      left: 22px;
      top: 1px;
    }
  }
}
</style>
