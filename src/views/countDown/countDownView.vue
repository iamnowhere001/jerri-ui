
<template>
  <div class="content">
    <h2 class="j-mb-20">倒计时组件</h2>

    <jr-button class="j-mb-20"
               @click="startCount">开始倒计时</jr-button>

    <!-- 倒计时组件 -->
    <jr-count-down :startTime="startTime"
                   :endTime="endTime"
                   :autostart="false"
                   :type="true"
                   prefixIcon="icon-i_chat"
                   @callback="callback"
                   ref="countdown"></jr-count-down>

    <!-- 计时 -->
    <p class="j-mt-20">时钟模式</p>
    <jr-count-down></jr-count-down>

    <p class="j-mt-20">自动倒计时</p>
    <jr-count-down :startTime="new Date().getTime()"
                   :endTime="new Date().getTime() + 10 * 60 * 1000"
                   :autostart="false"
                   @callback="callback"
                   ref="countdown2"></jr-count-down>

  </div>
</template>

<script>
export default {
  name: "countDownView",
  label: "倒计时",
  data() {
    return {
      // 开始时间 --> 时间戳
      startTime: 0,
      // 结束时间
      endTime: 0,
      endTime2: 0
    };
  },
  created() {},
  computed: {},
  methods: {
    /**
     * @desc 结束回调
     * @author 徐勇
     * @date 2020-05-18 15:24
     */
    callback() {
      this.$msg("时间到了");
    },

    /**
     * @desc 开始倒计时
     * @author 徐勇
     * @date 2020-05-18 15:24
     */
    startCount() {
      // 开始时间 当前时间
      this.startTime = new Date().getTime();
      // 截止时间 10min 后
      this.endTime = this.startTime + 10 * 60 * 1000;
      this.$refs.countdown.countTime();
    },

    /**
     * @desc 开始计时
     * @author 徐勇
     * @date 2020-05-18 15:24
     */
    startCount2() {
      // 当天0点
      this.startTime = new Date(new Date().toLocaleDateString()).getTime();
      // 当前时间
      this.endTime2 = new Date().getTime();
      this.$refs.countdown2.countTime();
    }
  }
};
</script>

