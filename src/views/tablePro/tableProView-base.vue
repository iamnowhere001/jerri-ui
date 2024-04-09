<template>
  <div>
   <h2 class="j-mb-20">表格Pro基础形态组件</h2>

    <div class="cell">
      <h3>单选表格</h3>
      <p>
        配置 multiple 为 false，只会展示每一行的选择按钮，但没有全选按钮
      </p>
      <jr-table-pro
                    ref="tablePro"
                    :theadList="theadList"
                    :tbodyList="tbodyList"
                    :multiple="true"
                    :beforeRowSelectChange="() => {
                      $refs.tablePro
                      return true;
                    }"
                    :clickToSelect="true"
                    >
      </jr-table-pro>
    </div>


  </div>
</template>

<script>
export default {
  name: "tableProBase",
  squareLabel: "基础表格",
  data() {
    return {
      height: 200,
      maxheight: 200,
      allPercentTheadList: [
        { label: "10%", props: "date", width: `10%` },
        { label: "15%", props: "time", width: `15%` },
        { label: "20%", props: "classRoom1", width: `20%` },
        { label: "25%", props: "classRoom2", width: `25%` },
        { label: "30%", props: "classRoom3", width: `30%` }
      ],
      theadList: [
        { label: "日", props: "date", width: `300` },
        { label: "时间", props: "time" },
        { label: "教室1", props: "classRoom1" },
        { label: "教室2", props: "classRoom2" },
        { label: "教室3", props: "classRoom3", noWrap: false,

        operateBtns: [
          {
            type: "eye",
            hidden({trIndex}) {
              return trIndex == 1
            },
            attr({ trIndex, tr, thIndex, th, value}) {
              return {
                class: `${trIndex > 1 ? 'j-disabled' : ""}`,
                title: "查看"
              }
            },
            event({ trIndex, tr, thIndex, th, value}) {
              return {
                click: () => {
                  debugger
                }
              }
            }
          },
          {
            type: "edit"
          },
          {
            type: "del"
          }
        ]
        }
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
