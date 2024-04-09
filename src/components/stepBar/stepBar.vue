<!--
/**************************************************************************** 
所属系统: 组件库
所属模块: 步骤栏组件
创建时间: 2020年01月02日 16:34:52


***************************************************************************/
-->

<template>
  <div class="progress-bar">
    <!-- active 停留在此阶段的样式   across 通过此阶段的样式  clickStep点击选中的样式-->
    <div
      class="bar-box"
      v-for="(item, index) in progressList"
      :key="'progress-bar' + index"
      :class="{
        active: item.active,
        across: item.across,
        clickStep: showStep === item.step,
      }"
    >
      <span class="circle-span j-no-drop" @click="emitParent(item)">
        <span v-if="!item.across || !isComplete">{{ item.step }}</span>
        <img
          v-else="item.across"
          src="../../assets/images/superStep/good_pre.png"
          alt=""
        />
      </span>
      <!-- 某一步是否显示红点 -->
      <jr-badge
        :is-dot="isDot"
        :animation="animation"
        class="badge-box"
        v-if="
          progressList.length !== index + 1 && isDot && dotActiveList[index]
        "
      ></jr-badge>
      <!-- 步骤名称 -->
      <span class="decs-span">{{ item.name }}</span>

      <!-- 步骤线条 -->
      <span class="line-span" v-if="item.step !== progressList.length"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "JrStepBar",
  components: {},
  props: {
    // 名称数组
    nameList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //进行中的步骤---
    step: {
      type: Number,
      default: 1,
    },
    // 当前展示的步骤
    showStep: {
      type: Number,
      default: 1,
    },
    // 是否显示完成标记（√）
    isComplete: {
      type: Boolean,
      default: true,
    },
    // 是否显示红点
    isDot: {
      type: Boolean,
      default: false,
    },
    // 是否显示红点数组
    dotList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 红点动画
    animation: {
      type: String,
      // diffusion/fade
      default: "",
    },
  },
  watch: {
    step: {
      handler(val) {
        this.initData();
      },
      deep: true,
    },
    dotList: {
      handler(val) {
        if (val.length) {
          this.dotActiveList = val;
        }
      },
      deep: true,
    },
  },
  mixins: [],
  data() {
    return {
      defaultObj: {
        name: "",
        step: 0,
        // 是否停留在这个阶段
        active: false,
        // 是否经过这个阶段
        across: false,
      },
      // 进度数组
      progressList: [],
      // 当前返回的是那个步骤
      currentReturnStep: 0,
      // 某个步骤是否显示红点
      dotActiveList: [],
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    /**
     * @desc 初始化数据
     * @author 叶志
     * @date 2019-8-24 17:02:30
     */
    initData() {
      this.currentReturnStep = this.step;
      let progressList = [];
      let dotActiveList = [];
      this.nameList.forEach((element, index) => {
        let defaultObj = this.$utils.deepCopy(this.defaultObj);
        // 设置步骤名
        defaultObj.name = element;
        // 设置步骤
        defaultObj.step = index + 1;
        // 是否经过在这个阶段
        defaultObj.across = this.step > index && defaultObj.step !== this.step;
        // 是否停留在这个阶段
        defaultObj.active = defaultObj.step === this.step;
        // 当为最后一步时默认最后一步为已完成的样子
        if (index + 1 === this.nameList.length && index + 1 === this.step) {
          defaultObj.across = defaultObj.active = true;
        }
        progressList.push(defaultObj);
        // 若开启红点、默认显示
        dotActiveList.push(true);
      });
      this.progressList = progressList;
      this.dotActiveList = dotActiveList;
      if (this.dotList.length) {
        this.dotActiveList = this.dotList;
      }
    },
    /**
     * @desc 点击圆圈emit给父组件
     * @param {Object} item  当前点击的元素
     * @author 叶志
     * @date 2019-8-24 17:02:30
     */
    emitParent(item) {
      // 未到达此步骤不能点击。并且停留在此步骤点击也不触发
      if (
        ((item.active || item.across) &&
          item.step !== this.currentReturnStep) || !this.isComplete
      ) {
        this.currentReturnStep = item.step;
        this.$emit("informat", item.step);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./stepBar.scss";
</style>
