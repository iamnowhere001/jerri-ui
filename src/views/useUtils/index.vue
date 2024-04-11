<template>
    <div class="content">
      <jr-button @click="clickPage">跳转页面</jr-button>
      <h2>utils方法</h2>
      <div class="j-mt-20">
        <div v-for="(item, index) in utilsData" :key="index">
          方法名：{{ item.functionName }} 参数个数{{ item.argumentsLenth }}
        </div>
      </div>
      <div class="j-mt-20"></div>
    </div>
  </template>

  <script>
  export default {
    name: "utilUse",
    label: "util工具操场",
    isDev: true,
    data() {
      return {
        utilsData: [],
      };
    },
    created() {
      this.getAllUtilMethod();
    },
    computed() {},
    methods: {
      clickPage() {
        const newTarget = ''
        this.$utils.openOtherSysUrl(newTarget);
      },
      getAllUtilMethod() {
        const arrMethods = [];
        const utilsList = this.$utils;
        for (const key in utilsList) {
          arrMethods.push({
            functionName: utilsList[key].name,
            argumentsLenth: utilsList[key].length,
          });
        }
        this.utilsData = arrMethods;
      },
    },
  };
  </script>