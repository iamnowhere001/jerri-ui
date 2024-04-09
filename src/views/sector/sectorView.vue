<template>
  <div>
   <h2 class="j-mb-20">扇形进度组件</h2>

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
  label: "扇形进度",
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
