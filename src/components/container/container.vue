/****************************************************************************

所属系统: 组件库
所属模块: 容器组件
创建时间: 2020年4月20日 15:49:43
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="j-container"
       :style="{padding}">
    <div class="j-center">

      <!-- 内容宽度根据插槽宽度自适应 -->
      <div class="jr-main"
           :class="{'j-window-center':centerMode==='window'}">

        <!-- 标题组件 -->
        <jr-head v-if="showTitle"
                 v-bind="$attrs">

          <!-- 标题组件插槽 -->
          <slot name="headSlot"></slot>
        </jr-head>

        <!-- 默认插槽 -->
        <slot></slot>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "JrContainer",
  inheritAttrs: false,
  components: {},
  mixins: [],
  props: {
    // 容器的padding
    padding: {
      type: String,
      default: "0 50px 300px"
    },
    // 是否显示标题组件
    showTitle: {
      type: Boolean,
      default: true
    },
    // 居中方式
    centerMode: {
      type: String,
      validator(val) {
        return ["iframe", "window"].includes(val);
      },
      default: "iframe"
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
<style scoped lang='scss'>
</style>
