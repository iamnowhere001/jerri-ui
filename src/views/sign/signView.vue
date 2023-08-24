<template>
  <div>
    <h1 style="font-size: 40px;">签字板操场</h1>
    <jr-button @click="isShow = !isShow">打开签字板</jr-button>
    <jr-sign ref="sign"
             :is-show.sync="isShow"
             action="//192.168.99.29:8200/"
             businessCode=""
             @get-sign="getSign"
             @clear-sign="clearSign"
             @close-sign="closeSign" />
    <img :src="imgData">
  </div>
</template>

<script>
export default {
  name: "signView",
  label: "签字板操场",
  data() {
    return {
      imgData: "",
      isShow: false
    };
  },
  computed: {},
  methods: {
    getSign(res) {
      this.imgData = this.$refs.sign.canvaDom.toDataURL("image/jpeg", 0.1);
    },
    clearSign(res) {},
    closeSign(res) {}
  }
};
</script>

<style lang="scss" scoped>
.select-wrap {
  width: 180px;
}

p {
  margin: 10px 0px;
}

hr {
  margin: 10px 0px;
}

/deep/ .jr-button-wrap {
  margin: 0px 5px;
}
</style>
