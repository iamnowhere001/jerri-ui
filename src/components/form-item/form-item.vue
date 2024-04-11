/****************************************************************************

所属系统: 组件库
所属模块: 表单组件


***************************************************************************/
<template>
  <div class="form-item clearfix">
    <!-- 前置提示文本 -->
    <span v-if="label && required"
          :class="{'label-required': required,}">*</span>
    <label v-if="label"
           :for="labelFor"
           :style="{ width: labelWidth || form.labelWidth , textAlign: labelPositon || form.labelPositon  }"
           :class="{ 'text-align-justify': justifyAlign}">
      {{ label }}
    </label>
    <span v-if="label && justifyAlign">：</span>
    <div class="form-item-validate"
         ref="wrap"
         :style="wrapStyles"
         >
      <!-- 插槽 -->
      <slot></slot>
      <div v-if="message"
           :style="{top,left,right,bottom}"
           :class="isShow?'visible': 'hidden'"
           class="message"
           @click="handleTip"><i v-if="form.messageIcon"
           class="icon-save-warning"></i>{{ message }}</div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import emitter from "../../mixins/emitter";
export default {
  name: "JrFormItem",
  componentName: "JrFormItem",
  mixins: [emitter],
  props: {
    // 校验规则
    rule: {
      type: Array
    },
    // 提示文字内容
    label: {
      type: String,
      default: ""
    },
    // 定义该项的属性
    prop: {
      type: String
    },
    // 引导文字所在区域的宽度，优先级高级form中的labelWidth
    labelWidth: {
      type: String
    },
    // 引导文字所在区域的位置，优先级高级form中的labelPositon
    labelPositon: {
      type: String
    },
    //  组件宽度
    componentWidth: {
      type: String
    },
    // 检验语句展示的位置-距离顶部位置
    top: {
      type: String,
      default: "4px"
    },
    // 检验语句展示的位置-距离左边位置
    left: {
      type: String,
      default: "6px"
    },
    // 检验语句展示的位置-距离右边位置
    right: {
      type: String,
      default: "auto"
    },
    // 该项是否必填
    required: {
      type: Boolean,
      default: false
    },
    // 检验语句展示的位置-距离底部边位置
    bottom: {
      type: String,
      default: "auto"
    },
  },
  // 注入的表单实例
  inject: ["form"],
  data () {
    return {
      isShow: true,
      isRequired: false,
      message: "",
      labelFor: "input" + new Date().valueOf(),
      propery: this.prop
    };
  },
  mounted () {
    this.init();
  },
  computed: {
    /**
     * @desc 外壳样式
     * @author 杨文杰
     * @date 2020年6月20日 10:17:34
     */
    wrapStyles() {
      const styles = {};
      if(this.componentWidth) {
        styles["flex"] = "unset";
        styles["width"] = this.componentWidth;
      }
      return styles;
    },

    /**
     * @desc 待校验的值
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    fieldValue () {
      if (this.prop && this.prop.indexOf(".") !== -1) {
        let res = this.prop.split(".").reduce((acc, current) => {
          return acc[current];
        }, this.form.model);
        return res;
      }
      return this.form.model[this.prop];
    },

    /**
     * @desc 两端对齐
     * @author ZhengKai
     * @date 2020-04-29
     */
    justifyAlign () {
      return (
        this.labelPositon === "justify" ||
        (!this.labelPositon && this.form.labelPositon === "justify")
      );
    }
  },
  watch: {
    prop (newVal) {
      this.propery = newVal;
      this.init();
      this.message = "";
    }
  },
  /**
   * @desc 销毁
   * @author ZhengKai
   * @date 2019-08-10 16:51:58
   */
  beforeDestroy () {
    this.dispatch("JrForm", "form-remove", [this]);
  },
  methods: {
    init () {
      // 加入待校验队列
      if (this.prop) {
        this.dispatch("JrForm", "form-add", [this]);
        this.initialValue = this.fieldValue;
        this.setRules();
      }
      // props字符串中，以点来检测是否动态校验
      if (this.prop && this.prop.indexOf(".") !== -1) {
        this.propery = this.prop.split(".").pop();
      }
    },
    /**
     * @desc 设置规则
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    setRules () {
      let rules = this.getRules();
      if (rules.length) {
        let res = rules.find(item => item.required === true);
        res && (this.isRequired = res.required);
      }
      this.$on("form-blur", this.onFieldBlur);
      this.$on("form-change", this.onFieldChange);
      this.$on("form-focus", this.onFieldFocus);
    },
    /**
     * @desc 获得规则
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    getRules () {
      let formRules = this.rule || this.form.rules[this.propery];
      formRules = formRules || [];
      return formRules;
    },
    // 过滤rule
    getFilteredRule (trigger) {
      let rules = this.getRules();
      // return rules;
      return rules.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验
     * @param trigger
     * @param callback
     */
    validate (trigger, cb) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) return true;
      let validator = new AsyncValidator({ [this.propery]: rules });
      let model = { [this.propery]: this.fieldValue };
      validator.validate(model, { firstFields: true }, error => {
        this.message = error ? error[0].message : "";
        if (cb) cb(this.message);
      });
    },

    /**
     * @desc 重置
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    resetField () {
      this.message = "";
      if (this.prop && this.prop.indexOf(".") !== -1) {
        let arr = this.form.model[this.prop.split(".").shift()];
        arr.forEach(element => {
          element[this.propery] = "";
        });
        return;
      }
      this.form.model[this.propery] = this.initialValue;
    },

    /**
     * @desc 重置
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    clearValidate () {
      this.message = "";
    },

    /**
     * @desc 点击隐藏
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleTip (e) {
      let target = this.getTarget();
      target && target.focus();
    },

    /**
     * @desc 获取目标元素
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    getTarget () {
      let target = this;
      while (true) {
        if (target.$children.length) {
          target = target.$children[0];
          if (target.focus) {
            return target;
          }
        } else {
          return false;
        }
      }
    },

    /**
     * @desc 失焦触发
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    onFieldBlur (res) {
      this.validate("blur");
      this.isShow = true;
    },

    /**
     * @desc 改变触发
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    onFieldChange () {
      this.validate("change");
    },

    /**
     * @desc 聚焦触发
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    onFieldFocus () {
      this.isShow = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import 'form-item.scss';
</style>
