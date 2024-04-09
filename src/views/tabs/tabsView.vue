/****************************************************************************

所属系统: 组件库
所属模块: 组件 - tab切换组件



***************************************************************************/

<template>
  <div class="content">

    <h2 class="j-mb-20">tab切换组件</h2>

    <!-- 常规按钮高度 -->
    <div class="left">
      <p class="nav">卡片页签</p>
      <jr-tabs :list="list"
               v-model="val"
               type="card"></jr-tabs>

      <p class="nav">椭圆页签</p>
      <jr-tabs :list="list"
               v-model="val2"
               type="ellipse"></jr-tabs>

      <p class="nav">底线页签</p>
      <jr-tabs :list="list"
               v-model="val3"
               type="line"></jr-tabs>

    </div>

  </div>
</template>

<script>
export default {
  name: "tabsView",
  label: "tabs",
  data() {
    return {
      list: [
        {
          label: "校区档案",
          props: "schoolArchive",
          badge: {
            value: 3
          }
        },
        {
          label: "人事档案",
          props: "HRArchive",
          badge: {
            value: 1000
          }
        },
        {
          label: "巡查记录",
          props: "record",
          badge: {
            isDot: true,
            animation: "diffusion"
          }
        },
        {
          label: "权益金",
          props: "ppp"
        }
      ],
      val: "schoolArchive",
      val2: "schoolArchive",
      val3: "schoolArchive"
    };
  },
  methods: {}
};
</script>


<style lang="scss">
.content {
  padding: 20px 50px;
  .nav {
    color: #666;
    padding-bottom: 5px;
    margin: 50px 0 10px 0;
    border-bottom: 1px solid #d8d8d8;
    width: 600px;
  }
  .left {
    display: inline-block;
  }

  .right {
    display: inline-block;
    margin-left: 50px;
  }
}
</style>
