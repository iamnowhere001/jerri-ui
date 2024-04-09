/****************************************************************************

所属系统: 组件库
所属模块: 按钮组件
创建时间: 2020年4月17日 15:25:16

***************************************************************************/
<template>
  <div class="jr-button-wrap"
       :style="{width: limitWidth}">
    <span class="jr-button"
          :class="[
            type ? `jr-button-${type}` : '',
            size === 'small'? 'small': 'normal',
            {
              'jr-button-disabled': disabled,
              'less-padding': isOverChar,
              'jr-button-add': slotText==='+',
              'jr-button-sub': slotText==='-',
              'circle': slotText==='+'&&shape==='circle'
            }
          ]"
          @click="handleClick(type==='delete')">
      <span :class="{'j-ellip': limitWidth}">

        <!-- 对于业务中使用频率很高按钮，放默认插槽中提供出来 -->
        <slot>
          <div class="jr-button-img">
            <img :src="defaultUrl[slotType]"
                 class="default-img">
            <span class="jr-button-text">{{slotText==='-'?'':slotText}}</span>
          </div>
        </slot>

      </span>

      <!-- 删除按钮自带X字体图标 -->
      <i v-if="type==='delete'"
         class="icon-wrong-warning"
         @click="handleClick()"></i>
    </span>
  </div>
</template>

<script>
// 多语言转换方法
import { translate } from "../../assets/constants/lang";
export default {
  name: "JrButton",
  props: {
    // 按钮类型
    type: {
      type: String,
      validator(val) {
        return ["success", "plain", "danger", "delete"].includes(val);
      },
      default: "success"
    },
    // 按钮分为大按钮和小按钮
    size: {
      type: String,
      default: "small"
    },
    // 禁用按钮
    disabled: {
      type: Boolean,
      default: false
    },
    // 默认插槽中的文本， 使用默认插槽时才生效
    slotText: {
      type: String,
      default: translate("common_新增")
    },
    // 默认插槽中的图片类型， 使用默认插槽时才生效
    slotType: {
      type: String,
      default: "add"
    },
    // 明确按钮宽度
    width: {
      type: [String, Number]
    },
    // +号按钮圆形还是方形
    shape: {
      type: String,
      validator(val) {
        return ["square", "circle"].includes(val);
      },
      default: "square"
    }
  },
  data() {
    return {
      // 默认图片类型
      defaultUrl: {
        add: require("../../assets/images/common/i_add_form_all.png")
      }
    };
  },
  created() {},
  mounted() {},
  computed: {
    // 按钮有明确限制宽度时
    limitWidth() {
      return this.$utils.isString(this.width)
        ? this.width
        : this.$utils.isNumber(this.width)
        ? `${this.width}px`
        : false;
    },

    // 默认文本 超过4个字符时， 按钮两边paddding改为 10px
    isOverChar() {
      const limitChar = 4;
      return this.slotText.length > limitChar;
    }
  },
  methods: {
    /**
     * @desc 点击按钮抛出事件给父组件
     * @param {Boolean} isDel 是否是删除按钮点击文字
     * @author 陈宇奇
     * @date 2020年4月20日 10:42:43
     */
    handleClick(isDel = false) {
      // 禁用和删除按钮点击文字的时候直接返回
      if (this.disabled || isDel) {
        return false;
      }
      this.$emit("click", true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./button.scss";
</style>
