<template>
  <div>
   <h2 class="j-mb-20">表格Pro多级表头组件</h2>

    <div class="cell">
      <h3>多级表头</h3>
      <jr-table-pro :theadList="mupliteTheadList"
                    :tbodyList="mupliteTbodyList"
                    :checkMerge="false">
      </jr-table-pro>
    </div>

  </div>
</template>

<script>
export default {
  name: "tableProMultipleHearder",
  squareLabel: "多级表头表格",
  data() {
    return {
      mupliteTheadList: [
        {
          props: "name",
          label: "名称",
          width: 300,
          diagonal: true
        },
        {
          label: "其他",
          children: [
            {
              props: "age",
              label: "年龄"
            },
            {
              label: "地址",
              children: [
                {
                  props: "address",
                  label: "街道"
                },
                {
                  props: "block",
                  label: "区",
                  children: [
                    {
                      props: "building",
                      label: "栋"
                    },
                    {
                      props: "doorNo",
                      label: "门牌号"
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
  computed: {}
};
</script>

<style lang="scss" scoped>
.cell {
  margin: 50px;
}
</style>
