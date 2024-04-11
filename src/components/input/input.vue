/****************************************************************************
所属系统: 组件库 
所属模块: 输入框 
 

***************************************************************************/
<template>
  <label class="jr-input" @click="$event.preventDefault()">
    <!-- 输入框位置 -->
    <input
      :type="type"
      v-if="type !== 'textarea'"
      ref="input"
      :value="value"
      :class="[
        {
          'jr-input-prefix': $slots.prefix || prefixIcon,
          'jr-input-suffix': $slots.suffix || suffixIcon,
          'jr-input-disabled': disabled,
          'jr-input-underline': underline,
          readonly: readonly,
          'over-icon': overIcon,
        },
        borderOption[borderColor],
      ]"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keyup.enter="handleEnter"
      :placeholder="placeholder"
      :maxlength="inputMaxlength"
      :readonly="readonly || disabled"
      :style="`ime-mode:Disabled;height: ${height}px;`"
      autocomplete="off"
    />

    <!-- 前置图标 -->
    <span
      class="jr-prifix-icon jr-icon-wrap"
      v-if="$slots.prefix || prefixIcon"
      @mouseenter="overIcon = true"
      @mouseleave="overIcon = false"
    >
      <slot name="prefix"></slot>
      <i :class="prefixIcon" @click.stop="handleIcon"></i>
    </span>
    <!-- 后置图标 -->
    <span
      class="jr-suffix-icon jr-icon-wrap j-pointer"
      :class="{ 'jr-suffix-icon-search': isSearch }"
      v-if="$slots.suffix || suffixIcon"
      @mouseenter="overIcon = true"
      @mouseleave="overIcon = false"
    >
      <slot name="suffix"></slot>
      <i :class="suffixIcon" ref="suffix" @click="handleIcon"></i>
    </span>
    <div
      v-if="type === 'textarea'"
      :style="{ maxHeight }"
      class="jr-textarea"
      :class="{ 'auto-height': autoHeight }"
    >
      <pre ref="pre">{{ value }}</pre>
      <textarea
        :value="value"
        :placeholder="placeholder"
        :maxlength="inputMaxlength"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @input="handleInput"
        ref="input"
        :readonly="readonly || disabled"
        :class="{
          'jr-input-prefix': $slots.prefix || prefixIcon,
          'jr-input-suffix': $slots.suffix || suffixIcon,
          'jr-input-disabled': disabled,
          'scroll-bar': thinScroll,
          readonly: readonly,
        }"
      ></textarea>
      <span
        ref="surplusLength"
        v-show="surplus && surplus <= surplusVisibilityConfig"
        >{{ surplus }}</span
      >
    </div>
  </label>
</template>

