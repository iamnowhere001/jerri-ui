<template>
  <div>
   <h2 class="j-mb-20">表格Pro长列表组件</h2>

    <div class="cell">
      <h3>长列表表格</h3>
      <p>
        一个一千列的表格，“秘技——千机操演！！”
      </p>
      <jr-table-pro :theadList="theadList"
                    :tbodyList="tbodyList"
                    :height="500"
                    :longList="true"
                    :longListLoadRowNum="30"
                    :thHeight="42"
                    :trHeight="30"
                    defaultText="">
      </jr-table-pro>
    </div>

  </div>
</template>

<script>
export default {
  name: "tableProLongList",
  squareLabel: "长列表",
  data() {
    let theadList = [];

    theadList = theadList
      .concat([
        {
          props: "",
          label: "时间段",
          fixed: "left"
        },
        {
          props: "time",
          label: "时间",
          fixed: "left"
        }
      ])
      .concat(Array.from({ length: 1000 }, function(item, index) {
        return {
          props: `date${index}`,
          label: `${index}`,
          width: 30
        };
      }));

    return {
      height: 200,
      maxheight: 200,
      theadList,
      tbodyList: []
    };
  },
  computed: {},
  created() {
    setTimeout(() => {
      console.time("渲染时间");
      const tbodyList = Array.from({ length: 56 }, function(item, index) {
        return {
          [`date${~~(Math.random() * index)}`]: index
        };
      });
      this.tbodyList = tbodyList;
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
