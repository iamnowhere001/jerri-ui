<template>
  <div>
    <h1 style="font-size: 40px;">表格Pro实验室</h1>

    <div class="cell">
      <h3>巨型长列表</h3>
      <p>
        一个控制不住的巨型列表
      </p>
      <jr-table-pro :theadList="longTheadList"
                    :tbodyList="longTbodyList"
                    :height="500"
                    :longList="true"
                    :longListLoadRowNum="50"
                    :thHeight="42"
                    :trHeight="30"
                    defaultText="">
          <template #index="{ trIndex }">
            {{ trIndex }}
          </template>
      </jr-table-pro>
    </div>

    <div class="cell">
      <h3>外观普通但是却存在着奇怪的表格</h3>
      <p>
        有些什么不对劲
      </p>
      <jr-table-pro :theadList="theadList"
                    :tbodyList="tbodyList">
      </jr-table-pro>
    </div>

  </div>
</template>

<script>
export default {
  name: "tableProExperiment",
  squareLabel: "实验室",
  data() {
    let longTheadList = [
      {
        props: "index",
        label: "序号",
        fixed: "left"
      },
      ...Array.from({ length: 1000 }, function(item, index) {
        return {
          props: `${index}`,
          label: `${index}`,
          width: 30
        };
      })
    ];

    return {
      height: 200,
      maxheight: 200,
      longTheadList,
      longTbodyList: [],

      theadList: [
        { label: "日", props: "date", width: `300` },
        { label: "时间", props: "time" },
        { label: "教室1", props: "classRoom1" },
        { label: "教室2", props: "classRoom2" },
        { label: "教室3", props: "classRoom3", noWrap: false }
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
        }
      ]
    };
  },
  created() {
    setTimeout(() => {
      console.time("渲染时间");
      this.longTbodyList = Array.from({ length: 999 }, function(item, index) {
        return {
          0: index
        };
      });
      this.$nextTick(() => {
        console.timeEnd("渲染时间");
      });
    }, 1000);
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
