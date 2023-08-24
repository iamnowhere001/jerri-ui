<!--
/**************************************************************************** 
所属系统: 组件库
所属模块: 菜单组件操场
创建时间: 2020年09月08日 15:52:43
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div>
    <!-- 还有插槽 去源码查看吧 -->
    <jr-menu
      v-bind="menuConfig"
      @edit-click="editItem"
      @del-click="delItem"
      @commit-click="goCommit"
    />
  </div>
</template>
<script>
export default {
  name: "menuView",
  label: "菜单操场",
  components: {},
  mixins: [],
  data() {
    return {
      // 右侧菜单配置
      menuConfig: {
        title: "活动名称",
        valKey: "markProgramName",
        statusKey: "status",
        draftStatus: 1,
        commitStatus: 2,
        list: [
          { markProgramName: "熄灯一小时", status: 1 },
          { markProgramName: "翻滚吧蔬菜王国", status: 1 },
          { markProgramName: "美学规律之美", status: 2 },
          { markProgramName: "熄灯一小时", status: 1 },
          { markProgramName: "翻滚吧蔬菜王国", status: 1 },
          { markProgramName: "美学大萨之美", status: 2 },
          { markProgramName: "熄灯一小时", status: 1 },
          { markProgramName: "翻滚吧蔬菜王国", status: 1 },
          { markProgramName: "美学dassda美", status: 2 },
          {
            markProgramName: "美国的风俗文化就大分美国的风俗文化就大分",
            status: 2,
          },
          { markProgramName: "一个搞不懂的草稿", status: 1 },
        ],
      },
    };
  },
  created() {},
  methods: {
    editItem(item) {
      console.log(item);
    },
    delItem(item) {
      console.log(item);
    },
    goCommit(item) {
      console.log(item);
    },
  },
};
</script>
<style scoped lang="scss"></style>
