<template>
  <div>
    <div class="cell">
     <h2 class="j-mb-20">表格Pro自动合并组件</h2>
      <h3>为表格中相同的内容进行自动合并</h3>
      <h3>你可以自主控制，能够合并的列，能够合并的方向，合并的首选方向</h3>
      <h3>查看案例代码，请在组件中查看 tablePro-autoMerge.vue 文件</h3>
    </div>

    <div class="cell">
      <h3>自动合并表格</h3>
      <p>
        <strong>autoMerge（自动合并单元格）</strong>，类型为布尔值
      </p>
      <p>
        当值布尔值为真时，表格会对全部内容进行嗅探，当发现一样的内容时，会进行合并
      </p>
      <br>
      <p>
        在 <strong>theadList</strong> 的列配置中，设置 <strong>autoMerge</strong> 为真，就能自主控制此列的自动合并
      </p>
      <p>
        <strong>theadList 中的 autoMerge 权级要比全局配置 autoMerge 要更高</strong>
      </p>
      <p>
        如果需要控制此列能够自动合并的方向，设置theadList中列对象的 <strong>autoMergeDirection</strong>，值为数组，能够支持的值有 "x", "y" 。分别是横向合并和纵向合并
      </p>
      <p>
        如果需要控制此列的首选合并方向，设置theadList中列对象的 <strong>autoMergePreferDirection</strong>, 值为字符串，能够支持的值有 "x", "y" 。分别是横向合并和纵向合并
      </p>
      <br>
      <p>在这个可编辑表格中，修改单元格中的内容，看到下面内容的自动合并</p>
      <jr-table-pro :theadList="autoMergeTheadListEdit"
                    :tbodyList="autoMergeTbodyList">
      </jr-table-pro>
      <br>
      <jr-table-pro :theadList="autoMergeTheadList"
                    :tbodyList="autoMergeTbodyList">
      </jr-table-pro>
    </div>

    <div class="cell">
      <h3>自动合并规则</h3>
      <p>
        自动合并默认会从单元格的右侧开始嗅探，尝试合并。
      </p>
      <p>
        当找到不能够合并的单元格时，会开始往下嗅探，直到找不到为止
      </p>
      <p>
        如果需要修改合并时的嗅探规则，可以通过上面的配置 <strong>autoMergeDirection</strong> 和 <strong>autoMergePreferDirection</strong> 进行修改。
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: "tableProAutoMerge",
  squareLabel: "表格自动合并",
  data() {
    return {
      autoMergeTheadListEdit: [
        { label: "日", props: "date", width: `300`, cellEdit: true },
        { label: "时间", props: "time", cellEdit: true },
        { label: "教室1", props: "classRoom1", cellEdit: true },
        { label: "教室2", props: "classRoom2", cellEdit: true },
        { label: "教室3", props: "classRoom3", cellEdit: true }
      ],
      autoMergeTheadList: [
        {
          label: "日",
          props: "date",
          width: `300`,
          autoMerge: true,
          autoMergeDirection: ["x", "y"],
          autoMergePreferDirection: "x"
        },
        { label: "时间", props: "time", autoMerge: true },
        { label: "教室1", props: "classRoom1", autoMerge: true },
        { label: "教室2", props: "classRoom2", autoMerge: true },
        { label: "教室3", props: "classRoom3", autoMerge: true }
      ],
      autoMergeTbodyList: [
        {
          date: "星期一",
          time: "星期一",
          classRoom1: "星期一",
          classRoom2: "星期一",
          classRoom3: "星期一"
        },
        {
          date: "星期一",
          time: "星期一",
          classRoom1: "星期一",
          classRoom2: "星期一",
          classRoom3: "星期一"
        },
        {
          date: "星期一",
          time: "星期一",
          classRoom1: "星期一",
          classRoom2: "星期一",
          classRoom3: "星期一"
        },
        {
          date: "星期一",
          time: "星期一",
          classRoom1: "星期一",
          classRoom2: "星期一",
          classRoom3: "星期一"
        }
      ]
    };
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
h2,
p {
  margin-bottom: 15px;
}
</style>
