/****************************************************************************

所属系统: 滚动到底加载数据操场
所属模块: 模块—[子模块]
创建时间: 2019年9月23日 11:12:55
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="j-container">
    <div>
      <jr-scroll-view maxHeight="500px"
                      @scroll-end="scrollEnd"
                      :showLoading.sync="showLoading">
        <ul>
          <li v-for="(el,i) in list"
              :key="i">{{el}}</li>
        </ul>
      </jr-scroll-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "scrollViewView",
  label: "滚动加载更多操场",
  components: {},
  mixins: [],
  data() {
    return {
      list: [],
      arr: [],
      showLoading: false
    };
  },
  created() {
    let list = [];
    let arr = [];
    Array.from({ length: 100 }, (e, i) => {
      list.push(`测试数据${i + 1}`);
      arr.push(`新增数据${i + 1}`);
    });
    this.list = list;
    this.arr = arr;
  },
  mounted() {},
  methods: {
    scrollEnd() {
      setTimeout(() => {
        this.list = this.list.concat(this.arr);
        this.showLoading = false;
      }, 3000);
    }
  }
};
</script>
<style scoped lang='scss'>
</style>
