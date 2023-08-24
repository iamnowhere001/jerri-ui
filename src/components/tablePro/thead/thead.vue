/****************************************************************************

所属系统: 组件库
所属模块: 组件—[thead组件]
创建时间: 2019年5月24日 08:55:53
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <table class="table__header"
         cellspacing="0"
         cellpadding="0">

    <colgroup>
      <col v-if="hasMultipleConfig"
           :width="$parent.multipleColWidth" />

      <col v-for="(th, index) in cloneTheadList"
           :name="th.props"
           :width="formatWidth(th._width)"
           :key="index" />

      <col v-if="hasYScrollbar"
           :width="scrollBarWidth + 1" />
    </colgroup>

    <!-- 表格头部 -->
    <thead>
      <!-- 表格头部插槽 -->
      <tr v-if="scopedSlots['thead']"
          :style="{
            height: `${thRowHeight}px`
          }">
        <th :colspan="countAllCol">
          <table-slot slotName="thead"></table-slot>
        </th>
      </tr>
      <!-- 表格头部插槽 -->

      <!-- 无插槽，默认渲染 -->
      <tr v-else
          :style="{
            height: `${thRowHeight}px`
          }"
          v-for="(col, i) in theadListRows">

        <!-- 拥有多选配置，且第一行时才存在单复选列 -->
        <th v-if="hasMultipleConfig && !i"
            :rowspan="theadListRows.length">

          <!-- 单复选插槽 -->
          <template v-if="scopedSlots['thCheckbox']">
            <table-slot slotName="thCheckbox"></table-slot>
          </template>
          <!-- 单复选插槽 -->
          <!-- 单复选 -->
          <template v-else-if="multiple">
            <!-- 单复选按钮 -->
            <jr-checkbox @change="selectAll"
                         :value="isSelectAll">{{$t('tablePro_全选')}}</jr-checkbox>
            <!-- 单复选按钮 -->
          </template>
          <!-- 单复选 -->
        </th>
        <!-- 拥有多选配置，且第一行时才存在单复选列 -->

        <template v-for="(th, thIndex) in col">
          <!-- 循环每一列 -->
          <th :style="{
                //  列单元格样式
                ...colStyles({th, thIndex, colType: 'thead'}),
                //  列头部样式
                ...th.tStyle
              }"
              :class="[
                //  列头部样式名
                th.tClassName,
                //  列单元格样式名
                colClassName({th, thIndex, colType: 'thead'})
              ]"
              :colspan="th.colSpan"
              :rowspan="th.rowSpan"
              :key="thIndex"
              :data-props="th.props"
              v-if="!th.thHide">
            <!-- 表格头部列满足插槽条件 -->
            <template v-if="scopedSlots['thead-' + th.props]">
              <table-slot :slotName="'thead-' + th.props"
                          :slotArgs="{
                          th,
                          thIndex
                        }"></table-slot>
            </template>
            <!-- 表格头部列满足插槽条件 -->

            <!-- jsx渲染 -->
            <template v-else-if="th['tJsxRender']">
              <JSXDom :row="{
                      th,
                      thIndex,
                      props: th.props
                    }"
                      :render="th['tJsxRender']"></JSXDom>
            </template>
            <!-- jsx渲染 -->

            <!-- 字符串HTML渲染 -->
            <template v-else-if="th['tFormatter']">
              <div v-html="th.tFormatter(th['props'], th, {
              th,
              thIndex,
              props: th.props
            })"></div>
            </template>
            <!-- 字符串HTML渲染 -->

            <!-- 对角线渲染 -->
            <template v-else-if="th['diagonal']">
              <span class="diagonal-right-text">
                {{ th.diagonalRightText }}
              </span>
              <div class="diagonal"
                   :style="diagonalStyles(th)"></div>
              <span class="diagonal-left-text">
                {{ th.diagonalLeftText }}
              </span>
            </template>
            <!-- 对角线渲染 -->

            <!-- 否则默认渲染 -->
            <div v-else
                 :style="{
                    'justify-content': th.tAlign
                  }"
                 class="cell">
              <span>
                {{ th.label }}
              </span>
              <!-- 上下排序 -->
              <div v-if="th.sort"
                   @click="handleSortClick($event, {th, thIndex})"
                   class="arrow-box j-pointer">
                <div class="up"
                     :class="{ active: th.order }">
                </div>
                <div class="down"
                     :class="{ active: !th.order }">
                </div>
              </div>
              <!-- 上下排序 -->
            </div>
          </th>
          <!-- 循环每一列 -->
        </template>

        <!-- 滚动条填充列 -->
        <th class="scrollbar-th"
            v-if="hasYScrollbar"></th>
        <!-- 滚动条填充列 -->
      </tr>
      <!-- 无插槽，默认渲染 -->
    </thead>
    <!-- 表格头部 -->

  </table>
</template>

<script>
//  表格公共混入
import mixin from "../mixins/mixin";
//  表格对角线
import diagonal from "./diagonal";

export default {
  name: "TableHead",

  inheritAttrs: false,

  inject: ["tableRoot"],

  mixins: [mixin, diagonal],

  props: {
    //  表格头部列
    cloneTheadList: Array,
    //  表格头部列行
    theadListRows: Array,
    //  表格行数据
    tbodyList: Array,
    //  是否拥有单复选配置
    hasMultipleConfig: Boolean,
    //  全选还是单选
    multiple: Boolean,
    //  多选列默认宽度
    multipleColWidth: Number,
    //  有没有竖向滚动条
    hasYScrollbar: Boolean,
    //  列单元格样式
    colStyles: Function,
    //  列单元格样式名
    colClassName: Function,
    //  表头行高度
    thHeight: Number
  },

  computed: {
    //  每一行表头的高度
    thRowHeight() {
      //  在使用了多级表头时，固定为 36像素 高度
      return this.theadListRows.length > 1 ? 36 : this.thHeight;
    },
    //  是否已经全选
    isSelectAll() {
      const tbodyList = this.tbodyList;
      let isSelectAll = true;

      if (!tbodyList.length) {
        isSelectAll = false;
      }
      if (!tbodyList.find(item => !item._disabled)) {
        isSelectAll = false;
      }
      tbodyList.forEach(item => {
        if (!item.isChecked) {
          isSelectAll = false;
        }
      });

      return isSelectAll;
    }
  },

  methods: {
    /**
     * @desc 选择全部
     */
    selectAll() {
      this.$parent.selectAll(!this.isSelectAll);
    },
    /**
     * @desc 处理排序点击
     */
    handleSortClick($event, { th, thIndex }) {
      this.$set(th, "order", !th.order);
      this.$parent.$emit("on-sort-change", th.order, th, thIndex);
    }
  }
};
</script>

