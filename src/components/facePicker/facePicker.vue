/****************************************************************************

所属系统: 组件库
所属模块: 表情选择


***************************************************************************/
<template>
  <div ref="facePickerRef"
       class="container"
       v-clickoutside="close"
       v-show="show">
    <ul class="face-list jr-clearfix">
      <li class="face"
          v-for="(item, i) in faceData"
          :key="i">
        <img :src="require('../../assets/images/facePicker/' + item.png)"
             :title="item.chs"
             @click="confirm(item)">
      </li>
    </ul>
  </div>
</template>
<script>
// 表情字段键值对
import faceData from "../../assets/constants/faceKeyMap";

export default {
  name: "JrFacePicker",
  props: {
    show: Boolean,
    default: () => {
      return false;
    }
  },
  watch: {
    show() {
      this.$refs.facePickerRef.scrollTop = 0;
    }
  },
  data() {
    return {
      faceData
    };
  },
  methods: {
    /**
     * @desc 确认选择表情
     * @param {object} item 选择的表情
     * @author 杨文杰
     * @date 2019年6月19日 18:38:03
     */
    confirm(item) {
      this.$emit("on-confirm", item["chs"], item);
    },
    /**
     * @desc 关闭
     * @author 杨文杰
     * @date 2019年6月19日 18:38:03
     */
    close() {
      this.$emit("on-close");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./facePicker.scss";
</style>
