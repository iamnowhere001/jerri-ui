/****************************************************************************

所属系统: 组件库
所属模块: 滑动开关
创建时间: 2020-01-02


***************************************************************************/
<template>
  <div class="switch-wrap">
    <!-- 滑动开关的轨道， 内部圆是伪元素 -->
    <span class="switch"
          :class="[
            type? `switch-${type}`: '',
            value? 'active-bgc': 'inactive-bgc',
            {disabled: disabled}
          ]"
          :style="{borderRadius: sizeList[size], height: sizeList[size],width}"
          @click="toggle">
      <span>{{ value?activeText: inactiveText }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "JrSwitch",
  components: {},
  props: {
    // 开关类型
    type: {
      type: String,
      validator(val) {
        // 绿色和红色
        return ["success", "danger"].includes(val);
      },
      default: "success"
    },
    // 绑定值
    value: {
      type: Boolean,
      default: false
    },
    // 大开关，暂时不用，不计入文档
    size: {
      type: String,
      default: "small"
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 激活时，开关内文本
    activeText: {
      type: String
    },
    // 关闭状态时， 开关内的文本
    inactiveText: {
      type: String
    },
    // 开关宽度
    width: {
      type: String,
      default: "42px"
    }
  },
  data() {
    return {
      sizeList: {
        small: "14px",
        normal: "22px"
      }
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * @desc 切换开关
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    toggle() {
      if (this.disabled) {
        return;
      }
      this.$emit("input", !this.value);
      this.$emit("change", !this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./switch.scss";
</style>
