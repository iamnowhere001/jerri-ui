<template>
  <div>
    <h1 style="font-size: 40px;">表格Pro固定列操场</h1>

    <div class="cell">
      <h3>固定列</h3>
      <jr-table-pro :theadList="fixedTheadList"
                    :tbodyList="tbodyList">
      </jr-table-pro>
    </div>

    <div class="cell">
      <h3>固定列带单复选</h3>
      <jr-table-pro :theadList="fixedTheadList"
                    :tbodyList="tbodyList"
                    :multiple="multiple">
      </jr-table-pro>
    </div>

    <div class="cell">
      <h3>固定列且固定高度（固定表头）</h3>
      <jr-table-pro :theadList="fixedTheadList"
                    :height="300"
                    :multiple="multiple"
                    :tbodyList="tbodyList">
      </jr-table-pro>
    </div>

    <!-- <div class="cell">
      <h3>多级表头固定列</h3>
      <jr-table-pro :theadList="mupliteTheadList"
                    :tbodyList="mupliteTbodyList"
                    :mergeConfig="mergeConfig">
      </jr-table-pro>
    </div> -->

  </div>
</template>

<script>
export default {
  name: "tableProFixedCol",
  squareLabel: "固定列表格",
  data() {
    return {
      multiple: false,
      mergeConfig: {
        2: { date: { x: 2 } },
        3: {
          classRoom2: {
            x: 2,
            y: 2
          }
        }
      },
      fixedTheadList: [
        { label: "日", props: "date", fixed: "left" },
        { label: "时间", props: "time"},
        { label: "多余的内容", props: "temp1", width: `800` },
        { label: "多余的内容", props: "temp2", width: `800` },
        { label: "多余的内容", props: "temp3", width: `800` },
        { label: "教室1", props: "classRoom1" },
        { label: "教室2", props: "classRoom2", fixed: "right" },
        { label: "教室3", props: "classRoom3", fixed: "right" }
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
      ],
      mupliteTheadList: [
        {
          props: "name",
          label: "名称",
          fixed: "left",
          width: 400
        },
        {
          label: "其他",
          children: [
            {
              props: "age",
              label: "年龄",
              width: 400
            },
            {
              label: "地址",
              children: [
                {
                  props: "address",
                  label: "街道",
                  width: 400
                },
                {
                  props: "block",
                  label: "区",
                  children: [
                    {
                      props: "building",
                      label: "栋",
                      width: 400
                    },
                    {
                      props: "doorNo",
                      label: "门牌号",
                      width: 400
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "公司",
          children: [
            {
              props: "cAddress",
              label: "公司地址"
            },
            {
              props: "cName",
              label: "公司名称"
            }
          ]
        }
      ],
      mupliteTbodyList: [
        {
          name: "august",
          age: 22,
          address: "粤海街道",
          block: "南山区",
          building: "12",
          doorNo: 9527,
          cAddress: "Jerrisoft",
          cName: "Jerrisoft"
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.cell {
  margin: 50px;
}
</style>
