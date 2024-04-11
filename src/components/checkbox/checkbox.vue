<!--
/**************************************************************************** 
所属系统: 组件库
所属模块: 复选框


***************************************************************************/
-->
<template>
  <label class="el-radio-wrap" :class="{ 'label-disabled': isDisabled }">
    <!-- 选择框 -->
    <span
      class="el-radio"
      @click.stop="handleClick"
      :class="{
        'focus-border': isSelected,
        'radio-disabled': isDisabled,
        'is-indeterminate': indeterminate,
      }"
    >
      <span class="el-radio-inner icon-selece-pre" v-show="isSelected"></span>
      <input
        type="checkbox"
        name="checkbox"
        :value="label"
        v-model="model"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        ref="input"
        :disabled="isDisabled"
      />
    </span>
    <!-- 描述内容 -->
    <span
      v-title
      :style="{ width }"
      :class="{ 'label-disabled': isDisabled, 'focus-label': isSelected }"
      class="el-radio-label"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script>
import emitter from "../../mixins/emitter";

export default {
  name: "JrCheckbox",
  mixins: [emitter],
  props: {
    // 复选框及后面提示文本的总宽度
    width: {
      type: String,
    },
    // 是否勾选
    value: {},
    // 该项绑定的值
    label: {},
    // 禁用
    disabled: Boolean,
    // 不确定状态
    indeterminate: Boolean,
  },
  data() {
    return {};
  },
  created() {
    // this.isSelected && this.handleFocus();
  },
  mounted() {},
  methods: {
    /**
     * @desc 发生改变时丢出去
     * @date 2019-08-10 16:51:58
     */
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
      });
    },

    /**
     * @desc 暂时不提供下面方法， 留个萝卜坑
     * @date 2019-08-10 16:51:58
     */
    handleFocus() {},
    handleBlur() {},
    handleClick() {},
  },
  computed: {
    /**
     * @desc 是否勾选
     * @date 2019-08-10 16:51:58
     */
    isSelected() {
      return this.isGroup ? this.model.includes(this.label) : this.model;
    },

    /**
     * @desc 是否按组使用
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "JrCheckboxGroup") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    /**
     * @desc 判断最大数量
     * @author 陈宇奇
     * @date 2020年4月25日 14:05:46
     */
    isLimitDisabled() {
      const { max } = this._radioGroup;
      return this.model.length >= max;
    },
    /**
     * @desc 判断是否禁用
     * @author 陈宇奇
     * @date 2020年4月25日 14:06:19
     */
    isDisabled() {
      return this.isGroup
        ? this.disabled || (this.isLimitDisabled && !this.isSelected)
        : this.disabled;
    },
    /**
     * @desc 双向绑定
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          // 按组使用 超出最大数量直接返回
          this.dispatch("JrCheckboxGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./checkbox.scss";
</style>
