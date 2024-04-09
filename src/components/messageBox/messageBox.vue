/****************************************************************************

所属系统: 组件库
所属模块: 模态框
创建时间: 2020-01-02


***************************************************************************/
<template>
  <div class="jrMessageBox j-mask"
       v-show="value">
    <div :style="{width, height, maxHeight, backgroundColor}"
         :class="[isDefine? 'definePadding' : '']"
         ref="messageBoxContainer">

      <!-- 标题行部分 -->
      <div class="jr-pop-title"
           :class="isDefine ? 'defintHeight' : ''"
           v-move="() => $refs.messageBoxContainer">
        <h4>
          <slot name="title">{{ title }}</slot>
        </h4>

        <i @click="close"
           :class="type === 'problem' ? 'hidden' : 'visible'"
           class="icon-close-picbig"></i>
      </div>

      <!-- 内容区域 -->
      <div class="wrap">
        <slot>
          <div class="normalBox">
            <div :class="{'wrap-has-desc':desc,'not-problem-type':type !== 'problem'}">
              <span>{{ tip }}</span>
            </div>
            <div v-if="desc">
              {{ desc }}
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="showBtn j-btn-group"
               v-if="type === 'problem'">
            <jr-button @click="handleClick">{{confirmText}}</jr-button>
            <jr-button type="plain"
                       @click="close">{{cancleText}}</jr-button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
// 多语言转换方法
import { translate } from "../../assets/constants/lang";

export default {
  name: "JrMessageBox",
  componentName: "JrMessageBox",
  props: {
    // 弹窗宽度
    width: {
      type: String
    },
    // 弹窗高度
    height: {
      type: String,
      default: "auto"
    },
    // 弹窗最大高度
    maxHeight: {
      type: String,
      default: "600px"
    },
    // 背景色
    backgroundColor: {
      type: String,
      default: "#f9fbf9"
    },
    // 小标题
    title: {
      type: String,
      default: translate("messageBox_提示")
    },
    // 控制消息弹窗显示隐藏
    value: {
      type: Boolean,
      default: false
    },
    // 弹窗类型 确认， 警示， 成功
    type: {
      type: String,
      default: "warn"
    },
    // 提示
    tip: {
      type: String,
      default: translate("messageBox_确定删除")
    },
    // 确认弹窗的副标题
    desc: {
      type: String,
      default: ""
    },
    // 副标题
    icon: {
      type: String,
      default: ""
    },
    // 是否自定义
    isDefine: {
      type: Boolean,
      default: false
    },
    // 确认弹窗的左边按钮文本
    confirmText: {
      type: String,
      defalut: translate("common_确定")
    },
    // 确认弹窗的右边按钮文本
    cancleText: {
      type: String,
      defalut: translate("common_取消")
    },
    onSure: () => { },
    onClose: () => { },
    beforeConfirm: {
      type: Function,
      default () {
        return null;
      }
    }
  },
  watch: {
    // 弹窗的显示。 隐藏
    value (newVal) {
      document.body.style.overflow = newVal ? "hidden" : "visible";
      if (newVal) {
        this.$utils.on(document, "keydown", this.closeEvent);
        // 是否出现滚动条
        if (document.body.scrollHeight > document.body.clientHeight) {
          // 出现滚动条则减去滚动条宽度防止页面抖动
          document.body.style.width = `calc(100% - ${this.$utils.scrollbarWidth()}px)`;
        }
        // 复原位置
        this.resetPlacement();
      } else {
        this.$utils.off(document, "keydown", this.closeEvent);
        document.body.style.width = "";
      }
    }
  },
  methods: {
    /**
     * @desc 监听键盘事件
     * @author 杨文杰
     * @date 2019年5月8日09:15:38
     */
    closeEvent () {
      let keyCode = event.keyCode;
      //  ESC（关闭图片查看器）
      if (keyCode === 27) {
        this.close();
      }
      // 确定弹窗 Enter直接确定
      if (this.type === "problem" && keyCode === 13) {
        if (this.beforeConfirm) {
          this.beforeConfirm(canClose => {
            if (canClose) {
              this.handleClick();
            }
          });
        } else {
          this.handleClick();
        }
      }
    },
    /**
     * @desc 关闭
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    close () {
      if (this.$parent) {
        this.$emit("input", !this.value);
        this.$emit("onClose", false);
        return;
      }
      this.onClose();
      this.value = false;
    },

    /**
     * @desc 点击确认
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    handleClick () {
      if (this.$parent) {
        return this.$emit("onSure", true);
      }
      this.onSure();
      this.value = false;
    },

    /**
     * @desc 点击确认
     * @author ZhengKai
     * @Date: 2019-08-10 16:51:58
     */
    resetPlacement () {
      const dialogStyle = this.$refs.messageBoxContainer.style;
      dialogStyle.left = dialogStyle.top = "auto";
    }
  }
};
</script>

<style lang="scss" scoped>
@import './messageBox.scss';
</style>
