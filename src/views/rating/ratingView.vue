/****************************************************************************

所属系统: 组件库
所属模块: 评级组件操场
创建时间: 2019年7月11日 11:42:28
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="j-pt-30 j-pl-30">
    <h2 class="j-pb-30">没等级描述</h2>
    <div class="box j-pb-30">
      <jr-rating v-model="star"></jr-rating>
    </div>
    <h2 class="j-pb-30">有等级描述</h2>
    <div class="box j-pb-30">
      <jr-rating v-model="star1"
                 :levelDesc='["不再考虑", "不重要", "一般", "重要", "非常重要"]'></jr-rating>
    </div>
  </div>
  </table>
</template>
<script>
export default {
  name: "ratingView",
  label: "星星评级操场",
  data() {
    return {
      star: 0,
      star1: 2
    };
  },

  watch: {
    star(num) {
      console.log(`选择了${num}个星`);
    }
  },
  methods: {}
};
</script>
<style scoped lang='scss'>
.box {
  width: 140px;
}
.jsx-table {
  tr {
    height: 40px;
  }
  th,
  td {
    height: 40px;
    border: 1px solid #000;
  }
}
</style>
