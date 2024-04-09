<template>
  <div>
   <h2 class="j-mb-20">表格Pro树状组件</h2>

    <h1 style="font-size: 120px">暂未完成</h1>

    <div class="cell">
      <h3>树状表格</h3>
      <jr-table-pro
                    ref="table"
                    :theadList="theadList"
                    :treeTableConfig="treeTableConfig"
                    :tbodyList.sync="tbodyList"
                    @on-treeRow-click="treeRowClick"
                    >
      </jr-table-pro>
    </div>

  </div>
</template>

<script>
export default {
  name: "tableProTree",
  squareLabel: "树状表格",
  data() {
    return {
      theadList: [
        {
          props: "assessment",
          label: "考核方"
        },
        {
          props: "project",
          label: "考核项目"
        },
        {
          props: "target",
          label: "考核指标"
        },
        {
          props: "norm",
          label: "指标评分准则"
        },
        {
          props: "fraction",
          label: "分数"
        },
        {
          props: "sum",
          label: "考核项总分"
        },
        {
          props: "operation",
          label: "操作"
        }
      ],
      tbodyList: [],
      //  树配置
      treeTableConfig: [
        {
          //  一级树名称
          label: "教务指导评分",
          //  一级树下的子列表，共用的列渲染函数
          JSXRender: {
            sum(h) {
              return "<div></div>"
            },
            operation(h) {
              return "<div></div>"
            }
          }
        },
        {
          //  一级树名称
          label: "校长评分",
          //  一级树下的子列表，共用的列渲染函数
          JSXRender: {
            sum(h) {
              return "<div></div>"
            },
            operation(h) {
              return "<div></div>"
            }
          }
        }
      ]
    };
  },
  methods: {
    treeRowClick(tr) {
      this.$refs.table.addTreeRow(tr, {
        project: "教务能力"
      });
    }
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
