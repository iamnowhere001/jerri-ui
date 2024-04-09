/****************************************************************************
所属系统: 组件库 
所属模块: 组件 - 消息弹窗组件
 

***************************************************************************/

<template>
  <div class="j-pt-30 j-pl-30">
    <jr-head title="模态框"></jr-head>

    <h2 class="j-mb-20">确定弹窗</h2>
    <jr-button @click="openConfirm('组件重复引用')">打开确定弹窗</jr-button>
    <jr-button
      class="j-ml-20"
      @click="
        openConfirm(
          '组件重复引用组件重复引用组件重复引用组件重复引用组件重复引用组件重复引用组件重复引用'
        )
      "
      >打开字很多的确定弹窗</jr-button
    >
    <jr-button @click="desc = '我是描述'" class="j-ml-20">添加描述</jr-button>
    <jr-button @click="desc = ''" class="j-ml-20">删除描述</jr-button>

    <h2 class="j-mb-20 j-pt-30">警告弹窗</h2>
    <jr-button class="j-mr-20" @click="$messageBox({ tip: '警告弹窗' })"
      >打开警告弹窗</jr-button
    >
    <jr-button
      @click="
        $messageBox({
          tip: '警告弹窗警告弹窗警告弹窗警告弹窗警告弹窗警告弹窗警告弹窗',
        })
      "
      >打开字很多的警告弹窗</jr-button
    >

    <h2 class="j-mb-20 j-pt-30">成功弹窗</h2>
    <jr-button
      class="j-mr-20"
      @click="$messageBox({ tip: '成功的弹窗', type: 'success' })"
      >打开成功弹窗</jr-button
    >
    <jr-button
      @click="
        $messageBox({
          tip:
            '成功的弹窗成功的弹窗成功的弹窗成功的弹窗成功的弹窗成功的弹窗成功的弹窗',
          type: 'success',
        })
      "
      >打开字很多的成功弹窗</jr-button
    >

    <h2 class="j-mb-20 j-pt-30">自定义弹窗</h2>
    <jr-button class="j-mr-20" @click="openPop()">打开自定义弹窗</jr-button>

    <jr-message-box
      v-model="isShow"
      title="标题是一块插槽"
      width="600px"
      :isDefine="true"
    >
      <span>这块内容根据系统自己定义</span>
      <div class="j-btn-group j-alone j-pt-30">
        <jr-button size="normal">保存</jr-button>
      </div>
    </jr-message-box>
  </div>
</template>
<script>
export default {
  name: "messageBoxView",
  label: "消息弹窗",
  data() {
    return {
      desc: "",
      isShow: false,
    };
  },
  methods: {
    openConfirm(tip) {
      this.$messageBox({
        type: "problem",
        tip,
        desc: this.desc,
        confirmText: "哈哈哈",
        cancleText: "嘻嘻嘻",
        onSure: () => {
          this.$msg("你点击了确定");
        },
        onClose: () => {
          this.$msg("你点击了取消");
        },
      });
    },
    openPop() {
      this.isShow = true;
    },
  },
};
</script>
