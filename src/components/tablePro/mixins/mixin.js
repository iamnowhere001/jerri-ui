/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[公共混入]
创建时间: 2019年9月4日 11:44:23

***************************************************************************/

//  表格插槽
import TableSlot from "./slot";

export default {
  data() {
    return {
      //  滚动条宽度
      scrollBarWidth: this.$utils.scrollbarWidth()
    }
  },
  components: {
    TableSlot,
    JSXDom: {
      functional: true,
      props: {
        row: Object,
        render: Function
      },
      /**
       * @param {fn} createElement 创建jsx
       * @param {object} context 上下文作用域
       */
      render: (createElement, context) => {
        const row = context.props.row;
        return context.props.render(createElement, row);
      }
    }
  },
  computed: {
    //  父级作用域的插槽集合
    scopedSlots() {
      return this.$parent.$scopedSlots;
    },
    //  计算全部列的数量
    countAllCol() {
      const hasCheckbox = this.hasMultipleConfig ? 1 : 0;

      if (!this.cloneTheadList) {
        return hasCheckbox;
      } else {
        return this.cloneTheadList.length + (hasCheckbox);
      }
    }
  },
  methods: {
    /**
     * @desc 可选基础类型或函数渲染
     */
    optionalRender(args, attr, defaultValue = '') {
      const { th } = args;
      if (!this.$utils.hasAttr(th, attr)) {
        return defaultValue;
      }

      const value = th[attr];
      return this.$utils.isFunction(value)
        ? value(args)
        : value;
    },
    /**
     * @desc 获取字段在列中的序号
     */
    getFiledColIndex(filedName) {
      return this.cloneTheadList.findIndex((col) => col.props === filedName);
    },
    /**
     * @desc 格式传入的表头列宽度，建议直接传入数字或带百分比单位的值
     * 如带有格式，例如 "100px"，会切割返回
     */
    formatWidth(width) {
      if (!width) { return }
      let result = width;
      if (isNaN(result) && result.includes("px")) {
        result = width.split("px")[0];
      }
      return result;
    }
  }
};
