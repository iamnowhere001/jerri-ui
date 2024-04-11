
<template>
  <div class="content">
    <h2 class="j-mb-20">回到顶部</h2>

    <div>
      <ul>
        <li v-for="(item, index) in num"
            :key=index>{{item}}</li>
      </ul>

      <jr-page :total="101"
               :current-page.sync="currentPage"
               :current-size.sync="currentSize"
               @size-change="getSize"
               @current-change="getPage">
      </jr-page>

      <jr-top :visibilityHeight="100"></jr-top>

      <jr-button class="j-mb-100" @click="scrollTop">滚动</jr-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "topView",
  label: "回到顶部",
  data() {
    return {
      num: 200,
      currentPage: 1,
      currentSize: 10
    };
  },
  methods: {
    getSize(item) {
      this.num = item === 10 ? 200 : 500;
    },
    getPage() {
      this.num = 500;
    },
    scrollTop() {
      this.$utils.scrollTopAnimate(500);
    },
  }
};
</script>

<style lang="scss">
.jr-back-to-top {
  width: 32px;
  height: 32px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 10;
  cursor: pointer;
  background-color: #000000;
  border-radius: 4px;
  opacity: 0.3;

  &:hover {
    background-color: #000000;
    border-radius: 4px;
    opacity: 0.5;
  }
  > i {
    &.icon-top-all {
      font-size: 32px;
      color: #fff;
    }
  }
}
</style>
