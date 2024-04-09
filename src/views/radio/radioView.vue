/****************************************************************************
所属系统: 组件库 
所属模块: 组件—单复选组件 
创建时间: 2020年03月09日 14:25
***************************************************************************/

<template>
  <div class="content">
    <h2 class="j-mb-20">单复选组件</h2>

    <p class="nav">单选-基本使用</p>
    <p style="display:flex">
      <jr-radio v-model="baseRadio" label="1">微米</jr-radio>
      <jr-radio v-model="baseRadio" label="2" type="circle"
        >米罗小小班</jr-radio
      >
      <jr-radio v-model="baseRadio" disabled label="2" type="circle"
        >米罗小小班</jr-radio
      >
      <jr-radio v-model="baseRadio" disabled label="3">毕加索</jr-radio>
    </p>
    <p class="j-mt-10">绑定值：<span v-text="baseRadio"></span></p>

    <p class="nav">单选-按组使用</p>
    <p style="display:flex">
      <jr-radio-group v-model="radioVal">
        <jr-radio :label="item.value" v-for="(item, index) in list" :key="index"
          ><span v-text="item.label"></span
        ></jr-radio>
      </jr-radio-group>
    </p>
    <p class="j-mt-10">绑定值：<span v-text="radioVal"></span></p>

    <p class="nav">复选-按组使用 最多选3个</p>
    <jr-checkbox-group v-model="checkboxVal" :max="3">
      <jr-checkbox width="80px" label="地区1"
        >地区1地区1地区1地区1地区1地区1地区1地区1地区1</jr-checkbox
      >
      <jr-checkbox label="地区2">地区2</jr-checkbox>
      <jr-checkbox label="地区3" disabled>地区3</jr-checkbox>
      <jr-checkbox label="area">地区4</jr-checkbox>
      <jr-checkbox label="ccc">地区5</jr-checkbox>
    </jr-checkbox-group>
    <p class="j-mt-10">选中值：<span v-text="checkboxVal"></span></p>

    <p class="nav">单复选-二次确认</p>
    <jr-radio-group :value="radioValSure" @input="sureAgain">
      <jr-radio v-for="(item, index) in list" :key="index" :label="item.value"
        ><span v-text="item.label"></span
      ></jr-radio>
    </jr-radio-group>
    <p class="j-mt-10">选中值：<span v-text="radioValSure"></span></p>

    <p class="nav">复选-不确定状态</p>
    <jr-checkbox
      class="j-pb-10"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</jr-checkbox
    >
    <jr-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
    >
      <jr-checkbox v-for="(el, i) in checkArr" :key="i" :label="el">{{
        el
      }}</jr-checkbox>
    </jr-checkbox-group>
    <p class="j-mt-10">选中值：<span v-text="checkedCities"></span></p>
  </div>
</template>

<script>
export default {
  name: "radioView",
  label: "单选框",
  name: "radio",
  data() {
    return {
      baseRadio: "3",

      radioVal: "",

      list: [
        { label: "上", value: "top" },
        { label: "中", value: "middle" },
        { label: "下", value: "bottom" },
      ],
      checkboxVal: ["area", "地区3"],

      // 不确定状态
      checkArr: ["北京", "深圳", "上海"],
      checkedCities: ["深圳"],
      checkAll: false,
      radioValSure: "middle",
    };
  },
  computed: {
    isIndeterminate() {
      const checkLen = this.checkedCities.length;
      return checkLen > 0 && checkLen < this.checkArr.length;
    },
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.checkArr : [];
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkArr.length;
    },
    /**
     * @desc 单复数 二次确认
     * @param {String} value 选中值
     * @author 徐勇
     * @date 2020年05月23日 09:46
     */
    sureAgain(value) {
      this.$messageBox({
        tip: "确定勾选",
        type: "problem",
        onSure: () => {
          this.radioValSure = value;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 50px;
  .nav {
    color: #666;
    padding-bottom: 5px;
    margin: 20px 0 10px 0;
    border-bottom: 1px solid #d8d8d8;
    width: 300px;
  }
  .left {
    display: inline-block;
  }
  .right {
    display: inline-block;
    margin-left: 50px;
  }
}
</style>
