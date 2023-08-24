/****************************************************************************

所属系统: 组件库
所属模块: 复选框（组）
创建时间: 2020-01-02
维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="el-radio-group">
    <slot></slot>
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";

export default {
  name: "JrCheckboxGroup",
  componentName: "JrCheckboxGroup",
  mixins: [emitter],
  props: {
    value: {
      type: Array
    },
    // 可以选中的最大数量
    max: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {
    /**
     * @desc 按组使用时， 统一处理值
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    value(value) {
      // 超出最大选择数量直接返回
      this.dispatch("JrFormItem", "form-change", value);
      this.$emit("change", value);
    }
  }
};
</script>

<style scoped>
</style>