<style lang="scss" scope>
.table__header {
  background-color: $--color-c4;

  .scrollbar-th {
    border-left: 1px solid $--color-c4 !important;
    border-right: 0px !important;
  }

  th {
    font-weight: bold;
    padding: 0 8px;
    font-size: 13px;
    vertical-align: middle;
    border: 1px solid $--color-c3;
    position: relative;

    .diagonal-left-text {
      position: absolute;
      font-size: 14px;
      left: 7px;
      bottom: 7px;
    }

    .diagonal-right-text {
      position: absolute;
      font-size: 14px;
      right: 7px;
      top: 7px;
    }

    .diagonal {
      position: absolute;
      transform-origin: 0px 0px;
      width: 1px;
      left: 0px;
      top: 1px;
      background-color: $--color-c3;
    }

    .cell {
      background-color: $--color-c4;
      height: 100%;
      width: 100%;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;

      .arrow-box {
        width: 8px;
        margin-left: 5px;
        padding-top: 4px;

        .up {
          width: 8px;
          height: 8px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAASElEQVQImV3KsQ2AIAAF0Qclm0icSacSN7CR3j10IRtICNf85N+Fqz4GVgR8/YiD3Jp4sc/BgnOIC3IPEmrbTsKNFHH0eiKj/MVyCfOB6eKIAAAAAElFTkSuQmCC);
          background-repeat: no-repeat;

          &.active {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAASUlEQVQImV3KsQ2AIAAF0Qclm0jsHcEtdCrRHXQaXcgGEsI1P/l3YblWHTMCvnbETm5VvNjHYMLZxQW5BQlP3UbCjRRxtHogo/wqugkA3z1dmwAAAABJRU5ErkJggg==);
          }
        }

        .down {
          width: 8px;
          height: 8px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAS0lEQVQImW3MMQ5AQBgF4c/GEanVuBQKld4xqNZNttbsnyhM85J5yTT7cS4Y/LMlTMg/54MxoaCvGxR0KKmKXEvBHNX2I1fcSLhCvmeRD3pgdQwfAAAAAElFTkSuQmCC);
          background-repeat: no-repeat;

          &.active {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAATUlEQVQImW3MMQ5AQBgF4c/GnRzBBajVuJASF6JaN9las3+iMM1L5iXTdFu/Y/LPmbAg/5wP5oSCsW5QMKCkKnItBWtU2488cCPhCvkCzMoOh0FVoSkAAAAASUVORK5CYII=);
          }
        }
      }
    }
  }
}
</style>
