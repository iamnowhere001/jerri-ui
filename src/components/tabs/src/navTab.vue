<!--
/****************************************************************************

所属系统: 组件库
所属模块: 导航Tab切换组件
创建时间: 2019年7月17日14:38:19
维护人: 陈泽光
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->

<template>
  <div class="tab" ref="tabContent">
    <!-- Tab切换栏 -->
    <ul>
      <li
        v-for="(it, i) in list"
        ref="tabLi"
        @click="tabClick(i, it.props)"
        :key="i"
      >
        <slot :item="it">{{ it.label }}</slot>
      </li>
    </ul>

    <!-- tab底部的线 -->
    <p class="line" :style="tabStyle"></p>
  </div>
</template>
<script>
export default {
  name: "navTab",
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
  mixins: [],
  data() {
    return {
      // tab在切换过程的动画
      tabStyle: {
        transform: "scale(1)",
        opacity: 1,
      },
    };
  },
  mounted() {
    this.calcTab(this.getIndexByArr(this.value, this.list));
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.calcTab(this.getIndexByArr(this.value, this.list));
      }
    },
    list() {
      this.calcTab(this.getIndexByArr(this.value, this.list));
    },
  },
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
     * @desc 查找val值在arr数组中的索引
     * @param {Number} @i 点击选择的页签下标
     * @date 2019年7月17日10:49:14
     */
    getIndexByArr(val, arr) {
      let i = 0;
      arr.find((item, index) => {
        if (item.props === val) {
          i = index;
        }
      });
      return i;
    },

    /**
     * @desc 顶部页面点击时触发
     * @param {Number} @i 点击选择的页签下标
     * @author 陈泽光
     * @date 2019年7月17日10:49:14
     */
    async tabClick(i, props) {
      try {
        let res = await this.handleBerforLeave(props);
        if (res === false) {
          return;
        }
        this.$emit("change", props);
      } catch (error) {}
    },

    /**
     * @desc 计算tab页在切换的时候底部横线的宽度和过渡动画的距离
     * @author 陈泽光
     * @date 2019年7月17日10:49:14
     */
    calcTab(index) {
      // 弹动过渡动画，因为还有位移属性，所以只能使用replace替换
      this.tabStyle["transform"] = this.tabStyle["transform"].replace(
        "scale(1)",
        "scale(0)"
      );
      this.$refs.tabLi.forEach((it) => {
        it.className = "";
      });
      let domParentToLeft = this.$refs.tabContent.getBoundingClientRect().left;
      setTimeout(() => {
        // 当前选中的TAB页签DOM节点
        let dom = this.$refs.tabLi[index];
        let domProperty = dom.getBoundingClientRect();
        // console.log(domProperty.left, domParentToLeft, dom.width / 2);
        // tab栏的内边距
        let obj = {
          // width: `${dom.offsetWidth}px`,
          // transform: `translateX(${domProperty.left -
          //   domParentToLeft}px) scale(1)`
          width: `40px`,
          transform: `translateX(${domProperty.left -
            domParentToLeft +
            domProperty.width / 2 -
            20}px) scale(1)`,
        };
        this.tabStyle = obj;

        // setTimeout(() => {
        dom.className = "active";
        // this.$set(this.tabStyle, "opacity", 0);
        // }, 200);
      }, 100);
    },
  },
};
</script>
<style scoped lang="scss">
.tab {
  padding: 14px 0 0 50px;
  background-color: $--color-c6;
  border-bottom: 1px solid $--color-c3;
  position: relative;
  ul {
    li {
      user-select: none;
      color: $--color-c8;
      font-size: $--font-s;
      margin-right: 67px;
      display: inline-block;
      cursor: pointer;
      height: 35px;
    }
    .active {
      font-weight: 600;
    }
  }
  p.line {
    margin: 0;
    padding: 0;
  }
  .line {
    height: 3px;
    background-color: $--color-c8;
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: 0px;
    transition: 0.15s all ease-out;
  }
}
</style>
