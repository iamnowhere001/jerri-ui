<!--
/**************************************************************************** 
所属系统: 组件库
所属模块: 组件 - 步骤进度栏
创建时间: 2020年03月10日 16:34:03
***************************************************************************/
-->

<template>
  <div class="content">
    <h2 class="j-mb-20">步骤进度栏</h2>

    <jr-step-bar
      :nameList="nameList"
      :step="step"
      :showStep="showStep"
      :dotList="dotList"
      :isDot="true"
      animation="diffusion"
      @informat="informat"
    />
    <div>当前步骤 {{ showStep }}</div>
  </div>
</template>

<script>
export default {
  name: "stepBarView",
  label: "步骤条",
  data() {
    return {
      // 步骤名称
      nameList: ["步骤1", "步骤2", "步骤3", "步骤4"],
      // 若使用dotList 与nameList 数组长度一致
      dotList: [true, true, true, true, true],
      // 进行中的步骤
      step: 3,
      // 当前展示的步骤
      showStep: 1,
    };
  },
  created() {
    // 模拟网络请求异步获取数据
    setTimeout(() => {
      this.dotList = [true, false, true, false, true];
    }, 2000);
  },
  methods: {
    //点击步骤切换
    informat(step) {
      //当前点击的步骤
      this.showStep = step;
    },
  },
};
</script>
