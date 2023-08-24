/****************************************************************************
所属系统: 组件库 所属模块: 分页器 创建时间: 2020-01-02 维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="page_box clearfix"
       v-show="total > hideTotal">
    <div class="page_filter">
      <label>{{ $t("page_每页") }}&nbsp;&nbsp;</label>
      <jr-select :items="pageOptions"
                 @change="getSize"
                 :is-required="true"
                 v-model="pageSize"></jr-select>
      <span>{{ $t("page_项") }}</span>
      <span>{{ $t("page_共{}项记录", total) }}</span>
    </div>
    <div class="page_index">
      <a class="prev icon-last-page"
         @click="processPage('prev')"
         :class="{ 'no-drop': currentPage === 1 }"
         href="javascript:;"
         :title="$t('page_上一页')"></a>
      <a href="javascript:;"
         @click="processPage(el)"
         v-for="(el, i) in pages"
         :key="i"
         :class="{ disable: el === '...', active: currentPage === el }">{{ el }}</a>
      <a class="next icon-last-page"
         @click="processPage('next')"
         :class="{ 'no-drop': currentPage === totalData }"
         href="javascript:;"
         :title="$t('page_下一页')"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "JrPage",
  props: {
    // 总条数
    total: {
      type: Number,
      required: true,
    },
    // 分页量
    pageOptions: {
      type: Array,
      default() {
        return [15, 30, 50, 100]
      },
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // 当前页容量
    currentSize: {
      type: Number,
      default: 15,
    },
  },
  data() {
    let currentSize = this.currentSize;
    return {
      // 隐藏分页组件条数
      hideTotal: currentSize,
      pageSize: currentSize,
    };
  },

  created() {
    this.pageSize = this.currentSize;
  },
  watch: {
    currentSize(val) {
      if (val) {
        this.pageSize = val;
      }
    },
  },
  // 选项框组件
  computed: {
    // 分页数组
    pages() {
      return this.makePage(this.totalData, this.currentPage);
    },
    // 总页数
    totalData() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  methods: {
    /**
     * @desc  获取页容量
     * @param {Number} size 页容量
     */
    getSize(size) {
      // 获取最新的页容量显示在下拉框中
      this.pageSize = size;
      this.$emit("update:currentSize", size);
      this.$emit("size-change", size);
    },

    /**
     * @desc  处理翻页逻辑
     * @param {Number} curPage 当前页
     */
    processPage(curPage) {
      // 点击原来页面直接返回  当前第一页 点击上一页直接返回  最后一页点击下一页直接返回
      if (
        curPage === this.currentPage ||
        (curPage === "prev" && this.currentPage === 1) ||
        (curPage === "next" && this.currentPage === this.totalData)
      ) {
        return;
      }
      // 点击上一页时当前页码 - 1, 点击下一页时当前页码 + 1, 直接点击相应页码直接赋值
      let page =
        curPage === "prev"
          ? this.currentPage - 1
          : curPage === "next"
            ? this.currentPage + 1
            : curPage;
      // 获取当前页数传给父组件
      this.$emit("update:currentPage", page);
      this.$emit("current-change", page);
    },

    /**
     * @desc  获取分页数组
     * @param {Number} total 总条数
     * @param {Number} cur  当前页
     */
    makePage(total, cur) {
      let result = [];
      let baseCount = 9; //总共元素个数
      let surplus = 6; //只出现一个省略号 剩余元素个数
      let startPosition = 5; //前面出现省略号的临界点
      let endPosition = total - 4; //后面出现省略号的临界点
      //全部显示 不出现省略号
      if (total <= baseCount - 2)
        return Array.from({ length: total }, (v, i) => i + 1);
      //需要出现省略号
      if (cur < startPosition) {
        //1.只有后面出现省略号
        result = [
          ...Array.from({ length: surplus }, (v, i) => i + 1),
          "...",
          total,
        ];
      } else if (cur > endPosition) {
        //2.只有前边出现省略号
        result = [
          1,
          "...",
          ...Array.from({ length: surplus }, (v, i) => total - surplus + i + 1),
        ];
      } else {
        //3.两边都有省略号
        result = [
          1,
          "...",
          ...Array.from({ length: 5 }, (v, i) => cur - 2 + i),
          "...",
          total,
        ];
      }
      return result;
    },
  },
};
</script>

<style scoped lang="scss">
@import "page.scss";
</style>
