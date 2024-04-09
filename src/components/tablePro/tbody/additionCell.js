/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[表格附加列]
创建时间: 2019年6月3日 15:30:20



***************************************************************************/
export default {
  props: {
    additionCell: {
      type: [Boolean, Array, String, Function]
    }
  },
  data() {
    return {
      //  展示附加列
      showAdditionCell: false,
      //  附加列样式
      additionCellStyle: {}
    };
  },
  computed: {

    /**
     * @desc 根据配置，显示附加按钮
     */
    showAdditionBtn(type) {
      return type => {
        const additionCell = this.additionCell;

        //  配置为布尔值
        if (
          this.$utils.isBoolean(additionCell)
        ) {
          return additionCell;
        }
        //  配置为数组或字符串
        else if (
          this.$utils.isArray(additionCell) || this.$utils.isString(additionCell)
        ) {
          return additionCell.includes(type);
        }
        //  配置为函数
        else if(
          this.$utils.isFunction(additionCell)
        ) {
          const cellArgs = this.additionCellArgs || {};
          return additionCell(type, {
            tr: cellArgs[0],
            trIndex: cellArgs[1]
          });
        }
        return false;
      };
    },
    //  附加列样式名
    additionCellClassName() {
      const btnLen = [
        this.showAdditionBtn("add"),
        this.showAdditionBtn("del")
      ].filter(btn => btn).length;

      if (btnLen > 1) {
        return "multiple";
      } else {
        return "single";
      }
    }
  },
  watch: {
    //  根据附加列配置，监听或取消滚动事件
    additionCell: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$utils.on(document, "scroll", this.hideAdditionCell);
        } else {
          this.$utils.off(document, "scroll", this.hideAdditionCell);
        }
      }
    },
    //  在高度发生变化时，重新计算附加列出现位置
    "$parent.bodyHeight"() {
      if (this.additionCell && this.showAdditionCell) {
        this.setAdditionCellPosition();
      }
    }
  },
  methods: {
    /**
     * @desc 生成附加列
     * @param {*} e
     * @param {*} param1
     */
    initAdditionCell(e, { tr, trIndex }) {
      if (this.additionCell) {
        this.showAdditionCell = true;
        //  当前附加列回调参数
        this.additionCellArgs = [tr, trIndex];
        //  当前附加列所属行
        this.additionCellRow = e.target;
        //  设置附加列的位置
        this.setAdditionCellPosition();
      }
    },
    /**
     * @desc 设置附加列的位置
     */
    setAdditionCellPosition() {
      const target = this.additionCellRow;
      const rect = target.getBoundingClientRect();
      const scrollBarWidth = this.$parent.hasYScrollbar ? this.$parent.YScrollbarWidth : 0;

      //  加 1 是因为边框，减 1 也是因为边框
      this.additionCellStyle = {
        height: rect.height + 'px',
        left:
          this.$parent.$refs.tableProContainer.getBoundingClientRect().left +
          this.$parent.$refs.tableProContainer.clientWidth -
          1 -
          scrollBarWidth +
          'px',
        top: rect.top + 1 + 'px',
      }
    },
    /**
     * @desc 隐藏附加列
     */
    hideAdditionCell() {
      if (this.additionCell) {
        this.showAdditionCell = false;
      }
    },
    /**
     * @desc 附加列按钮点击
     */
    additionBtnClick(type) {
      this.$parent.$emit(`on-row-${type}`, ...this.additionCellArgs);
      this.hideAdditionCell();
    }
  }
}
