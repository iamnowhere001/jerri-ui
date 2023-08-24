<template>
  <div class="j-container">
    <h3 class="j-mb-20">普通的单行查询隐藏搜索按钮</h3>
    <jr-search-bar
      :searchList="searchList"
      @click="handleClick"
      :isShowQuery="false"
      @iconClick="handleIconClick"
    >
    </jr-search-bar>
    <div class="j-pt-30"></div>
    <h3 class="j-mb-20">单行查询：后面出现自定义按钮</h3>
    <jr-search-bar :searchList="searchList" @click="handleClick">
      <template #default>
        <div class="j-ml-10">
          <jr-button>其他按钮</jr-button>
        </div>
      </template>
    </jr-search-bar>
    <div class="j-pt-30"></div>
    
    <h3 class="j-mb-20">普通的高级查询</h3>
    <jr-search-bar
      :searchList="searchList1"
      isAdvanced
      @click="handleClick"
      @exportFile="exportFile"
      @watchItem="watchItem"
    >
      <template #label-one>
        <span><i class="j-icon icon-edit"></i>公司：</span>
      </template>
      <template #acc>
        <jr-input></jr-input>
      </template>
    </jr-search-bar>
    <div class="j-pt-30"></div>
    <h3 class="j-mb-20">
      普通的高级查询,无导出按钮，无收起查询条件,无重置按钮
    </h3>
    <jr-search-bar
      :searchList="searchList2"
      isAdvanced
      :isReset="false"
      :isFold="false"
    >
      <template #acc>
        <jr-input></jr-input>
      </template>
    </jr-search-bar>
    <div class="j-pt-30"></div>
    <h3 class="j-mb-20">多查询条件,查询按钮不跨行，无导出按钮的情况</h3>
    <jr-search-bar :searchList="searchList3" :interBank="false" isAdvanced>
      <template #acc>
        <jr-input></jr-input>
      </template>
    </jr-search-bar>
    <div class="j-pt-30"></div>
    <h3 class="j-mb-20">多查询条件,查询按钮跟随</h3>
    <jr-search-bar :searchList="searchList3" isBtnFollow isAdvanced>
      <template #acc>
        <jr-input></jr-input>
      </template>
      <div>777</div>
    </jr-search-bar>

    <h3 class="j-mb-20">响应式的查询组件</h3>
    <jr-search-bar :searchList="responsiveList" isResponsive isAdvanced>
    </jr-search-bar>
  </div>
</template>

