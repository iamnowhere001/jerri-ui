<template>
  <div class="jr-select-options">
    <!-- 超过7条数据显示搜索功能 -->
    <div @click.stop
         class="search"
         v-if="isSelect && list.length > 7">
      <label for="search-inp"
             class="icon-search"></label>
      <input id="search-inp"
             type="text"
             placeholder="搜索"
             @input="search($event)" />
    </div>
    <ul v-show="isSelect"
        :class="{
        'show-search': list.length > 7,
      }"
        ref="menu">
      <li @click="selItem('select')">
        {{ reSelect }}
      </li>
      <li v-for="(el, i) in showList"
          :key="i"
          :title="el[title]"
          class="text_ellipsis"
          @click.stop="selItem(i, el)">
        {{ el.label }}
      </li>
      <li class="disabled"
          v-if="!searchArr.length">{{$t('select_无匹配结果')}}</li>
    </ul>

  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      showList: [],
      isSelect: false,
      list: [],
      reSelect: 1,
      title: "",
      searchArr: ""
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    // 点击选项
    selItem(i, el) {
      // 点击选项传递事件
      el = el && el.label;
      this.$emit("selected");
      // 选择还原选项按钮
      if (i === "select") {
        this.showVal = "";
        this.$emit("change", undefined);
        this.dispatch("JrFormItem", "form-change", [undefined]);
        return;
      }
      // 隐藏下拉框
      this.isSelect = false;
      this.showVal = el;
      // 查找对应项
      let item = this.items.find(res =>
        this.valKey ? res[this.valKey] === el : res === el
      );
      // 传给父组件当前选择的对象
      let res = this.valKey && this.valSelect ? item[this.valSelect] : item;
      this.$emit("change", res);
      this.dispatch("JrFormItem", "form-change", [res]);
    }
  }
};
</script>

<style lang="scss" scoped>
.jr-select-options {
  position: absolute;
  min-width: 130px;
  top: 50%;
  left: 50%;
  z-index: 999;
}
</style>
