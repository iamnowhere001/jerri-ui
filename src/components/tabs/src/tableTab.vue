<!--
/****************************************************************************

所属系统: 组件库
所属模块: 表格的Tab组件
创建时间: 2019年7月18日08:38:52
维护人: 陈泽光
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div class="table-tab">
    <ul>
      <li
        v-for="(it, i) in list"
        :class="{ active: it.props === value }"
        :key="i"
        @click="selectTab(it.props)"
      >
        <slot :item="it">{{ it.label }}</slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    list: {
      type: Array,
      default: () => {},
    },
    berforLeave: {
      type: Function,
    },
  },
  name: "tableTab",
  methods: {
    /**
     * @desc 对离开前的函数封装成Promise
     * @param {Number} @i 点击选择的页签下标
     * @date 2019年7月17日10:49:14
     */
    handleBerforLeave(props) {
      if (!this.berforLeave) {
        return Promise.resolve(true);
      }
      return Promise.resolve(this.berforLeave(props));
    },

    /**
     * @desc 选中的tab
     * @author 陈泽光
     * @date 2019年7月18日08:43:42
     */
    async selectTab(props) {
      try {
        let res = await this.handleBerforLeave(props);
        if (res === false) {
          return;
        }
        this.$emit("change", props);
      } catch (error) {}
      // this.tabIndex = index;
    },
  },
};
</script>
<style scoped lang="scss">
.table-tab {
  li {
    user-select: none;
    display: inline-block;
    padding: 10px 20px;
    border: 1px solid $--color-c3;
    border-bottom: 0;
    box-sizing: border-box;
    margin-right: 6px;
    font-size: $--font-s;
    background-color: $--color-c6;
    color: #666;
    text-align: center;
    min-width: 90px;
    cursor: pointer;
    color: $--color-c8;
    border-radius: $--border-radius-base $--border-radius-base 0px 0px;
  }
  .active {
    border: 1px solid $--color-c8;
    background-color: $--color-c8;
    color: $--color-c6;
    font-weight: 600;
  }
}
</style>
