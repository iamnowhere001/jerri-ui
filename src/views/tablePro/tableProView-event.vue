<template>
  <div>
   <h2 class="j-mb-20">表格Pro事件组件</h2>

    <div class="cell">

      <div class="cell">
        <p>目前拥有的事件</p>
        <br>
        <ul>
          <li>点击列排序变动：<strong>on-sort-change</strong> 返回参数：order, th, thIndex</li>
          <li>点击行单复选：<strong>on-select</strong> 返回参数：tr, isChecked, trIndex</li>
          <li>点击行：<strong>on-row-click</strong> 返回参数：tr, isChecked, trIndex</li>
          <li>全选/取消全选：<strong>on-select-all</strong> 返回参数：isCheckedAll, checkedData</li>
          <li>附加列按钮点击：<strong>on-row-${type}</strong> 返回参数：tr, trIndex</li>
        </ul>
      </div>

      <p>
        打开控制台点击表格进入事件回调
      </p>

      <jr-table-pro :theadList="theadList"
                    :tbodyList="tbodyList"
                    :multiple="true"
                    :additionCell="true"
                    @on-sort-change="(order, th, thIndex) => {
                      debugger;
                    }"
                    @on-select="(tr, isChecked, trIndex) => {
                      debugger;
                    }"
                    @on-row-click="(tr, isChecked, trIndex) => {
                      debugger;
                    }"
                    @on-select-all="(isCheckedAll, checkedData) => {
                      debugger;
                    }"
                    @on-row-add="(tr, trIndex) => {
                      debugger;
                    }"
                    @on-row-del="(tr, trIndex) => {
                      debugger;
                    }">
      </jr-table-pro>
    </div>

  </div>
</template>

<script>
export default {
  name: "tableProEvent",
  squareLabel: "表格事件",
  data() {
    return {
      theadList: [
        { label: "日", props: "date", width: `300` },
        { label: "时间", props: "time", sort: true },
        { label: "教室1", props: "classRoom1" },
        { label: "教室2", props: "classRoom2" },
        { label: "教室3", props: "classRoom3" }
      ],
      tbodyList: [
        {
          date: "星期一",
          time: "09:00 - 10:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "伊泽瑞尔老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "10:30 - 12:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "伊泽瑞尔老师",
          classRoom3: "瑞兹老师",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "",
          temp1: "",
          temp2: "",
          temp3: ""
        },
        {
          date: "星期一",
          time: "18:00 - 19:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          temp1: "",
          temp2: "",
          temp3: "",
          classRoom3:
            "菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师菲奥娜老师"
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleClick() {}
  }
};
</script>

<style lang="scss" scoped>
.cell {
  margin: 50px;
}
.fuck {
  color: red;
}
</style>
