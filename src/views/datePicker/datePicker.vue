/****************************************************************************

所属系统: 组件库
所属模块: 操场 - 按钮组件
创建时间: 2020年3月10日10:50:28
维护人: 陈泽光
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　         　　　　　　　　　　 │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/


<template>
  <div class="date-picker grid">
    <ul>
      <li>
        <label>年月日选择</label>
        <jr-date-picker v-model="yearMonthDate"
                        max="2020-4-28"></jr-date-picker>
      </li>

      <li>
        <label>禁止选择</label>
        <jr-date-picker disabled
                        v-model="yearMonthDate"></jr-date-picker>
      </li>

      <li>
        <label>年月选择</label>
        <jr-date-picker v-model="yearMonth"
                        type="month"></jr-date-picker>
      </li>
      <li>
        <label>时分选择</label>
        <jr-date-picker v-model="time"
                        isHH_mm
                        format="HH:mm"
                        :min="minTime"
                        type="time"></jr-date-picker>
      </li>

      <li>
        <label>日期范围选择</label>
        <jr-date-picker v-model="dateRange"
                        is-range
                        :min="new Date().toLocaleDateString()"
                        :btns="['confirm']"></jr-date-picker>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "datePickerView",
  label: "时间选择器",
  components: {},
  mixins: [],
  data () {
    return {
      yearMonthDate: "",
      yearMonth: "",
      time: "",
      minTime: "",
      dateRange: ""
    };
  },
  created () {
    setTimeout(() => {
      this.minTime = '10:10:00'
      console.log(123);
    }, 3000)
  },
  mounted () { },
  methods: {}
};
</script>
<style scoped lang='scss'>
.grid {
  padding: 100px;
  ul {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    li {
      padding: 20px;
      text-align: center;
      label {
        margin-bottom: 20px;
        display: block;
      }
    }
  }
}
</style>
