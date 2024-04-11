<!--
/****************************************************************************
所属系统: 组件库
所属模块: 组件—轮播图组件
创建时间: 2020年03月05日 11:12
***************************************************************************/
-->
<template>
  <div class="content">
    <h2 class="j-mb-20">轮播图组件</h2>

    <p class="nav">按钮操作显示外面</p>
    <jr-swiper
      :bannerList="list"
      :isOutside="true"
      :boxWidth="'680px'"
      :boxHeight="'400px'"
      ref="swiper"
      @on-click="getBanner"
    >
    </jr-swiper>

    <P class="nav">按钮操作显示里面</P>
    <jr-swiper
      :bannerList="list"
      :isOutside="false"
      :boxWidth="'680px'"
      :boxHeight="'400px'"
      ref="swiper"
      @on-click="getBanner"
    ></jr-swiper>

    <P class="nav">不显示阴影</P>
    <jr-swiper
      :bannerList="list"
      :isOutside="false"
      :isShadow="false"
      :boxWidth="'680px'"
      :boxHeight="'400px'"
      ref="swiper"
      @on-click="getBanner"
    ></jr-swiper>

    <P class="nav">单张图片 680 * 400</P>
    <jr-swiper
      :bannerList="list2"
      :isOutside="false"
      :boxWidth="'680px'"
      :boxHeight="'400px'"
      ref="swiper"
      @on-click="getBanner"
    ></jr-swiper>

    <P class="nav">单张图片 680 * 300</P>
    <jr-swiper
      :bannerList="list2"
      :isOutside="false"
      :boxWidth="'680px'"
      :boxHeight="'300px'"
      ref="swiper"
      @on-click="getBanner"
    ></jr-swiper>
  </div>
</template>

<script>
export default {
  name: "swiperView",
  label: "轮播图",
  data() {
    return {
      list: [
        {
          image:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/dda/f4073eebe957a5f51252c7f8a75755c7/Banner%20680x400_1.png",
        },
        {
          image:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/dda/f4073eebe957a5f51252c7f8a75755c7/Banner%20680x400_1.png",
        },
      ],
      list2: [
        {
          image:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/dda/f4073eebe957a5f51252c7f8a75755c7/Banner%20680x400_1.png",
        },
      ],
    };
  },
  methods: {
    // 获取选中对象
    getBanner(res) {
      console.log(res);
    },
  },
};
</script>