<script>
import emitter from "../../mixins/emitter";
// 多语言转换方法
import { translate } from "../../assets/constants/lang";
export default {
  name: "JrInput",
  componentName: "JrInput",
  mixins: [emitter],
  props: {
    // 输入框的值
    value: [String, Number],
    // 前置图标
    prefixIcon: String,
    // 后置图标
    suffixIcon: String,
    // 允许输入的最大长度
    maxlength: {
      type: Number,
      default: 100,
    },
    // 默认文本
    placeholder: {
      type: String,
      default: translate("common_请输入"),
    },
    // 输入框高度
    height: Number,

    // 文本域的最大高度
    maxHeight: {
      type: String,
      default: "200px",
    },
    autoHeight: Boolean,
    // 类型（常规输入框 or 文本域）
    type: {
      type: String,
      default: "text",
    },
    // 输入框下划线类型
    underline: {
      type: Boolean,
      default: false,
    },
    // 原生属性,只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 输入框 的正则校验
    pattern: {
      type: RegExp,
      default: null,
    },
    // 边框线的颜色
    borderColor: {
      type: String,
      default: "deep",
    },
    // 最大字节
    maxByte: {
      type: Number,
    },
    // 是否显示数量限制
    showLimit: {
      type: Boolean,
      default: true,
    },
    // 文本域是否显示细滚动条
    thinScroll: {
      type: Boolean,
      default: true,
    },
    // 文本域右下角课输入字符的控制
    surplusVisibilityConfig: {
      type: Number,
      default: 10,
    },
    // 是否是搜索输入框
    isSearch: Boolean,
    //  切割格式化
    splitFormat: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      isComposing: false,
      isStop: false,
      borderOption: {
        deep: "border-deep",
        simple: "border-simple",
      },
      // 是否有滚动条
      isScroll: false,
      // 滑过图标
      overIcon: false,
    };
  },
  created() {},
  mounted() {
    if (this.type === "textarea") {
      const preDom = this.$refs.pre;
      preDom.style.width = `${
        preDom.parentElement.getBoundingClientRect().width
      }px`;
      this.textareaAutoHeight();
    }
  },
  watch: {
    // 是否有可以滚动条
    isScroll(newVal) {
      let surplus = this.$refs.surplusLength;
      if (!newVal) {
        surplus.style.right = "7px";
        return;
      }
      surplus.style.right = this.thinScroll ? "12px" : "17px";
    },
    value(val) {
      if (!val) {
        this.autoHeight && (this.$refs.pre.style.minHeight = `auto`);
      } else {
        this.textareaAutoHeight();
      }
    },
    autoHeight: "textareaAutoHeight",
  },
  computed: {
    // 剩余可输入文字数量
    surplus() {
      if (!this.showLimit) {
        return "";
      }
      return this.value
        ? this.inputMaxlength - this.value.length
        : this.inputMaxlength;
    },
    //  输入框最大内容长度
    inputMaxlength() {
      let separatorCount = 0;
      if (this.splitFormat) {
        const separator = this.splitFormat.separator || " ";
        separatorCount = (this.value.match(new RegExp([separator], "g")) || [])
          .length;
      }
      return this.maxlength + separatorCount;
    },
  },
  methods: {
    async textareaAutoHeight() {
      if (this.autoHeight) {
        await this.$nextTick();
        const textarea = this.$refs.input;
        const height = textarea.scrollHeight;
        if (height) {
          this.$refs.pre.style.minHeight = `${height}px`;
        }
      }
    },
    /**
     * @desc 防中文输入法输入阶段触发input事件,输入开始阶段
     * @author 郑恺
     * @date 2020-1-2
     */
    handleCompositionStart() {
      this.isComposing = true;
    },

    /**
     * @desc 防中文输入法输入阶段触发input事件,输入完成阶段
     * @author 郑恺
     * @date 2020-1-2
     */
    handleCompositionEnd(event) {
      this.isComposing = false;
      this.handleInput(event);
    },

    /**
     * @desc 输入时触发， 校验输入内容
     * @author 郑恺
     * @date 2020-1-2
     */
    handleInput(event) {
      if (this.isComposing) return;

      let input = this.$refs.input;
      // 存在正则则匹配是否输入正确
      if (this.pattern) {
        let value = event.target.value;
        if (this.splitFormat) {
          const separator = this.splitFormat.separator || " ";
          value = value.replace(new RegExp(separator, "g"), "");
        }
        if (!this.pattern.test(value)) {
          input.value = "";
        }
      }

      let res = this.checkMaxBit(event, input);
      if (!res) {
        return false;
      }
      if (this.type === "textarea") {
        this.isScroll = this.hasScroll(this.$refs.input);
      }
      if (this.splitFormat) {
        this.format();
      } else {
        this.$emit("input", event.target.value, input);
      }
    },

    /**
     * @desc 按照分割规则与分隔符，切割内容
     */
    format() {
      const { interval = 4, separator = " " } = this.splitFormat;

      const replaceRule = (function() {
        const intervalArr = Array.isArray(interval) ? interval : [interval];
        const [regexStr, regexVarStr] = intervalArr.reduce(
          (prev, current, index) => {
            const isLastIndex = index === intervalArr.length - 1;
            prev[0].push(`(\\d{${index ? "0," : ""}${current}})`);
            prev[1].push(`$${index + 1}${separator}`);
            return prev;
          },
          [[], []]
        );

        return [new RegExp(regexStr.join("")), regexVarStr.join("")];
        // return [/(\d{3})(\d{0,4})(\d{0,4})/, "$1 $2 $3"];
      })();

      const input = this.$refs.input;
      const value = input.value;
      // 获取当前光标的位置
      const cursorIndex = input.selectionStart;
      // 字符串中光标之前分隔符的个数
      const lineNumOfCursorLeft = (
        value.slice(0, cursorIndex).match(new RegExp(separator, "g")) || []
      ).length;

      // 去掉所有分隔符的字符串
      const noLine = value.replace(new RegExp(separator, "g"), "");

      // 去除格式不对的字符并重新插入分隔符的字符串
      const newValue = noLine
        .replace(/\D+/g, "")
        .replace(...replaceRule)
        .replace(new RegExp(`${separator}$`), "");

      // 改后字符串中原光标之前分隔符的个数
      const newLineNumOfCursorLeft = (
        newValue.slice(0, cursorIndex).match(new RegExp(`${separator}`, "g")) ||
        []
      ).length;

      // 光标在改后字符串中应在的位置
      const newCursorIndex =
        cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft;

      // 赋新值，nextTick保证-不能手动输入或删除，只能按照规则自动填入
      this.$emit("input", newValue, input);

      // 修正光标位置，nextTick保证在渲染新值后定位光标
      this.$nextTick(() => {
        // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置
        input.selectionStart = newCursorIndex;
        input.selectionEnd = newCursorIndex;
      });
    },

    /**
     * @desc 丢出聚焦事件
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleFocus(event) {
      this.$emit("focus", event);
      this.dispatch("JrFormItem", "form-focus", [true]);
    },

    /**
     * @desc 丢出失焦事件
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleBlur(event) {
      this.$emit("blur", event);
      this.dispatch("JrFormItem", "form-blur", [this.value]);
    },

    /**
     * @desc 输入框值改变，并且失焦的时候丢出
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleChange(event) {
      this.$emit("change", event.target.value);
      this.dispatch("JrFormItem", "form-change", [event.target.value]);
    },

    /**
     * @desc 点击图标丢出事件
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleIcon() {
      if (!this.disabled) {
        this.focus();
        this.$emit("icon-click", this.value, this.$refs.input);
      }
    },

    /**
     * @desc 点击图标丢出事件
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleEnter() {
      if (!this.disabled) {
        this.$emit("enter", event.target.value);
      }
    },

    /**
     * @desc 自动聚焦
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    focus() {
      this.$refs.input.focus();
    },

    /**
     * @desc 自动失焦
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    blur() {
      this.$refs.input.blur();
    },

    /**
     * @desc 判断是否有滚动条
     * @param {Obj} el 目标元素
     * @param {String} direct 判断的方向
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    hasScroll(el, direct = "vertical") {
      return direct === "vertical"
        ? el.scrollHeight > el.clientHeight
        : el.scrollWidth > el.clientWidth;
    },

    checkMaxBit(e, input) {
      var w = 0;
      var tempCount = 0;
      //length 获取字数数，不区分汉子和英文
      for (var i = 0; i < e.target.value.length; i++) {
        //charCodeAt()获取字符串中某一个字符的编码
        var c = e.target.value.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          w++;
        } else {
          w += 2;
        }
        if (w > this.maxBit) {
          e.target.value = e.target.value.substr(0, i);
          this.$emit("input", e.target.value, input);
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "input.scss";
</style>
