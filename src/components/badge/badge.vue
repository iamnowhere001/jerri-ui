/****************************************************************************

所属系统: 组件库
所属模块: 角标
创建时间: 2020-01-02
***************************************************************************/
<template>
  <div class="badge-wrap">
    <slot></slot>
    <span class="badge"
          :class="[
            {
              dot: isDot
            },
            type,
            isDot ? animation : animation === 'fade' ? 'fade' : '',
          ]"
          v-show="isDot || value">{{ handleMax(value) }}</span>
  </div>
</template>

<script>
export default {
  name: "JrBadge",
  components: {},
  props: {
    // 角标中接收的值，String类型会直接展示，Number类型会根据max值做对比
    value: [String, Number],
    // 允许展示是最大数值，超过展示`${max}+`
    max: {
      type: Number,
      default: 99
    },
    // 角标颜色
    type: {
      type: String,
      validator(val) {
        return ["danger", "warn", "success"].includes(val);
      },
      default: "danger"
    },
    // 是否展示圆点
    isDot: {
      type: Boolean,
      default: false
    },
    // 可配置的动画
    animation: {
      type: String
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * @desc 对数字类型的值做最大值限制
     * @param {type}
     * @author ZhengKai
     * @date 2019-06-17 17:04:56
     */
    handleMax(value) {
      if (this.isDot) {
        return;
      } else if (typeof value === "number") {
        return value > this.max ? `${this.max}+` : value;
      }
      return value;
    }
  }
};
</script>

<style scoped  lang='scss'>
@import "badge.scss";
</style>
