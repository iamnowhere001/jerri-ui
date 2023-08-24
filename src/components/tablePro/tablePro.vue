/****************************************************************************

所属系统: 组件库
所属模块: 复杂表格组件
创建时间: 2020-01-02
维护人: 杨文杰
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div>
    <!-- 表格 -->
    <div class="table-pro-container"
         :class="[
          oldBorder ? 'border-solid' : 'border-inset'
        ]"
        ref="tableProContainer">

      <!-- 加载进度 -->
      <jr-loading-petal :visible="showLoad"
                        :style="loadingStyles" />
      <!-- 加载进度 -->

      <!-- 表格虚拟边框辅助线 -->
      <div v-show="showBorderLeft"
           class="table-border__vertical left"></div>
      <div v-show="showBorderRight"
           class="table-border__vertical right"></div>
      <div v-show="showBorderBottom"
           class="table-border__horizontal bottom"></div>
      <!-- 表格虚拟边框辅助线 -->

      <!-- 基础表格 -->
      <div class="table-wrap"
           :class="wrapClasses"
           :style="wrapStyles">

        <!-- 基础表格头部 -->
        <div ref="tableHeaderWrap"
             class="table__header-wrap"
             v-if="showHeader">
          <table-header ref="tableHeader"
                        :hasMultipleConfig="hasMultipleConfig"
                        :multiple="multiple"
                        :cloneTheadList="cloneTheadList"
                        :theadListRows="theadListRows"
                        :tbodyList="tbodyList"
                        :hasYScrollbar="hasYScrollbar"
                        :colStyles="colStyles"
                        :colClassName="colClassName"
                        :thHeight="thHeight"></table-header>
        </div>
        <!-- 基础表格头部 -->

        <!-- 基础表格主体 -->
        <div ref="tableBodyWrap"
             @scroll="handleBodyScroll"
             class="table__body-wrap"
             :class="bodyClasses"
             :style="bodyStyles"
             v-if="showBody">

          <!-- 长列表表格顶部偏移量 -->
          <div v-if="longList"
               :style="{height: `${dataTop}px` }"></div>
          <!-- 长列表表格顶部偏移量 -->

          <table-body ref="tableBody"
                      v-bind="$props"
                      :hasMultipleConfig="hasMultipleConfig"
                      :cloneTheadList="cloneTheadList"
                      :tbodyList="baseTableTbodyList"></table-body>

          <!-- 长列表表格底部偏移量 -->
          <div v-if="longList"
               :style="{height: `${tableOtherBottom}px` }"></div>
          <!-- 长列表表格底部偏移量 -->

        </div>
        <!-- 基础表格主体 -->

      </div>
      <!-- 主表格 -->

      <!-- 左侧表格固定列 -->
      <div class="table-fixed-left-wrap"
           :style="fixedLeftWrapStyles"
           v-if="hasLeftFixed">

        <!-- 左侧表格固定列表头 -->
        <div v-if="showHeader"
             class="table-fixed-left__header-wrap">
          <table-header :hasMultipleConfig="hasMultipleConfig"
                        :multiple="multiple"
                        :cloneTheadList="leftFixedCol"
                        :theadListRows="leftFixedTheadList"
                        :tbodyList="tbodyList"
                        :colStyles="colStyles"
                        :colClassName="colClassName"
                        :thHeight="thHeight"></table-header>
        </div>
        <!-- 左侧表格固定列表头 -->

        <!-- 左侧表格固定列表体 -->
        <div v-if="showBody"
             class="table-fixed-left__body-wrap"
             ref="tableFixedLeftBodyWrap"
             :style="leftFixedBodyStyles">
          <table-body v-bind="$props"
                      :hasMultipleConfig="hasMultipleConfig"
                      :cloneTheadList="leftFixedCol"></table-body>
        </div>
        <!-- 左侧表格固定列表体 -->

      </div>
      <!-- 左侧表格固定列 -->

      <!-- 右侧表格固定列 -->
      <div class="table-fixed-right-wrap"
           :style="fixedRightWrapStyles"
           v-if="hasRightFixed">

        <!-- 右侧表格固定列表头 -->
        <div v-if="showHeader"
             class="table-fixed-right__header-wrap"
             :style="rightFixedHeaderStyles">
          <table-header :hasMultipleConfig="hasMultipleConfig"
                        :multiple="multiple"
                        :cloneTheadList="rightFixedCol"
                        :theadListRows="rightFixedTheadList"
                        :tbodyList="tbodyList"
                        :colStyles="colStyles"
                        :colClassName="colClassName"
                        :thHeight="thHeight"></table-header>
        </div>
        <!-- 右侧表格固定列表头 -->

        <!-- 右侧表格固定列表体 -->
        <div v-if="showBody"
             class="table-fixed-right__body-wrap"
             ref="tableFixedRightBodyWrap"
             :style="rightFixedBodyStyles">
          <table-body v-bind="$props"
                      :hasMultipleConfig="hasMultipleConfig"
                      :cloneTheadList="rightFixedCol"></table-body>
        </div>
        <!-- 右侧表格固定列表体 -->

      </div>
      <!-- 右侧表格固定列 -->

      <!-- 用于遮挡右侧表格固定列右上方空缺的卡片 -->
      <div class="table-fixed-right__header-card"
           :style="{
            height: theadHeight + 'px',
            width: YScrollbarWidth + 'px'
          }"
           v-if="hasRightFixed"></div>
      <!-- 用于遮挡右侧表格固定列右上方空缺的卡片 -->

    </div>
    <!-- 表格 -->

    <!-- 分页 -->
    <jr-page v-if="$attrs.total && $attrs.currentPage"
             v-bind="$attrs"
             v-on="$listeners" />
    <!-- 分页 -->
  </div>

</template>

<script>
//  表格头部
import TableHeader from "./thead/thead.vue";
//  表格主体
import TableBody from "./tbody/tbody.vue";
//  长列表
import longList from "./mixins/longList";

import {
  //  筛选不同类型的列
  convertColumnOrder,
  //  获取全部列数量
  getAllColumns
} from "./utils";

export default {
  name: "JrTablePro",
  mixins: [longList],
  components: {
    TableHeader,
    TableBody
  },
  provide() {
    return {
      tableRoot: this
    };
  },
  props: {
    //  表格高度
    height: {
      type: [Number, String]
    },

    //  表格最大高度
    maxHeight: {
      type: [Number, String]
    },

    //  表格头部配置
    theadList: {
      type: Array,
      default() {
        return [];
      }
    },

    //  展示表格头部
    showHeader: {
      type: Boolean,
      default: true
    },

    //  展示表体
    showBody: {
      type: Boolean,
      default: true
    },

    //  表格列表数据
    tbodyList: {
      type: Array,
      default() {
        return [];
      }
    },

    //  当没有配置列宽度时，通用最小列宽度
    colWidth: {
      type: Number,
      default: 100
    },

    //  列样式
    colStyles: {
      type: Function,
      default() {
        return () => {};
      }
    },

    //  列样式名
    colClassName: {
      type: Function,
      default() {
        return () => {};
      }
    },

    //  行样式
    rowStyles: {
      type: Function,
      default() {
        return () => {};
      }
    },

    //  行样式名称
    rowClassName: {
      type: Function,
      default() {
        return () => {};
      }
    },

    //  单元格样式
    cellStyles: {
      type: Function,
      default() {
        return () => {};
      }
    },

    //  单元格样式名称
    cellClassName: {
      type: Function,
      default() {
        return () => {};
      }
    },

    /**
     * 列表单元格合并配置
     *
     * 例如：
     * 将第一行的param列，往下合并全部
     * 将第二行的name列，往右合并一格
     *
     * 配置：
     * {
     *   1: {
     *     param: { y: "all"}
     *   },
     *   2: {
     *     name: { x: 2}
     *   }
     * }
     */
    mergeConfig: {
      type: Object,
      default() {
        return null;
      }
    },

    //  是否检查合并配置（用于内容经常发生改变的表格，一旦配置不正确，会停止合并，但不会提示错误）
    checkMerge: {
      type: Boolean,
      default: true
    },

    //  自动合并
    autoMerge: {
      type: Boolean,
      default: false
    },

    /**
     * 树状表格配置
     */
    treeTableConfig: {
      type: Array,
      default() {
        return null;
      }
    },

    /**
     * 树状表格数据
     */
    treeTableData: {
      type: Array,
      default() {
        return null;
      }
    },

    //  点击行时是否自动选择此列（在多选类型时才生效）
    clickToSelect: {
      type: Boolean,
      defalut: false
    },

    /**
     * 是否多选
     * 为null时，不存在多选列
     * 为true时，多选列类型为多选
     * 为false时，多选列类型为单选
     */
    multiple: {
      type: Boolean,
      default: null
    },

    //  多选列默认宽度
    multipleColWidth: {
      type: Number,
      default: 100
    },

    //  是否支持打印
    isPrint: {
      type: Boolean,
      default: false
    },

    //  触摸行时显示底色
    isTrHover: {
      type: Boolean,
      default: true
    },

    //  表格项内容为空时的默认文本
    defaultText: {
      type: String,
      default: "--"
    },

    //  表格列表没有数据时的默认文本
    noDataText: {
      type: String,
      default: "暂无内容"
    },

    //  表格行内容不换行
    isNoWrap: {
      type: Boolean,
      default: true
    },

    //  使用旧边框模式
    oldBorder: {
      type: Boolean,
      default: false
    },

    //  使用v-title
    useVTitle: {
      type: Boolean,
      default: true
    },

    //  附加编辑行
    additionCell: {
      type: [Boolean, Array, String, Function],
      default() {
        return false;
      }
    },

    //  长列表
    longList: {
      type: Boolean,
      default: false
    },

    //  默认加载行数
    longListLoadRowNum: {
      type: Number,
      default() {
        return 20;
      }
    },

    //  表头行高
    thHeight: {
      type: Number,
      default() {
        return 45;
      }
    },

    //  表格行高
    trHeight: {
      type: Number,
      default() {
        return 45;
      }
    },

    //  行单复选改变前回调事件
    beforeRowSelectChange: {
      type: Function,
    },

    // 全选前的钩子
    beforeSelectAll: {
      type: Function
    }
  },
  data() {
    const scrollbarWidth = this.$utils.scrollbarWidth();
    return {
      //  表格高度
      tableHeight: "",
      //  表格头部高度
      theadHeight: "",
      //  表体高度
      bodyHeight: "",
      //  X轴滚动条高度
      XScrollbarHeight: scrollbarWidth,
      //  X轴滚动条
      hasXScrollbar: false,
      //  表格X轴滚动长度
      tableScrollLeft: 0,
      //  Y轴滚动条宽度
      YScrollbarWidth: scrollbarWidth,
      //  Y轴滚动条
      hasYScrollbar: false,
      //  表格Y轴滚动长度
      tableScrollTop: 0,
      /**
       * 经过格式化的表头列表配置
       *
       * 1. 计算分配出每个列的实际宽度
       * 2. 将存在子列的头部配置拆分为多列
       * 3. 格式化为 左边列 + 中间列 + 右边列
       * 例如一个原始的配置：
       *
       * [
       *  { props: "name", label: "名称" },
       *  { props: "date", label: "日期", fixed: "left" },
       *  { props: "age", label: "年龄" }
       *  { props: "operate", label: "操作", fixed: "right" }
       * ]
       *
       * 会被转化为：
       *
       * [
       *  { props: "date", label: "日期", fixed: "left" },
       *  { props: "name", label: "名称" },
       *  { props: "age", label: "年龄" },
       *  { props: "operate", label: "操作", fixed: "right" }
       * ]
       */
      cloneTheadList: [],
      /**
       * 经过格式化的表头列行
       * 解析多级表头为一行行数组
       *
       * [
       *  行,
       *  行,
       *  行
       * ]
       */
      theadListRows: [],
      /**
       * 经过格式化的左侧固定列表头列行
       *
       * [
       *  行,
       *  行,
       *  行
       * ]
       */
      leftFixedTheadList: [],
      /**
       * 经过格式化的右侧固定列表头列行
       *
       * [
       *  行,
       *  行,
       *  行
       * ]
       */
      rightFixedTheadList: [],
      //  展示右侧辅助线
      showBorderRight: false,
      //  展示左侧辅助线
      showBorderLeft: false,
      //  展示底部辅助线
      showBorderBottom: false
    };
  },
  computed: {
    loadingStyles() {
      return {
        top: `${this.theadHeight}px`,
        right: `${this.XScrollbarHeight}px`,
        height: `calc(100% - ${this.theadHeight}px - ${this.XScrollbarHeight}px)`
      };
    },

    //  基础表格使用的表格数据
    baseTableTbodyList() {
      return this.longList ? this.showTbodyList : this.tbodyList;
    },

    //  基础表格外壳样式集合
    wrapStyles() {
      return {
        height: this.height + "px"
      };
    },

    //  基础表格外壳样式名集合
    wrapClasses() {
      return [
        {
          "jr-table-print": this.isPrint
        }
      ];
    },

    //  基础表体样式集合
    bodyStyles() {
      const style = {};

      if (this.showHeader) {
        style["margin-top"] = this.oldBorder ? "" : "-1px";
      }

      if (this.bodyHeight !== 0) {
        const bodyHeight = this.bodyHeight;
        //  默认高度优先级大于最大高度
        if (this.height) {
          //  @Todo: August - 新边线模式下需要加 1
          style.height = `${bodyHeight + (!this.oldBorder ? 1 : 0)}px`;
        } else if (this.maxHeight) {
          style.maxHeight = `${bodyHeight}px`;
        }
      }
      return style;
    },

    //  基础表体样式名集合
    bodyClasses() {
      return [
        {
          [`table__body-wrap-overflowX`]: this.hasXScrollbar,
          [`table__body-wrap-overflowY`]: this.hasYScrollbar
        }
      ];
    },

    //  传入多选配置了吗？，用于判断多选配置是否一个合法的布尔值
    hasMultipleConfig() {
      return (
        Object.prototype.toString.call(this.multiple) === "[object Boolean]"
      );
    },

    //  已选择的行
    checkedData() {
      return this.tbodyList.filter(item => item.isChecked);
    },

    //  已经选择了全部
    isCheckedAll() {
      if (this.tbodyList.length) {
        return this.checkedData.length === this.tbodyList.length;
      } else {
        return false;
      }
    },

    //  表格总共高度
    totalHeight() {
      return this.theadHeight + this.bodyHeight;
    },

    //  显示左侧固定列表格
    hasLeftFixed() {
      return (
        this.leftFixedCol.length && this.hasXScrollbar && this.tbodyList.length
      );
    },

    //  左侧固定列表格外壳样式集合
    fixedLeftWrapStyles() {
      const style = {
        //  左侧固定列表格宽度 @Todo: August - 此处加1是因为需要盖过背后的列
        width: this.leftFixedWidth + 1 + "px",
        //  左侧固定列表格高度（在拥有竖向滚动条时）
        height: `calc(100% - ${
          this.hasXScrollbar ? `${this.XScrollbarHeight}px` : `0px`
        })`
      };
      return style;
    },

    //  左侧——固定列数组
    leftFixedCol() {
      return this.cloneTheadList.filter(th => th.fixed && th.fixed === "left");
    },

    //  左侧——固定列——总宽度
    leftFixedWidth() {
      return this.leftFixedCol.reduce(
        (prev, current) => prev + current._width,
        this.hasMultipleConfig ? this.multipleColWidth : 0
      );
    },

    //  左侧——固定列——表体样式
    leftFixedBodyStyles() {
      const style = {
        "margin-top": this.bodyStyles["margin-top"]
      };
      if (this.bodyHeight) {
        const bodyHeight = parseInt(this.bodyHeight);
        const height = this.hasYScrollbar
          ? bodyHeight - this.YScrollbarWidth
          : bodyHeight;
        style.height = height + "px";
      }
      return style;
    },

    //  显示右侧固定列表格
    hasRightFixed() {
      return (
        this.rightFixedCol.length && this.hasXScrollbar && this.tbodyList.length
      );
    },

    //  右侧固定列表格外壳样式集合
    fixedRightWrapStyles() {
      const style = {
        //  右侧固定列表格宽度
        width: this.rightFixedWidth + "px",
        //  右侧固定列表格高度
        height: `calc(100% - ${
          this.hasXScrollbar ? `${this.XScrollbarHeight}px` : `0px`
        })`,
        //  拥有Y轴滚动条时，右侧固定列表格需要距离右侧一点距离
        right: this.hasYScrollbar ? `${this.XScrollbarHeight}px` : ""
      };
      return style;
    },

    //  右侧——固定列数组
    rightFixedCol() {
      return this.cloneTheadList.filter(th => th.fixed && th.fixed === "right");
    },

    //  右侧——固定列——总宽度
    rightFixedWidth() {
      return this.rightFixedCol.reduce(
        (prev, current) => prev + current._width,
        0
      );
    },

    //  右侧——固定列——表头样式
    rightFixedHeaderStyles() {
      return {
        height: this.theadHeight + "px",
        position: "absolute",
        right: 0,
        top: 0
      };
    },

    //  右侧——固定列——表体样式
    rightFixedBodyStyles() {
      const style = {
        position: "absolute",
        right: 0,
        top: this.theadHeight + "px",
        "margin-top": this.bodyStyles["margin-top"]
      };
      if (this.bodyStyles.height) {
        const bodyHeight = parseInt(this.bodyStyles.height);
        const height = this.hasXScrollbar
          ? bodyHeight - this.XScrollbarHeight
          : bodyHeight;
        style.height = height + "px";
      }
      return style;
    }
  },
  watch: {
    //  固定高度变化时，需要重新计算是否出现Y轴滚动条
    height() {
      this.countTbodySize();
    },

    //  最大高度变化时，需要重新计算是否出现Y轴滚动条
    maxHeight() {
      this.countTbodySize();
    },

    /**
     * 表格头部配置改变时
     * 1. 重新计算整个表格
     */
    theadList: {
      deep: true,
      handler() {
        //  计算表头各配置
        this.calcTheadOptions();
        this.$nextTick(() => {
          //  初始化表格的尺寸
          this.handleResize();
        });
      }
    },

    /**
     * 表格内容列表改变时：
     * 1. 重新计算表格内容尺寸
     */
    tbodyList: {
      deep: true,
      handler() {
        this.countTbodySize();
      }
    },

    //  监听选择全部改变，进行事件发送
    isCheckedAll() {
      //  存在表格内容数据 且 为多选时
      if (this.tbodyList.length && this.multiple === true) {
        this.$emit("on-select-all", this.isCheckedAll, this.checkedData);
      }
    }
  },
  created() {
    //  计算表头各配置
    this.calcTheadOptions();
  },
  mounted() {
    //  初次初始化表格的尺寸
    this.handleResize();
    //  监听容器大小改变事件
    this.$utils.addResizeListener(
      this.$refs.tableProContainer,
      this.handleResize
    );
  },
  beforeDestroy() {
    //  移除监听容器大小改变事件
    this.$utils.removeResizeListener(
      this.$refs.tableProContainer,
      this.handleResize
    );
  },
  methods: {
    /**
     * @desc 处理表格主体滚动事件
     */
    handleBodyScroll() {
      if (!this.showBody) {
        return;
      }

      const {
        scrollLeft,
        scrollWidth,
        clientWidth,
        scrollTop,
        scrollHeight,
        clientHeight
      } = this.$refs.tableBodyWrap;
      this.tableScrollLeft = scrollLeft;
      this.tableScrollTop = scrollTop;

      //  表格头部横向滚动长度
      if (this.showHeader) {
        this.$refs.tableHeaderWrap.scrollLeft = scrollLeft;
      }
      //  左侧固定表格竖向滚动长度
      if (this.hasLeftFixed && this.$refs.tableFixedLeftBodyWrap) {
        this.$refs.tableFixedLeftBodyWrap.scrollTop = scrollTop;
      }
      //  右侧固定表格竖向滚动长度
      if (this.hasRightFixed && this.$refs.tableFixedRightBodyWrap) {
        this.$refs.tableFixedRightBodyWrap.scrollTop = scrollTop;
      }

      //  使用旧边框模式
      if (this.oldBorder) {
        return;
      }

      //  拥有横向滚动条，默认显示底部滚动条
      if (this.hasXScrollbar) {
        this.showBorderBottom = true;

        //  已经向右滚动
        if (this.tableScrollLeft) {
          this.showBorderLeft = true;

          //  滚动到了右侧尽头
          if (
            !this.hasYScrollbar &&
            scrollWidth - clientWidth === this.tableScrollLeft
          ) {
            this.showBorderRight = false;
          }
          //  开始向右滚动但未滚动到右侧尽头
          else {
            this.showBorderRight = true;
          }
        }
        //  未向右滚动，隐藏左侧边线，显示右侧边线
        else {
          this.showBorderLeft = false;
          this.showBorderRight = true;
        }
      }

      //  拥有竖向滚动条时，默认显示右侧边线
      if (this.hasYScrollbar) {
        this.showBorderRight = true;

        //  可滚动高度 减去 可视高度 等于 已滚动高度，说明滚到低
        if (
          scrollHeight - clientHeight === this.tableScrollTop &&
          !this.hasXScrollbar
        ) {
          this.showBorderBottom = false;
        } else {
          this.showBorderBottom = true;
        }
      }

      this.$nextTick(() => {
        ["scrollLeft", "scrollTop"].forEach(scrollType =>
          this.atScrollEmit(scrollType, {
            scrollLeft,
            scrollWidth,
            clientWidth,
            scrollTop,
            scrollHeight,
            clientHeight
          })
        );
      });
    },
    /**
     * @desc 在满足情况下，发布事件
     * @param { String } scrollType 滚动类型
     * @param { Object } scrollOption 滚动配置
     */
    atScrollEmit(scrollType, scrollOption) {
      const scrollEvent = this.$listeners[`on-${scrollType}`];

      //  存在滚动事件执行配置事件
      if (scrollEvent && this.$utils.isFunction(scrollEvent)) {
        scrollEvent(scrollOption);
      }
    },
    /**
     * @desc 计算表头各配置（注意，为了让渲染速度更块，此方法必须要提前执行）
     */
    calcTheadOptions() {
      this.cloneTheadList = this.formatTheadList(this.theadList);
      this.theadListRows = this.formatTheadListRow();
      this.leftFixedTheadList = this.formatTheadListRow("left");
      this.rightFixedTheadList = this.formatTheadListRow("right");
    },
    /**
     * @desc 处理页面布局变化后的表格尺寸
     */
    handleResize() {
      //  计算并分配每一列宽度
      this.countThWidth();
      //  计算表头尺寸，判断是否需要出现横向滚动条
      this.countTheadSize();
      //  计算表体尺寸，判断是否需要出现竖向滚动条
      this.countTbodySize();
      this.$nextTick(() => {
        //  记录表格高度
        this.tableHeight = this.$refs.tableProContainer.clientHeight;
        //  计算此时是否需要出现辅助边框线
        this.handleBodyScroll();
      });
    },
    /**
     * @desc 计算列宽度
     * 列宽度存在三种类型 数字 带单位的值 百分比
     */
    countThWidth() {
      //  表格容器宽度
      const tableWidth = this.$el.offsetWidth - 1;
      //  存在宽度的列
      let hasWidthThArr = [];
      //  不存在宽度的列
      let unHasWidthThArr = [];

      //  分类已有宽度列，和没有宽度列
      this.cloneTheadList.forEach(th => {
        let colWidth = th.width;

        //  存在列宽度
        if (colWidth) {
          //  不为数字宽度配置
          if (!this.$utils.isNumber(colWidth)) {
            //  像素宽度
            if (colWidth.includes("px")) {
              colWidth = colWidth.split("px")[0];
            }
            //  百分比宽度
            else if (colWidth.includes("%")) {
              colWidth = (colWidth.split("%")[0] / 100) * tableWidth;
            }
            //  默认转数字处理
            else {
              colWidth = +colWidth;
            }
          }
          //  校验宽度的合法性
          this.ruleWidth(th, colWidth);
          hasWidthThArr.push(th);
        } else {
          //  清空私有宽度
          if (th._width) {
            th._width = "";
          }
          unHasWidthThArr.push(th);
        }
      });

      //  过滤赋值每一列的宽度，并收集总共已使用的宽度
      const usedWidth = hasWidthThArr.reduce((prev, current) => {
        return prev + current._width;
      }, 0);

      //  单复选列宽度
      const multipleColWidth =
        this.multipleColWidth > 0 ? this.multipleColWidth : 0;
      //  剩余宽度
      const surplusWidth = tableWidth - usedWidth - multipleColWidth;
      //  自动分配的宽度
      let autoWidth;
      //  剩余宽度下，分配给每一列的平均宽度
      const averageWidth = surplusWidth / unHasWidthThArr.length;

      if (
        //  存在剩余宽度，同时平均宽度小于列最小的宽度
        (surplusWidth > 0 && averageWidth < this.colWidth) ||
        //  不存在剩余宽度
        surplusWidth <= 0
      ) {
        autoWidth = this.colWidth;
        unHasWidthThArr.forEach(th => this.ruleWidth(th, autoWidth));
      }
      //  存在剩余宽度
      else if (surplusWidth > 0) {
        autoWidth = averageWidth;
        unHasWidthThArr.forEach(th => this.ruleWidth(th, autoWidth, true));
      }
    },
    /**
     * @desc 校验并设置每一列的宽度
     * @param { Object } th 列
     * @param { Number } colWidth 列宽度
     * @param { Boolean } atNotPassSet 仅在校验不通过时设置默认值，否则不设置默认值
     */
    ruleWidth(th, colWidth, atNotPassSet = false) {
      let notPass;

      //  如最小宽大于自动分配宽度
      if (th.minWidth > colWidth) {
        colWidth = th.minWidth;
        notPass = true;
      }

      //  如最大宽小于自动分配宽度
      else if (th.maxWidth < colWidth) {
        colWidth = th.maxWidth;
        notPass = true;
      }

      //  在校验不通过时设置默认值
      if (atNotPassSet) {
        //  为了让开关语句进入此处，不执行下面设置默认值逻辑，分开写两个开关块
        if (notPass) {
          this.$set(th, "_width", colWidth);
        }
      } else {
        this.$set(th, "_width", colWidth);
      }
    },

    /**
     * @desc 计算表头尺寸
     * 1. 判断是否需要出现横向滚动条
     */
    countTheadSize() {
      this.$nextTick(() => {
        if (!this.$refs.tableHeader) {
          return (this.hasXScrollbar = false);
        }

        const $header = this.$refs.tableHeader.$el;

        this.theadHeight = $header.offsetHeight;
        this.hasXScrollbar = $header.offsetWidth - 11 > this.$el.offsetWidth;
      });
    },

    /**
     * @desc 计算表体尺寸
     * 1. 判断是否需要出现竖向滚动条
     */
    countTbodySize() {
      if (!this.$refs.tableBody) {
        return;
      }
      const getStyle = this.$utils.getStyle;
      this.$nextTick(() => {
        //  存在高度配置
        if (this.height || this.maxHeight) {
          //  表格头部高度
          const headerHeight = this.$refs.tableHeader
            ? parseInt(getStyle(this.$refs.tableHeader.$el, "height"))
            : 0;

          //  固定高度
          if (this.height) {
            this.bodyHeight = this.height - headerHeight;
          }
          //  最大高度
          else if (this.maxHeight) {
            this.bodyHeight = this.maxHeight - headerHeight;
          }

          //  若表头加表体内容超出容器，说明存在Y轴滚动条
          this.hasYScrollbar =
            this.$refs.tableBody.$el.offsetHeight + headerHeight >
            (this.height || this.maxHeight);
        } else {
          this.bodyHeight = this.$refs.tableBody.$el.offsetHeight;
        }
      });
    },

    /**
     * @desc 选择全部
     * @param {Boolean} val 是否全选
     */
    selectAll(val) {
      if(this.$utils.isFunction(this.beforeSelectAll) && !this.beforeSelectAll(val)) {
        return false;
      }

      this.tbodyList.forEach(item => {
        this.$set(item, "isChecked", val);
      });
    },

    /**
     * @desc 过滤表格头部配置
     */
    formatTheadList(theadList) {
      const left = [];
      const center = [];
      const right = [];

      let allTheadList = getAllColumns(theadList);

      allTheadList.forEach((th, index) => {
        if (th.sort) {
          this.$set(th, "order", true);
        }

        if (th.fixed && th.fixed === "left") {
          left.push(th);
        } else if (th.fixed && th.fixed === "right") {
          right.push(th);
        } else {
          center.push(th);
        }
      });

      const cloneTheadList = [...left, ...center, ...right];
      return cloneTheadList;
    },
    /**
     * @desc 格式化并返回表头配置的每一行
     */
    formatTheadListRow(fixedType = false) {
      //  原本列
      const originColumns = this.$utils.deepCopy(
        convertColumnOrder(this.theadList, fixedType)
      );

      //  最大等级
      let maxLevel = 1;

      /**
       * @desc 根据子列配置，转换列宽度属性
       */
      const traverse = (column, parent) => {
        if (parent) {
          column.level = parent.level + 1;
          if (maxLevel < column.level) {
            maxLevel = column.level;
          }
        }
        //  存在自定义列合并属性，不计算以下逻辑
        if (column.colSpan) {
          return;
        }
        if (column.children) {
          let colSpan = 0;
          column.children.forEach(subColumn => {
            traverse(subColumn, column);
            colSpan += subColumn.colSpan;
          });
          column.colSpan = colSpan;
        } else {
          column.colSpan = 1;
        }
      };

      //  设置原本列的等级为一级
      originColumns.forEach(column => {
        column.level = 1;
        traverse(column);
      });

      const rows = [];
      for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
      }

      const allColumns = getAllColumns(originColumns, true);

      allColumns.forEach(column => {
        if (!column.children) {
          column.rowSpan = maxLevel - column.level + 1;
        } else {
          column.rowSpan = 1;
        }
        rows[column.level - 1].push(column);
      });

      return rows;
    },
    /**
     * @desc 表格内部可编辑单元格校验
     */
    validate(...args) {
      this.$refs.tableBody.jrFormValidate(...args);
    },
    /**
     * @desc 重置表单的值
     */
    resetForm(...args) {
      this.$refs.tableBody.jrFormResetForm(...args);
    },
    /**
     * @desc 移除表单校验项
     */
    clearValidate(...args) {
      this.$refs.tableBody.jrFormClearValidate(...args);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./css/tablePro.scss";
</style>
<style lang="scss">
@import "./css/tableBorder-solid.scss";
@import "./css/tableBorder-inset.scss";
</style>
