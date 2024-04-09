
/****************************************************************************
所属系统: 组件库
所属模块: 单选（组）
创建时间: 2020-01-02


***************************************************************************/
<template>
  <div class="el-radio-group">
    <slot></slot>
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";
export default {
  name: "JrRadioGroup",
  componentName: "JrRadioGroup",
  mixins: [emitter],
  props: {
    value: {},
    type: {
      type: String,
      default: "square"
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {
    // 监听值的变化，如果父级或父级以上 有表单组件， 会向表单组件提交change事件
    value(value, oldValue) {
      this.dispatch("JrFormItem", "form-change", [value]);
      this.$emit("change", value, oldValue);
    }
  }
};
</script>

<style scoped>
</style>
