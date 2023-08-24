<!--
/****************************************************************************

所属系统: 组件库
所属模块: 轮播图组件
创建时间: 2020-01-02
维护人: 杨文杰
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div class="swiper-content" @click="oneBanner">
    <div
      class="swiper-box"
      ref="swiperCon"
      :class="{
        outside: isOutside,
        shadow: isShadow,
        'no-drop': bannerList.length === 1,
      }"
      @mouseenter="enter()"
      @mouseleave="leave()"
    >
      <swiper
        :options="swiperOption"
        class="swiper-wrap"
        ref="mySwiper"
        v-if="bannerList.length"
      >
        <swiper-slide v-for="(item, index) in bannerList" :key="index">
          <slot :item="item"><img :src="item.image"/></slot>
        </swiper-slide>
      </swiper>
      <!-- 常见的小圆点 -->
      <div
        class="swiper-pagination"
        slot="pagination"
        v-show="bannerList.length !== 1"
      >
        >
      </div>

      <!-- 左右箭头显示 -->
      <div class="arrow-box" v-show="bannerList.length !== 1">
        <div class="swiper-button-box left-btn">
          <div>
            <div class="swiper-button-black swiper-prev" slot="button-prev">
              <i class="icon-wes2-more"></i>
            </div>
          </div>
        </div>

        <div class="swiper-button-box right-btn">
          <div class="swiper-button-black swiper-next" slot="button-next">
            <i class="icon-wes2-more"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入swiper轮播插件
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "JrSwiper",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    // 轮播图列表
    bannerList: {
      type: Array,
      default: [],
    },
    // 操作按钮是否显示在外面
    isOutside: {
      type: Boolean,
      default: false,
    },
    // 容器宽度
    boxWidth: {
      type: String,
      default: "400px",
    },
    // 容器高度
    boxHeight: {
      type: String,
      default: "680px",
    },
    // 是否显示容器阴影
    isShadow: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 2500,
    },
    //  是否自动播放
    isAutoplay: {
      type: [Boolean, Object],
      default() {
        return {
          delay: 2500,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 */
          disableOnInteraction: false,
        };
      },
    },
  },
  mixins: [],
  data() {
    return {
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，
        //假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: this.isAutoplay,
        //左右点击
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
        on: {
          click: (res) => {
            this.$emit(
              "on-click",
              this.bannerList[this.swiper.activeIndex - 1]
            );
          },
        },
        effect: "slide",
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        cssMode: true,
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
        },
      },
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    /**
     * @desc 返回swiper实例
     * @author 陈泽光
     */
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    /**
     * @desc 组件初始化
     * @author 陈泽光
     * @date 2020年1月16日17:20:06 补充注释
     */
    init() {
      let dom = this.$refs.swiperCon;
      dom.style.height = this.boxHeight;
      dom.style.width = this.boxWidth;

      if (this.autoplay) {
        this.swiper.params.autoplay.delay = this.delay;
        if (this.bannerList.length === 1) {
          this.swiper.autoplay.stop();
        }
      }
    },
    /**
     * @desc 返回点击的banner图信息
     * @author 陈泽光
     * @date 2020年1月16日17:20:06 补充注释
     */
    oneBanner() {
      if (this.bannerList.length === 1) {
        this.$emit("on-click", this.bannerList[0]);
      }
    },
    /**
     * @desc 暂停轮播
     * @author 陈泽光
     * @date 2020年1月16日17:20:06 补充注释
     */
    enter() {
      this.isAutoplay && this.swiper.autoplay.stop();
    },
    /**
     * @desc 开始轮播
     * @author 陈泽光
     * @date 2020年1月16日17:20:06 补充注释
     */
    leave() {
      this.isAutoplay && this.swiper.autoplay.start();
    },
  },
};
</script>
<style scoped lang="scss">
@import "./swiper.min.css";
@import "./swiper.scss";
</style>
