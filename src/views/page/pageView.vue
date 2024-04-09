/****************************************************************************

所属系统: 组件库
所属模块: 组件—分页组件
创建时间: 2019年11月4日 08:50

***************************************************************************/
<template>
  <div class="content">
    <h2 class="j-mb-20">分页组件</h2>

    <jr-page :total="234"
             :currentPage.sync="currentPage"
             :currentSize.sync="currentSize"
             @size-change="getSize"
             @current-change="getPage">
    </jr-page>

  </div>
</template>

<script>
export default {
  name: "pageView",
  label: "分页",
  data() {
    return {
      // 页容量
      currentSize: 30,
      // 页码
      currentPage: 2
    };
  },
  methods: {
    /**
     * @desc 获取当前页容量
     * @param {Number} res 页容量
     * @author 徐勇
     * @date 2020年05月23日 09:50
     */
    getSize(res) {
      console.log("当前页容量", res);
      this.currentSize = res;
    },

    /**
     * @desc 获取当前页码
     * @param {Number} res 页码
     * @author 徐勇
     * @date 2020年05月23日 09:50
     */
    getPage(res) {
      console.log("当前页码", res);
      this.currentPage = res;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 50px;

  .nav {
    color: #666;
    padding-bottom: 5px;
    margin: 20px 0 10px 0;
    border-bottom: 1px solid #d8d8d8;
    width: 300px;
  }

  .left {
    display: inline-block;
  }

  .right {
    display: inline-block;
    margin-left: 50px;
  }
}

.page_box {
  max-width: 700px;
}
</style>
