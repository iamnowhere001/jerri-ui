
<template>
  <div class="jr-header">
    {{headTitle}}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "JrHead",
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      headTitle: ""
    };
  },
  created() {},
  mounted() {
    // title存在则使用传入值，否则通过postMessage获取
    if (this.title) {
      this.headTitle = this.title;
    } else {
      this.getTitleByPostMessage();
    }
  },
  computed: {},
  watch: {
    title(newVal) {
      if (newVal) {
        this.headTitle = newVal;
      }
    }
  },
  methods: {
    /**
     * @desc 获取标题
     * @param {type}
     * @return:
     * @author ZhengKai
     */
    getTitleByPostMessage() {
      window.parent.postMessage(
        `{"type":"getMenuName","url":"${location.href}"}`,
        "*"
      );
      window.removeEventListener("message", null);
      window.addEventListener("message", event => {
        if (
          typeof event.data === "string" &&
          event.data.includes("getMenuName")
        ) {
          let data = JSON.parse(event.data);
          data.menuName && (this.headTitle = decodeURIComponent(data.menuName));
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "head.scss";
</style>
