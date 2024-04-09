<!--
/**************************************************************************** 
所属系统: 组件库
所属模块: 时间选择器
创建时间: 2020年08月08日 17:35:58

***************************************************************************/
-->

<template>
  <div class="jr-datePicker">
    <jr-input
      v-model="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :suffixIcon="showIconByType()"
      @blur="handleBlur"
      @focus="handleFocus"
      :key="currentKey"
      ref="datePicker"
      readonly
    ></jr-input>
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";

export default {
  name: "JrDatePicker",
  mixins: [emitter],
  props: {
    // 时间
    value: {
      type: String,
    },
    // 可选择的最小时间
    min: {
      type: String,
      default: "1900-1-1",
    },
    // 可选择的最大时间
    max: {
      type: String,
      default: "2099-12-31",
    },
    // 展开框中可配置的底部按钮
    btns: {
      type: Array,
      default: () => ["clear", "now"],
    },
    // 选择的日期类型 YYYY | YYYY-mm-dd | YYYY-mm-dd HH:mm | ....
    type: {
      type: String,
      default: "date",
    },
    // 触发框中默认的文字提示
    placeholder: {
      type: String,
      default: "请选择",
    },
    // 是否开启时分选择
    isHH_mm: {
      type: Boolean,
      default: false,
    },
    // 得到值的格式
    format: {
      type: String,
      default: "yyyy-MM-dd",
    },
    // 展开框默认显示的值
    showDate: {
      type: String,
      default: "",
    },
    // 是否开启日期范围选择
    isRange: {
      type: Boolean,
      default: false,
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    /**
     * @desc 监听最小值的变动， 可以使用computed代替
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    min(minDate) {
      // minDate && this.defineAgain("min");
      this.initLaydate();
    },

    /**
     * @desc 监听最大值的变动， 可以使用computed代替
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    max(maxDate) {
      // maxDate && this.defineAgain("max");
      this.initLaydate();
    },

    /**
     * @desc 监听值的变动， 可以使用computed代替
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    value(newDate, oldDate) {
      this.$emit("change", newDate, oldDate);
      this.dispatch("JrFormItem", "form-change", [newDate]);
    },

    /**
     * @desc 监听日期类型的变动， 可以使用computed代替
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    type(newVal) {
      if (newVal) {
        this.initLaydate();
      }
    },

    /**
     * @desc 监听禁用参数的变动， 可以使用computed代替
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    disabled(newVal) {
      if (!newVal) {
        this.$nextTick(() => {
          this.initLaydate();
        });
      }
    },
  },
  data() {
    return {
      date: undefined,
      currentKey: +new Date(),
    };
  },
  mounted() {
    // 初始化
    !this.disabled && this.initLaydate();
  },
  methods: {
    /**
     * 生成一个lay-ui日期组件
     * @param {String} elem input框id选择器
     * @param {String} btns icon框id选择器
     * @param {String} type 可选择：年、月、日、时间 year/month/date/datetime/time
     */
    async defineDateCmp(elem, btns, type, eventElem) {
      if (!window.laydate) {
        await this.$utils.getSource(
          "//jerrisoft-test-oss.oss-cn-shenzhen.aliyuncs.com/CDN/layui-laydate/layui-laydate.js",
          true
        );

        laydate.path = "true";
      }

      this.date = window.laydate.render({
        elem,
        type,
        btns,
        min: this.min || "1900-1-1",
        max: this.max || "2099-12-31",
        eventElem,
        lang: localStorage.lang || "cn",
        format: this.format,
        isHH_mm: this.isHH_mm,
        trigger: "click",
        showDate: this.getDateTime(),
        // mark: { "2020-07-16": "" },
        // value: "2020-07-16",
        range: this.isRange ? "~" : false,
        done: (value) => {
          this.$emit("input", value);
        },
      });
    },

    /**
     * @desc 重新配改日期的配置来调整日期范围
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    defineAgain(type) {
      let dateList = this[type].split("-");
      this.date.config[type] = {
        year: dateList[0],
        month: dateList[1] - 1,
        date: dateList[2],
      };
      this.date.config["showDate"] = this.getDateTime();
    },

    /**
     * @desc 将值丢给表单
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleBlur() {
      this.$emit("on-blur", true);
      this.dispatch("JrFormItem", "form-blur", [this.value]);
    },

    /**
     * @desc 聚焦事件
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleFocus() {
      this.$emit("on-focus", true);
    },

    /**
     * @desc 展示框的日期
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    getDateTime() {
      //   const today = this.$utils.date(new Date(), "YYYY-MM-DD");
      //   new Date(this.min).getTime() > new Date(today).getTime()
      //   if (this.min !== "1900-1-1") {
      //     return new Date(this.min);
      //   } else {
      return this.showDate ? new Date(this.showDate) : new Date();
      //   }
    },

    /**
     * @desc 初始化laydate插件
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    initLaydate() {
      this.currentKey = +new Date();
      // 强制部分type 使用确认按钮
      if (this.type === "datetime" || this.type === "time") {
        if (!this.btns.includes("confirm")) {
          this.btns.push("confirm");
        }
      }

      this.$nextTick(() => {
        this.defineDateCmp(
          this.$children[0].$refs.input,
          this.btns,
          this.type,
          this.$children[0].$refs.suffix
        );
        // this.defineAgain("min");
        // this.defineAgain("max");
      });
    },

    focus() {
      setTimeout(() => {
        this.$children[0].$refs.input.focus();
        this.$children[0].$refs.input.click();
      });
    },

    /**
     * @desc 根据type使用不同的图标
     * @param {String} type 时间选择器类型
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    showIconByType() {
      const recordIcon = "icon-recording";
      const dateIcon = "icon-date";
      const icon = {
        year: dateIcon,
        month: dateIcon,
        date: dateIcon,
        datetime: recordIcon,
        time: recordIcon,
      };
      return icon[this.type];
    },
  },
};
</script>

<style lang="scss">
@import "./layui-laydate/default/laydate.css";
@import "datePicker.scss";
</style>
