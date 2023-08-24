<template>
  <div>
    <h1 style="font-size: 40px;">表格Pro操场</h1>

    <h2>
      表格中只要你能看见的，都能自定义改造
    </h2>

    <div class="cell">
      <p>目前拥有的插槽</p>
      <br>
      <h3>表格头部：</h3>
      <ul>
        <li>整个表格头部：<strong>thead</strong> 无参数返回</li>
        <li>单复选列表头单元格：<strong>thCheckbox</strong> 无参数返回</li>
        <li>针对某列表头单元格：<strong>thead-${列字段名}</strong> 返回参数：{ th, thIndex }</li>
      </ul>

      <br>
      <h3>表体：</h3>
      <ul>
        <li>没有数据时：<strong>noData</strong> 无参数返回</li>
        <li>针对某行的列表体单复选单元格：<strong>checkbox-${行序号}</strong> 返回参数：{ tr, trIndex }</li>
        <li>全部单复选列表体单元格：<strong>checkbox</strong> 返回参数：{ tr, trIndex }</li>
        <li>针对某列的表体单元格：<strong>${列字段名}</strong> 返回参数：{ tr, trIndex, th, thIndex, props, value, row }</li>
      </ul>
    </div>

    <div class="cell">
      <h3>插槽表格</h3>
      <jr-table-pro :theadList="theadList"
                    :tbodyList="tbodyList"
                    multiple>

        <div slot="thCheckbox">
          表头单复选自定义
        </div>

        <div slot="thead-date"
             slot-scope="{th, thIndex}">
          查看表头单元格回调参数
          <button @click="() => {
               th, thIndex;
               debugger;
               }"
                  title="需要先打开控制台">查看</button>
        </div>

        <div slot="checkbox-0">
          第一行的单复选自定义
        </div>

        <div slot="date"
             slot-scope="{row, th, thIndex, tr, trIndex, props, value}">
          查看表体单元格回调参数
          <button @click="() =>{
               row, th, thIndex, tr, trIndex, props, value;
               debugger;
               }"
                  title="需要先打开控制台">查看</button>
        </div>
      </jr-table-pro>
    </div>

    <div class="cell">
      <h3>无内容表格</h3>
      <jr-table-pro :theadList="theadList"
                    :tbodyList="[]">
        <div slot="thead">
          <h1>自定义表格头部插槽</h1>
        </div>
        <div slot="noData">
          <h1>自定义没有内容的内容</h1>
        </div>
      </jr-table-pro>
    </div>

  </div>
</template>

<script>
export default {
  name: "tableProSlot",
  squareLabel: "插槽表格",
  data() {
    return {
      theadList: [
        { label: "日", props: "date" },
        { label: "时间", props: "time" },
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
          classRoom3: "菲奥娜老师"
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
