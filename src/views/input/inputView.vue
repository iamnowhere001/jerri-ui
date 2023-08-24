/****************************************************************************
所属系统: 所属模块: 模块—[子模块] 创建时间: 维护人: 叶志
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="j-container">
    <h3>Input 输入框</h3>
    <div class="big-box">
      <div>
        <p class="j-mb-10">输入框高度配置 height 26 默认32</p>
        <jr-input v-model="inputVal" :height="26"></jr-input>
      </div>

      <div>
        <p class="j-mb-10">单个下划线 underline 默认 false</p>
        <jr-input v-model="inputVal" underline :height="26"></jr-input>
      </div>

      <div>
        <p class="j-mb-10">type值为text，placeholder为自定义,maxlength为20</p>
        <jr-input
          v-model="inputVal"
          placeholder="自定义"
          :maxlength="20"
        ></jr-input>
      </div>
      <div class="">
        <p class="j-mb-10">带前置图标，后置图标</p>
        <jr-input
          v-model="inputVal"
          prefixIcon="icon-fabulous_list"
          suffixIcon="icon-search"
          placeholder="正常输入框"
        ></jr-input>
      </div>
      <div class="">
        <p class="j-mb-10">搜索输入框</p>
        <jr-input
          v-model="inputVal"
          isSearch
          suffixIcon="icon-search"
          placeholder="搜索"
          @keydown.enter.native="enter"
          @icon-click="enter"
        >
        </jr-input>
      </div>
      <div class="">
        <p class="j-mb-10">禁用输入框</p>
        <jr-input
          v-model="inputVal"
          :disabled="true"
          placeholder="禁用输入框"
        ></jr-input>
      </div>
      <div class="">
        <p class="j-mb-10">只读输入框</p>
        <jr-input
          v-model="inputVal"
          :readonly="true"
          placeholder="只读输入框"
        ></jr-input>
      </div>
      <div class="">
        <p class="j-mb-10">
          type值为number,maxlength为150,showLimit为true显示限制字数
        </p>
        <jr-input
          v-model="inputVal"
          type="textarea"
          :maxlength="150"
          placeholder="文本域输入框"
          :showLimit="true"
        ></jr-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "inputView",
  label: "输入框",
  components: {},
  mixins: [],
  data() {
    return {
      inputVal: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    enter() {
      // 回车查询
      console.log(this.inputVal);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "inputView.scss";
</style>
