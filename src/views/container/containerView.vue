
<template>
  <jr-container title="测试标题">
    <!-- 标题组件插槽 -->
    <template #headSlot>
      <span>页面标题</span>
    </template>

    <div style="width: 800px;">
      <jr-search-bar :searchList="searchList"
                     @click="handleClick" />
      <jr-table-pro :theadList="theadList"
                    :tbodyList="tbodyList"></jr-table-pro>
    </div>

  </jr-container>
</template>
<script>
export default {
  name: "containerView",
  label: "容器组件",
  data() {
    return {
      searchList: [
        // 加载下拉选择器
        {
          type: "input", // 公共属性，决定加载什么类型组件（可选值有select/input/datePicker/datePicker）
          label: "水果大王：", // 公共属性，组件前的提示语，默认组件间距为40px,不传则为6px
          flex: "0 0 25%",
          bindKey: "one"
        },
        {
          type: "datePickerRange",
          label: "提交日期：",
          val: [],
          startKey: "star1",
          flex: "0 0 50%",
          endKey: "end2"
        }
      ],
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
          classRoom2: "瑞兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "10:30 - 12:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "14:00 - 15:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "16:00 - 17:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        },
        {
          date: "星期一",
          time: "18:00 - 19:30",
          classRoom1: "伊泽瑞尔老师",
          classRoom2: "布里兹老师",
          classRoom3: "-"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(search) {
      console.log("点击查询的数据:", search);
    }
  }
};
</script>

