/****************************************************************************
所属系统: 组件库
所属模块: 单选
创建时间: 2020-01-02


***************************************************************************/
<template>
  <label class="el-radio-wrap"
         :class="{'label-disabled': disabled}">
    <span class="el-radio"
          @click.stop="handleClick"
          :class="{'focus-border': isSelected, 'radio-disabled': disabled, 'circle-warp': wrapType === 'circle'}">
      <span class="el-radio-inner "
            :class="{'inner-circle': wrapType === 'circle', 'icon-selece-pre': wrapType === 'square' }"
            v-show="isSelected"></span>
      <input type="radio"
             :name=name
             :value="label"
             ref="radio"
             v-model="model"
             @focus="handleFocus"
             @blur="handleBlur"
             :disabled="disabled">
    </span>
    <span class="el-radio-label"
          :class="{'label-disabled': disabled,'focus-label':isSelected}"
          :style="{width}"
          v-title>
      <slot></slot>
    </span>
  </label>
</template>

<script>
import emitter from "../../mixins/emitter";
export default {
  name: "JrRadio",
  mixins: [emitter],
  props: {
    // 单选，暂时也只有这个值， 该参数不写入文档，只为以后拓展未知功能
    name: {
      type: String,
      default: "radio"
    },
    // 定义选择框到后面提示文字的宽度
    width: {
      type: String
    },
    // 单选使用方形还是圆形
    type: {
      type: String,
      default: "square"
    },
    value: {},
    label: {},
    // 是否禁用
    disabled: Boolean
  },
  data() {
    return {
      // focus: false
    };
  },
  created() {
    this.isSelected && this.handleFocus();
  },
  mounted() {},
  methods: {
    handleFocus() {},
    handleBlur() {},
    handleClick() {}
  },
  computed: {
    /**
     * @desc 当前使用类型
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    wrapType() {
      return this.isGroup ? this._radioGroup.type : this.type;
    },
    /**
     * @desc 是否选中
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    isSelected() {
      return this.label === this.model;
    },
    /**
     * @desc 单选是否按组使用
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "JrRadioGroup") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },

    /**
     * @desc 设置， 获取 model值
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    model: {
      // 是否是按组使用
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      // 单独使用直接将选择的值抛出去， 按组 则提交给 group
      set(val) {
        if (this.isGroup) {
          this.dispatch("JrRadioGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
      }
    }
  },
  watch: {
    // 可能是代码， 勾选时， 并不需要额外作什么事情。 （：
    isSelected(newVal) {
      newVal && this.handleFocus();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./radio.scss";
</style>
