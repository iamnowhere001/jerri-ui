<template>
  <div class="switch">
    <ul>
      <li>
        <label>开关</label>
        <jr-switch v-model="toggle"></jr-switch>
        <jr-switch class="j-pt-10" type="danger" v-model="toggle"></jr-switch>
      </li>

      <li>
        <label>禁用</label>
        <jr-switch v-model="disabledOff" disabled></jr-switch>

        <jr-switch class="j-pt-10" v-model="disabledOn" disabled></jr-switch>
        <jr-switch
          class="j-pt-10"
          type="danger"
          v-model="disabledOn"
          disabled
        ></jr-switch>
      </li>

      <li>
        <label>二次确认</label>
        <jr-switch :value="confirmAgain" @input="beforeToggle"></jr-switch>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "switchView",
  label: "开关操场",
  components: {},
  mixins: [],
  data() {
    return {
      toggle: false,
      disabledOff: false,
      disabledOn: true,
      confirmAgain: false,
    };
  },
  created() {},
  methods: {
    beforeToggle(res) {
      this.$messageBox({
        tip: "确认切换",
        type: "problem",
        onSure: () => {
          this.confirmAgain = res;
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.switch {
  padding: 100px;
  ul {
    display: grid;
    grid-template-columns: repeat(3, 33.3%);
    li {
      text-align: center;
      label {
        margin-bottom: 20px;
        display: block;
      }
    }
  }
}
</style>
