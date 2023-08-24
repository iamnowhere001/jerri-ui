
/****************************************************************************

所属系统: 组件库
所属模块: 倒计时
创建时间: 2020年05月18日 14:54
维护人: 徐勇
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="jr-count-down">
    <!-- 前置图标 -->
    <i class="j-mr-5"
       :class="prefixIcon"></i>

    <!-- 分、秒 -->
    <template v-if="!showhour">
      <span>{{minute}}{{splitsymbol.split("-")[1]?splitsymbol.split("-")[1]:''}}{{second}}{{splitsymbol.split("-")[2]?splitsymbol.split("-")[2]:''}}</span>
    </template>

    <!-- 时、分、秒 -->
    <template v-if="showhour">
      <span>{{hour}}{{splitsymbol.split("-")[0]?splitsymbol.split("-")[0]:''}}{{minute}}{{splitsymbol.split("-")[1]?splitsymbol.split("-")[1]:''}}{{second}}{{splitsymbol.split("-")[2]?splitsymbol.split("-")[2]:''}}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "JrCountDown",
  props: {
    // 前置图标
    prefixIcon: {
      type: String,
      default: "icon-i_notice"
    },
    // 开始时间 时间戳
    startTime: {
      type: Number,
      default: new Date(new Date().toLocaleDateString()).getTime()
    },
    // 结束时间 时间戳
    endTime: {
      type: Number,
      default: new Date().getTime()
    },
    // 为0时不显示小时
    autoshow: {
      type: Boolean,
      default: false
    },
    // 分割符
    splitsymbol: {
      type: String,
      default: ":-:"
    },
    // 是否自动开始倒计时
    autostart: {
      type: Boolean,
      default: true
    },
    // 默认计时方式为闹钟
    type: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 计时器对象
      timer: null,
      // 秒级时间戳
      time: 0,
      // 时间对象
      timeObj: {},
      // 天
      day: 0,
      // 小时
      hour: 0,
      // 分钟
      minute: 0,
      // 秒
      second: 0,
      // 小时为0是否展示
      showhour: true
    };
  },
  created() {},
  mounted() {
    // 获取倒计时时间
    this.time = (this.endTime - this.startTime) / 1000;
    this.currentTime(this.time);
    if (this.autostart) {
      // 开始计时
      this.countTime();
    }
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @desc 开始计时
     * @author 徐勇
     * @date 2020-05-18 15:02
     */
    countTime() {
      // 计算时间差 10位 秒
      this.time = (this.endTime - this.startTime) / 1000;
      // 开启计算器
      this.timer = setInterval(() => {
        if (this.time !== 0) {
          // 计时 & 倒计时
          this.type ? this.time++ : this.time--;
        }

        if (this.time === 0) {
          // 计时结束
          this.timeToEnd();
          // 清除计算器
          clearInterval(this.timer);
        }
        // 更新当前时间
        this.currentTime(this.time);
      }, 1000);
    },

    /**
     * @desc 当前时间
     * @param {Number} time 时间 时间戳
     * @author 徐勇
     * @date 2020-05-18 15:02
     */
    currentTime(time) {
      // 判断当前是否时分秒的值是否大于10
      let add = num => {
        return num < 10 ? "0" + num : num;
      };

      // 时间对象
      this.timeObj = {
        seconds: Math.floor(time % 60),
        minutes: Math.floor(time / 60) % 60,
        hours: Math.floor(time / 60 / 60) % 24,
        days: Math.floor(time / 60 / 60 / 24)
      };

      this.hour = `${add(this.timeObj.hours)}`;
      this.minute = `${add(this.timeObj.minutes)}`;
      this.second = `${add(this.timeObj.seconds)}`;

      // 不显示小时
      if (this.autoshow && this.hour === "00") {
        this.showhour = false;
      }
    },

    /**
     * @desc 时间结束回调
     * @author 徐勇
     * @date 2020-05-18 15:10
     */
    timeToEnd() {
      this.$emit("callback");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./countDown.scss";
</style>
