<template>
  <div class="date-picker grid">
    <ul>
      <li>
        <label>大于7项</label>
        <jr-select
          :items="options"
          is-required
          v-model="currentYear"
        ></jr-select>
        <strong>{{ currentYear }}</strong>
      </li>

      <li>
        <label>小于7项</label>
        <jr-select
          :items="teacherList"
          is-required
          val-key="name"
          val-select="id"
          v-model="currentTeacher"
        ></jr-select>
        <strong>{{ currentTeacher }}</strong>
      </li>

      <li>
        <label>禁用</label>
        <jr-select
          :items="teacherList"
          is-required
          disabled
          val-key="name"
          val-select="id"
          v-model="currentTeacher"
        ></jr-select>
      </li>

      <li>
        <label>标记&禁用</label>
        <jr-select
          :items="teacherList"
          is-required
          val-key="name"
          val-select="id"
          v-model="markVal"
        ></jr-select>
        <strong>{{ markVal }}</strong>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "selectView",
  label: "下拉",
  components: {},
  mixins: [],
  data() {
    return {
      options: [
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
      ],
      currentYear: 2010,
      teacherList: [
        { name: "托索老师", id: "1001", bgc: "#067f42", mark: "#ff8e00" },
        { name: "老师", id: "1002", mark: true },
        { name: "小莫老师", id: "1003", bgc: "#ff8e00", disabled: true },
      ],
      currentTeacher: "1003",
      markVal: "",
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
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
