<template>
  <div>
    <h1 style="font-size: 40px;">表格Pro操场</h1>

    <div class="cell j-btn-group">
      <template v-for="(square, index) in squareList">
        <p :key="index">
          <jr-button v-if="square.squareLabel"
                     @click="toSquare(square)">
            {{square.squareLabel}}
          </jr-button>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import tableViewRoutes from "./tableViewRoutes";

export default {
  name: "tableProView",
  label: "TablePro操场",
  data() {
    return {
      squareList: tableViewRoutes
    };
  },
  methods: {
    toSquare({ path }) {
      this.$router.push({
        path
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  margin: 50px;
}
/deep/ .jr-button-wrap {
  margin-right: 10px;
}
</style>
