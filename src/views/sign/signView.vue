<template>
  <div class="content">
   <h2 class="j-mb-20">签字板组件</h2>

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
  label: "签字板",
  data() {
    return {
      imgData: "",
      isShow: false
    };
  },
  methods: {
    getSign(res) {
      this.imgData = this.$refs.sign.canvaDom.toDataURL("image/jpeg", 0.1);
    },
    clearSign(res) {},
    closeSign(res) {}
  }
};
</script>

