/****************************************************************************

所属系统: 组件库
所属模块: 标题组件
创建时间: 2020-01-02
维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="jr-header">
    {{headTitle}}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "JrHead",
  components: {},
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
     * @desc 获取年报数据
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
