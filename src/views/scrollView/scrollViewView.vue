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
  label: "滚动加载更多",
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