<script>
export default {
  name: "searchBarView",
  label: "查询组件操场",
  data() {
    return {
      inputVal: "",
      searchList: [
        // 加载下拉选择器
        {
          type: "input", // 公共属性，决定加载什么类型组件（可选值有select/input/datePicker/datePicker）
          label: "水果大王：", // 公共属性，组件前的提示语，默认组件间距为40px,不传则为6px
          flex: "0 0 25%",
          bindKey: "one",
          suffixIcon: "icon-choose",
          prefixIcon: "icon-choose",
          // 输入框组件属性配置
          attrConfig: {},
          // 输入框事件配置
          eventConfig: {
            blur() {
              console.log(`blur`);
            },
            focus() {
              console.log(`focus`);
            },
            change(val) {
              console.log(`change`, val);
            },
            input(val, dom) {
              console.log(`input`, val, dom);
            },
          },
        },
        {
          type: "datePicker",
          label: "日历选择：",
          flex: "0 0 25%",
          bindKey: "date",
          attrConfig: {
            min: this.$utils.date(new Date(), "YYYY-MM-DD"),
            btns: ["clear"],
          },
          eventConfig: {
            "on-focus"() {
              console.log("focus");
            },
            "on-blur"() {
              console.log("blur");
            },
            change(val) {
              console.log(`change`, val);
            },
          },
        },
        {
          type: "select",
          val: "杨梅红艺术教育集团",
          attrConfig: {
            items: ["杨梅红艺术教育集团", "杰人软件", "邓肯舞蹈"],
            isRequired: true,
          },
          eventConfig: {
            "on-focus"() {
              console.log("focus");
            },
            "on-blur"() {
              console.log("blur");
            },
            change(val) {
              console.log(`change`, val);
            },
          },
          label: "公司：",
          flex: "0 0 25%",
          bindKey: "one",
        },
        {
          type: "input",
          marginLeft: "0",
        },
      ],

      searchList1: [
        // 加载下拉选择器
        {
          type: "select",
          val: "",
          attrConfig: {
            items: [
              { groupName: "杨梅红", groupId: 1 },
              { groupName: "邓肯", groupId: 2 },
              { groupName: "杰人", groupId: 3 },
            ],
            valKey: "groupName",
            valSelect: "groupId",
            reSelect: "全部",
          },
          label: "公司：",
          flex: "0 0 25%",
          watch: true,
          onChange(newVal, oldVal) {
            console.log(newVal, oldVal);
          },
          bindKey: "one",
        },
        {
          type: "datePickerRange",
          label: "日期范围",
          flex: "0 0 50%",
          labelWidth: "80px",
          labelJustify: true,
          val: [],
          watch: true,
          onChange(newVal, oldVal) {
            console.log(newVal, oldVal);
          },
          startKey: "start",
          startAttrConfig: {
            btns: ["clear"],
          },
          startEventConfig: {
            // "on-focus"() {
            //   console.log("focus");
            // },
            // "on-blur"() {
            //   console.log("blur");
            // },
            // change(val) {
            //   console.log(val);
            // }
          },
          endKey: "end",
          endArrtConfig: {
            btns: ["confirm"],
          },
          endEventConfig: {
            "on-focus"() {
              console.log("focus");
            },
            "on-blur"() {
              console.log("blur");
            },
            change(val) {
              console.log(val);
            },
          },
        },
        {
          type: "input",
          label: "输入框：",
          flex: "0 0 25%",
          bindKey: "two",
          marginRight: "0",
        },
        {
          type: "slot",
          label: "学费折扣率（%）：",
          bindKey: "acc",
          flex: "0 0 25%",
        },
        {
          type: "select",
          val: "大饼",
          label: "收银员",
          labelWidth: "80px",
          labelJustify: true,
          attrConfig: {
            items: ["橘子", "西瓜", "大饼"],
          },
          flex: "0 0 25%",
          bindKey: "two",
        },
        {
          type: "select",
          val: "大饼",
          label: "收银员：",
          attrConfig: {
            items: ["橘子", "西瓜", "大饼"],
          },
          flex: "0 0 25%",
          bindKey: "two",
          marginRight: "0",
          maxWidth: "25%",
        },
      ],
      searchList2: [
        // 加载下拉选择器
        {
          type: "select",
          val: "杨梅红艺术教育集团",
          attrConfig: {
            items: ["杨梅红艺术教育集团", "杰人软件", "邓肯舞蹈"],
            reSelect: "全部",
          },
          label: "公司：",
          flex: "0 0 25%",
          bindKey: "one",
        },
        {
          type: "datePickerRange",
          label: "日期范围：",
          flex: "0 0 50%",
          val: [],
          startKey: "start",
          endKey: "end",
        },
        {
          type: "input",
          label: "输入框：",
          flex: "0 0 25%",
          bindKey: "two",
          marginRight: "0",
        },
        {
          type: "slot",
          label: "学费折扣率（%）：",
          bindKey: "acc",
          flex: "0 0 25%",
        },
        {
          type: "jsx",
          label: "jsx渲染：",
          bindKey: "dd",
          jsxRender: (h) => {
            // return <div class="teacher">李老师</div>;
            return (
              <jr-input value={this.inputVal} onInput={this.input}></jr-input>
            );
          },
          flex: "0 0 25%",
        },
        {
          type: "select",
          val: "大饼",
          label: "收银员：",
          attrConfig: {
            items: ["橘子", "西瓜", "大饼"],
          },
          reSelect: "随便写",
          flex: "0 0 25%",
          bindKey: "two",
        },
      ],
      searchList3: [
        {
          type: "select",
          val: "杨梅红艺术教育集团",
          attrConfig: {
            items: ["杨梅红艺术教育集团", "杰人软件", "邓肯舞蹈"],
            reSelect: "全部",
          },
          label: "公司：",
          flex: "0 0 25%",
          bindKey: "one",
        },
        {
          type: "datePickerRange",
          label: "日期范围：",
          flex: "0 0 50%",
          val: [],
          startKey: "start",
          endKey: "end",
        },
        {
          type: "input",
          label: "输入框：",
          flex: "0 0 25%",
          bindKey: "two",
          marginRight: "0",
        },
        {
          type: "slot",
          label: "学费折扣率（%）：",
          bindKey: "acc",
          flex: "0 0 25%",
        },
        {
          type: "jsx",
          label: "jsx渲染：",
          bindKey: "dd",
          jsxRender: (h) => {
            // return <div class="teacher">李老师</div>;
            return (
              <jr-input value={this.inputVal} onInput={this.input}></jr-input>
            );
          },
          flex: "0 0 25%",
        },
      ],
      responsiveList: [
        {
          type: "select",
          val: "杨梅红艺术教育集团",
          attrConfig: {
            items: ["杨梅红艺术教育集团", "杰人软件", "邓肯舞蹈"],
            isRequired: true,
          },
          label: "公司",
          flex: "0 0 25%",
          bindKey: "one",
        },
        {
          type: "input",
          label: "label对齐",
          labelWidth: "110px",
          labelJustify: true,
          flex: "0 0 25%",
        },
        {
          type: "input",
          marginLeft: "0",
          flex: "1 0 200px",
        },
        {
          type: "input",
          label: "响应式可能排在最后一个",
          flex: "1 0 350px",
        },
        {
          type: "input",
          label: "响应式可能不够位置排掉下去",
          maxWidth: "350px",
        },
        {
          type: "input",
          label: "一个输入框",
          flex: "0 0 25%",
        },
        {
          type: "input",
          label: "和上面label对齐",
          labelWidth: "110px",
          labelJustify: true,
          flex: "0 0 25%",
        },
      ],
    };
  },
  methods: {
    handleClick(search) {
      console.log("点击查询的数据:", search);
    },
    exportFile(search) {
      console.log(search);
    },
    input(a, b) {
      this.inputVal = a;
      console.log(a, b);
    },
    watchItem(newVal, oldVal) {
      console.log("监听所有watch项", newVal, oldVal);
    },
    handleIconClick(item, element) {
      console.log("点击icon事件", item, element);
    },
  },
};
</script>

<style lang="scss" scoped>
.j-container {
  /deep/ .jr-search-container {
    .teacher {
      color: $--color-c2;
      font-weight: normal;
    }
  }
}
</style>
