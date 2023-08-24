<template>
  <div>
    <h1 style="font-size: 40px;">扇形进度操场</h1>
    <jr-progress-sector :progress="progress">
      <div style="height: 500px; width: 500px; background-color: #ccc;"></div>
    </jr-progress-sector>
    <button @click="go">开冲</button>
    <button @click="stop">停！</button>
  </div>
</template>

<script>
export default {
  name: "sectorView",
  label: "扇形进度操场",
  data() {
    return {
      progress: 0
    };
  },
  computed: {},
  methods: {
    go() {
      this.timer = setInterval(() => {
        if (this.progress > 1) {
          this.progress = 0;
        } else {
          this.progress += 0.1;
        }
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  margin: 50px;
}
</style>
