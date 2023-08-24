/****************************************************************************

所属系统: 组件库
所属模块: tablePro—[长列表]
创建时间: 2019年6月3日 15:30:20
维护人: August

*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
export default {
  data() {
    return {
      //  展示遮罩
      showLoad: false,
      //  实际显示的表格数据
      showTbodyList: [],
      //  实际渲染的数据数量
      loadedNum: 0,
      //  总数据条数
      dataTotal: 0,
      //  渲染数据顶部的高度
      dataTop: 0,
      //  滚动上下的距离
      scrollTop: 0,
      //  数据滚动的高度
      scrollHeight: 0,
      //  滚动处理方法
      handleScroll: null
    }
  },
  computed: {
    tableOtherBottom() {
      //  表格剩余数据底部高度
      return (
        this.dataTotal * this.trHeight -
        this.dataTop -
        this.loadedNum * this.trHeight
      );
    }
  },
  watch: {
    tbodyList: {
      immediate: true,
      handler(newValue, oldValue) {
        if (this.longList && this.$refs.tableBodyWrap) {
          this.$refs.tableBodyWrap.scrollTop = 0;
          this.$refs.tableBodyWrap.scrollLeft = 0;
        } else {
          return;
        }
        //  实际渲染的数据数量
        this.loadedNum = 0;
        //  总数据条数
        this.dataTotal = 0;
        //  渲染数据顶部的高度
        this.dataTop = 0;
        //  滚动上下的距离
        this.scrollTop = 0;
        this.showTbodyList = [];
        if (newValue.length > 0) {
          //  获取数据长度
          this.dataTotal = newValue.length;
          if (this.dataTotal >= this.longListLoadRowNum) {
            //  判断数据长度是否大于设置的每次渲染长度
            this.loadedNum = this.longListLoadRowNum;
            //  设置实际渲染条数
            for (var i = 0; i < this.longListLoadRowNum; i++) {
              let data = newValue[i];
              this.showTbodyList.push(data);
            }
          } else if (this.dataTotal < this.longListLoadRowNum) {
            this.loadedNum = this.dataTotal;
            for (var i = 0; i < this.dataTotal; i++) {
              let data = newValue[i];
              this.showTbodyList.push(data);
            }
          }
        }
        if (oldValue) {
          this.scrollProcessing();
        }
      }
    },
    tableHeight: {
      handler(newValue) {
        if (this.longList && newValue) {
          //  表格高度改变重新计算
          this.scrollProcessing();
        }
      }
    }
  },
  created() {
    if (this.longList) {
      this.handleScroll = this.proxy(this.scrollProcessing, 240, {
        leading: true,
        context: this
      });

    }
  },
  mounted() {
    if (this.longList) {
      this.$utils.on(this.$refs.tableBodyWrap, "scroll", this.handleScroll);
    }
  },
  methods: {
    /**
     * @desc 滚动函数防抖
     * @param {*} func
     * @param {*} time
     * @param {*} options
     */
    proxy(
      func,
      time,
      options = {
        leading: true,
        context: null
      }
    ) {
      let timer;
      const that = this;
      const handler = {
        apply(target, _, args) {
          //  代理函数调用
          let bottomScroll = that.$refs.tableBodyWrap;
          if (bottomScroll.scrollTop == that.scrollTop) {
            return;
          }
          // 和闭包实现核心逻辑相同
          if (!options.leading) {
            if (timer) return;
            timer = setTimeout(() => {
              timer = null;
              Reflect.apply(func, options.context, args);
            }, time);
          } else {
            if (timer) {
              that.needLoad(bottomScroll);
              clearTimeout(timer);
            }
            timer = setTimeout(() => {
              Reflect.apply(func, options.context, args);
            }, time);
          }
        }
      };
      return new Proxy(func, handler);
    },
    /**
     * @desc 是否显示加载中
     * @param {*} bottomScroll
     */
    needLoad(bottomScroll) {
      if (
        Math.abs(bottomScroll.scrollTop - this.scrollTop) >
        this.trHeight * this.longListLoadRowNum
      ) {
        //  显示加载中
        this.showLoad = true;
        this.scrollTop = bottomScroll.scrollTop;
      }
    },
    /**
     * @desc 滚动处理
     * @param {*} $event
     */
    scrollProcessing($event) {
      const bottomScroll = this.$refs.tableBodyWrap;
      //  滚动方向
      const direction = bottomScroll.scrollTop >= this.scrollTop;
      //  记录上一次向下滚动的位置
      this.scrollTop = bottomScroll.scrollTop;
      if(direction) {
        this.handleScrollBottom()
      } else {
        this.handleScrollTop()
      }
      this.showLoad = false;
    },
    /**
     * @desc 滚动条向上滚动
     */
    handleScrollTop() {
      if (this.dataTop < this.scrollTop) {
        //  如果最后滚动位置在数据上方应该调用向下滚动
        this.handleScrollBottom();
        return;
      }
      //  如果加载的数据小于默认加载的数据量
      if (this.dataTotal > this.longListLoadRowNum) {
        //  数据需要处理的时候的高度
        const computeHeight = this.dataTop;
        //  不需要清除所有数据的高度
        const maxHeigth = computeHeight - this.longListLoadRowNum * this.trHeight;
        //  如果数据总数大于已经渲染的数据
        if (this.scrollTop < computeHeight && this.scrollTop >= maxHeigth) {
          //  数据顶部条数
          const dataTopNum = parseInt(this.dataTop / this.trHeight);
          dataTopNum - this.longListLoadRowNum >= 0
            ? this.dataProcessing(
              this.longListLoadRowNum,
              this.loadedNum - this.longListLoadRowNum,
              "top"
            )
            : this.dataProcessing(dataTopNum, dataTopNum, "top");
        } else if (this.scrollTop < maxHeigth) {
          //  滚动的位置在第几条数据
          const scrollNum = parseInt(this.scrollTop / this.trHeight);
          scrollNum - this.longListLoadRowNum >= 0
            ? this.dataProcessing(this.longListLoadRowNum * 2, scrollNum, "topAll")
            : this.dataProcessing(
              scrollNum + this.longListLoadRowNum,
              scrollNum,
              "topAll"
            );
        }
      }
    },
    /**
     * @desc 滚动条向下滚动
     */
    handleScrollBottom() {
      if (this.dataTop > this.scrollTop) {
        this.handleScrollTop();
        return;
      }
      //  数据需要处理的时候的高度
      const computeHeight =
        this.dataTop + this.loadedNum * this.trHeight - this.tableHeight;
      //  不需要清除所有数据的高度
      const maxHeight = computeHeight + this.trHeight * this.longListLoadRowNum;
      if (this.scrollTop > computeHeight && this.scrollTop <= maxHeight) {
        //  如果滚动高度到达数据显示底部高度
        if (this.dataTotal > this.loadedNum) {
          //  数据顶部条数
          const dataTopNum = parseInt(this.dataTop / this.trHeight);
          const total = dataTopNum + this.loadedNum + this.longListLoadRowNum;
          const otherTotal = this.dataTotal - (dataTopNum + this.loadedNum);
          total <= this.dataTotal
            ? this.dataProcessing(
              this.loadedNum - this.longListLoadRowNum,
              this.longListLoadRowNum,
              "bottom"
            )
            : this.dataProcessing(otherTotal, otherTotal, "bottom");
        }
      } else if (this.scrollTop > maxHeight) {
        //  滚动的位置在第几条数据
        let scrollNum = parseInt(this.scrollTop / this.trHeight);
        scrollNum + this.longListLoadRowNum <= this.dataTotal
          ? this.dataProcessing(scrollNum, this.longListLoadRowNum * 2, "bottomAll")
          : this.dataProcessing(
            scrollNum,
            this.dataTotal - scrollNum + this.longListLoadRowNum,
            "bottomAll"
          );
      }
    },
    //  上下滚动时数据处理
    dataProcessing(topNum, bottomNum, type) {
      const topPosition = parseInt(this.dataTop / this.trHeight);
      if (type === "top") {
        //  减去底部数据
        this.showTbodyList.splice(this.loadedNum - bottomNum, bottomNum);
        for (var i = 1; i <= topNum; i++) {
          //  加上顶部数据
          const indexNum = topPosition - i;
          this.showTbodyList.unshift(this.tbodyList[indexNum]);
        }
        //  重新计算实际渲染数据条数
        this.loadedNum = this.loadedNum + topNum - bottomNum;
        //  重新计算渲染数据的高度
        this.dataTop = this.dataTop - topNum * this.trHeight;
        this.$refs.tableBodyWrap.scrollTop =
          this.$refs.tableBodyWrap.scrollTop +
          bottomNum * this.trHeight;
      } else if (type == "bottom") {
        //  减去顶部数据
        this.showTbodyList.splice(0, topNum);
        for (var i = 0; i < bottomNum; i++) {
          //  加上底部数据
          const indexNum = topPosition + this.loadedNum + i;
          this.showTbodyList.push(this.tbodyList[indexNum]);
        }
        //  重新计算实际渲染数据条数
        this.loadedNum = this.loadedNum - topNum + bottomNum;
        //  重新计算渲染数据的高度
        this.dataTop = this.dataTop + topNum * this.trHeight;
        this.$refs.tableBodyWrap.scrollTop =
          this.$refs.tableBodyWrap.scrollTop -
          topNum * this.trHeight;
      } else if (type == "bottomAll") {
        //  减去顶部数据
        this.showTbodyList = [];
        let scrollNum = topNum;
        for (var i = 0; i < bottomNum; i++) {
          //  加上底部数据
          let indexNum = scrollNum - this.longListLoadRowNum + i;
          this.showTbodyList.push(this.tbodyList[indexNum]);
        }
        //  重新计算实际渲染数据条数
        this.loadedNum = bottomNum;
        //  重新计算渲染数据的高度
        this.dataTop = (scrollNum - this.longListLoadRowNum) * this.trHeight;
      } else if (type == "topAll") {
        //  减去顶部数据
        this.showTbodyList = [];
        let scrollNum = bottomNum;
        for (var i = 0; i < topNum; i++) {
          //  加上底部数据
          let indexNum = scrollNum - topNum + this.longListLoadRowNum + i;
          this.showTbodyList.push(this.tbodyList[indexNum]);
        }
        //  重新计算实际渲染数据条数
        this.loadedNum = topNum;
        //  重新计算渲染数据的高度
        this.dataTop = (scrollNum - topNum + this.longListLoadRowNum) * this.trHeight;
      }
      this.showLoad = false;
    }
  }
}
