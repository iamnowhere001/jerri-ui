/****************************************************************************

所属系统: 组件库
所属模块: 消息提示框
创建时间: 2020-01-02


***************************************************************************/
<template>
  <transition name="fade">
    <!-- 消息提示窗，会自动消失 -->
    <div class="message"
         id="msg"
         v-show="isShow">
      <span :class="[color,align]">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "JrMessage",
  data() {
    return {
      isShow: true
    };
  },
  mounted() {
    // 组建挂载上去后调用
    this.close();
  },
  methods: {
    /**
     * @desc 关闭的方法
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    hideMsg(duration) {
      return new Promise(resolve => {
        setTimeout(resolve, duration);
      });
    },

    /**
     * @desc 关闭弹窗
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    async close() {
      await this.hideMsg(this.duration);
      this.isShow = false;
      // 动画做完删除组件
      if (this.$el.parentNode) this.$el.parentNode.removeChild(this.$el);
      if (typeof this.onClose === "function") {
        // 如果有回调,调用回调并且将实例作为参数传递
        this.onClose(this);
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "./message.scss";
</style>
