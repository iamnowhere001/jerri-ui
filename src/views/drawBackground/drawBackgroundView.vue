
<template>
  <div class="j-content">
    <h2 class="j-mb-20">水印组件</h2>

    <p class="nav">点击文本增加水印高度</p>

    <div class="test"
         ref="test"
         @click="changeHeight"
         style="width: 650px; height: 600px; cursor: pointer;">

      <p>水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框</p>
      <p>水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框</p>
      <p>水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框</p>
      <p>水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框</p>
      <p>水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框</p>
      <p>水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框</p>
      <p>水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框</p>
      <p>水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框水印框</p>
    </div>

    <div class="mark-box">
      <jr-draw-background :zindex="200"
                          content="DASDASDQWDQ"
                          wapper="mark-box"
                          domNode=".test"></jr-draw-background>
    </div>
  </div>
</template>

<script>
export default {
  name: "drawBackgroundView",
  label: "水印",
  data() {
    return {
      // 默认水印高度
      num: 800
    };
  },
  watch: {},
  mounted() {},
  methods: {
    changeHeight() {
      this.$nextTick(() => {
        this.num += 30;
        this.$refs.test.style.height = `${this.num}px`;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.j-content {
  padding: 20px 50px;
  .nav {
    color: #666;
    padding-bottom: 5px;
    margin: 20px 0 10px 0;
    border-bottom: 1px solid #d8d8d8;
    width: 300px;
  }
}

.test {
  // max-height: 500px;
  // max-width: 500px;
  // overflow: hidden;
  // overflow-y: auto;
  // overflow-x: auto;
  p {
    line-height: 28px;
  }
}
</style>
