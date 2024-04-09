/****************************************************************************

所属系统: 组件库
所属模块: 组件—[tbody组件]
创建时间: 2019年5月24日 08:55:53

***************************************************************************/
<template>
  <table class="table__body"
         cellspacing="0"
         cellpadding="0">

    <colgroup>
      <col v-if="hasMultipleConfig"
           :width="$parent.multipleColWidth" />

      <col v-for="(th, index) in cloneTheadList"
           :name="th.props"
           :width="formatWidth(th._width)"
           :key="index" />
    </colgroup>

    <tbody>
      <tr v-for="(tr, trIndex) in tbodyList"
          :class="[
            //  触摸行时带有底色
            {
              'is-hover': isTrHover
            },
            //  自定义行样式名称
            rowClassName({tr, trIndex})
          ]"
          :style="{
            ...rowStyles({tr, trIndex}),
            height: `${trHeight}px`
          }"
          :key="trIndex"
          :data-index="trIndex"
          @click="rowClick($event, {tr, isChecked: tr.isChecked, trIndex})"
          @mouseenter="rowMouseEnter($event, {tr, trIndex})"
          @mouseleave="rowMouseLeave($event, {tr, trIndex})">

        <!-- 单复选单元格 -->
        <td v-if="hasMultipleConfig">
          <!-- 针对某行单复选插槽 -->
          <template v-if="scopedSlots['checkbox-' + trIndex]">
            <table-slot :slotName="'checkbox-' + trIndex"
                        :slotArgs="{
                          tr,
                          trIndex
                        }"></table-slot>
          </template>
          <!-- 针对某行单复选插槽 -->

          <!-- 全部单复选插槽 -->
          <template v-else-if="scopedSlots['checkbox']">
            <table-slot slotName="checkbox"
                        :slotArgs="{
                          tr,
                          trIndex
                        }"></table-slot>
          </template>
          <!-- 全部单复选插槽 -->

          <!-- 默认单复选按钮 -->
          <template v-else>
            <jr-checkbox @input="(isChecked) => rowCheckboxClick(isChecked, tr, trIndex)"
                         :value="tr.isChecked"></jr-checkbox>
          </template>
          <!-- 默认单复选按钮 -->
        </td>
        <!-- 单复选单元格 -->

        <!-- 循环行中的每一列 -->
        <template v-for="(th, thIndex) in cloneTheadList">

          <td v-if="canRender(thIndex + 1, trIndex + 1)"
              v-title="cellUseVTitle({tr, trIndex, th, thIndex})"
              v-bind="mergeCell(thIndex + 1, trIndex + 1)"
              :class="[
                //  根据单元格类型返回样式名
                cellClass4Type({tr, trIndex, th, thIndex, value: tr[th.props]}),
                //  自定义单元格样式
                cellClassName({tr, trIndex, th, thIndex, value: tr[th.props]}),
                //  列样式名
                colClassName({tr, trIndex, th, thIndex, value: tr[th.props], colType: 'tbody'})
              ]"
              :style="{
                //  单元格样式
                ...cellStyles({tr, trIndex, th, thIndex, value: tr[th.props]}),
                //  列样式
                ...colStyles({tr, trIndex, th, thIndex, value: tr[th.props], colType: 'tbody'}),
                //  内容居中
                'text-align': th.align
              }"
              :key="thIndex"
              @click="cellClick({tr, trIndex, th, thIndex, value: tr[th.props]})">

            <!-- 可编辑单元格 -->
            <template v-if="isEditCell({tr, trIndex, th, thIndex})">
              <jr-form ref="editCellForm"
                       :data-trIndex="trIndex"
                       :data-thIndex="thIndex"
                       :model="tr"
                       :rules="optionalRender({tr, trIndex, th, thIndex}, 'cellEditRules', {})">
                <jr-form-item v-bind="optionalRender({tr, trIndex, th, thIndex}, 'cellEditFormItemAttr', {})" :prop="th.props">
                  <component :is="'jr-' + cellEditNameRender({tr, trIndex, th, thIndex})"
                             v-model.trim="tr[th.props]"
                             v-bind="optionalRender({tr, trIndex, th, thIndex}, 'cellEditAttr', false)"
                             v-on="optionalRender({tr, trIndex, th, thIndex}, 'cellEditEvent', false)" />
                </jr-form-item>
              </jr-form>
            </template>
            <!-- 可编辑单元格 -->

            <!-- 满足插槽条件 -->
            <template v-else-if="scopedSlots[th.props]">
              <table-slot :slotName="th.props"
                          :slotArgs="{
                            tr,
                            trIndex,
                            th,
                            thIndex,
                            props: th.props,
                            value: tr[th.props],
                            row: {
                              row: tr,
                              col: th,
                              thIndex,
                              trIndex
                            }
                          }"></table-slot>
            </template>
            <!-- 满足插槽条件 -->

            <!-- jsx渲染 -->
            <template v-else-if="th['jsxRender']">
              <JSXDom :row="{
                        tr,
                        trIndex,
                        th,
                        thIndex,
                        props: th.props,
                        value: tr[th.props]
                      }"
                      :render="th['jsxRender']"></JSXDom>
            </template>
            <!-- jsx渲染 -->

            <!-- 字符串HTML渲染 -->
            <template v-else-if="th.formatter">
              <div v-html="th.formatter(th['props'], tr, {
                tr,
                trIndex,
                th,
                thIndex,
                props: th.props,
                value: tr[th.props]
              })"></div>
            </template>
            <!-- 字符串HTML渲染 -->

            <!-- 编辑列 -->
            <template v-else-if="th.operateBtns">
              <div>
                <i v-for="(iconItem, iconIndex) in th.operateBtns"
                   v-if="iconOptionalRender(iconItem, 'hidden', {tr,
                                            trIndex,
                                            th,
                                            thIndex,
                                            props: th.props,
                                            value: tr[th.props]})"
                   v-bind="iconOptionalRender(iconItem, 'attr', {tr,
                                            trIndex,
                                            th,
                                            thIndex,
                                            props: th.props,
                                            value: tr[th.props]})"
                   v-on="iconOptionalRender(iconItem, 'event',{tr,
                                            trIndex,
                                            th,
                                            thIndex,
                                            props: th.props,
                                            value: tr[th.props]})"></i>
              </div>
            </template>
            <!-- 编辑列 -->

            <!-- 序号列 -->
            <template v-else-if="th['props'] === 'index'">
              {{ renderIndex(trIndex) }}
            </template>
            <!-- 序号列 -->

            <!-- 普通文本渲染 -->
            <template v-else>
              {{ defaultTextRender(tr[th['props']]) }}
            </template>
            <!-- 普通文本渲染 -->

          </td>

        </template>
        <!-- 循环行中的每一列 -->
      </tr>

      <!-- 没有数据 -->
      <tr v-if="noData"
          :style="{
            height: `${trHeight}px`
          }">
        <td class="text-center no-data"
            :colspan="countAllCol">
          <table-slot v-if="scopedSlots['noData']"
                      slotName="noData"></table-slot>
          <div v-else>
            {{noDataText}}
          </div>
        </td>
      </tr>
      <!-- 没有数据 -->

      <!-- 末尾附加列 -->
      <div v-show="additionCell && showAdditionCell"
           :style="additionCellStyle"
           :class="additionCellClassName"
           @mouseenter="showAdditionCell = true"
           @mouseleave="hideAdditionCell"
           class="addition-cell">
        <table-slot v-if="scopedSlots['additionCell']"
                    slotName="additionCell"
                    :slotArgs="{
                      tr,
                      trIndex
                    }"></table-slot>

        <template v-else>
          <div v-if="showAdditionBtn('add')"
               title="新增"
               class="j-add-btn add-btn"
               @click="additionBtnClick('add')">
          </div>

          <div v-if="showAdditionBtn('del')"
               title="删除"
               class="j-del-icon del-btn"
               @click="additionBtnClick('del')">
            <i></i>
          </div>
        </template>
      </div>
      <!-- 末尾附加列 -->

    </tbody>
  </table>
</template>

<script>
//  表格合并
import merge from "./merge";
//  表格自动合并
import autoMerge from "./autoMerge";
//  表格附加列
import additionCell from "./additionCell";
//  表格操作列
import operateCell from "./operateCell";
//  树状表单表格
import treeTable from "./treeTable";
//  表格公共混入
import mixin from "../mixins/mixin";

export default {
  name: "TableBody",
  inheritAttrs: false,
  inject: ["tableRoot"],
  mixins: [merge, autoMerge, treeTable, mixin, additionCell, operateCell],
  props: {
    isTrHover: Boolean,
    hasMultipleConfig: Boolean,
    multipleColWidth: Number,
    multiple: Boolean,
    cloneTheadList: Array,
    tbodyList: Array,
    rowStyles: Function,
    rowClassName: Function,
    cellStyles: Function,
    cellClassName: Function,
    colStyles: Function,
    colClassName: Function,
    checkMerge: Boolean,
    clickToSelect: Boolean,
    defaultText: String,
    noDataText: String,
    isNoWrap: Boolean,
    useVTitle: Boolean,
    trHeight: Number,
    beforeRowSelectChange: Function
  },
  computed: {
    //  没有数据
    noData() {
      return !this.tbodyList || this.tbodyList.length === 0;
    },
    //  默认内容渲染
    defaultTextRender(text) {
      return text => (text === 0 || text ? text : this.defaultText);
    },
    //  单元格使用v-title
    cellUseVTitle(...args) {
      return args => {
        //  可编辑单元格时，不使用 v-title
        const isEditCell = this.isEditCell(args);
        return isEditCell ? false : this.useVTitle;
      };
    },
    /**
     * 根据单元格类型返回样式名
     * cellClass (4 four for) type
     */
    cellClass4Type(args) {
      return args => {
        const { th } = args;

        let classes = {
          //  行内容不换行
          "is-nowrap": this.$utils.hasAttr(th, "noWrap")
            ? th.nowrap
            : this.isNoWrap
        };

        //  可编辑单元格时，附加额外样式
        if (this.isEditCell(args)) {
          let cellEditName = this.cellEditNameRender(args);
          let cellEditAttr = this.optionalRender(args, "cellEditAttr", false);
          let cellEditAlignCenter = this.optionalRender(
            args,
            "cellEditAlignCenter",
            false
          );

          //  文本域类型
          if (
            cellEditName === "input" &&
            cellEditAttr &&
            cellEditAttr.type === "textarea"
          ) {
            cellEditName = "input-textarea";
          }

          //  默认样式类名，及边框触摸
          classes = {
            ...classes,
            //  编辑单元格 触摸单元格边框高亮
            "edit-cell j-green-bd-hover": true,
            //  编辑单元格内容居中样式，必须不为文本域才能启用
            "edit-cell-center":
              cellEditName === "input-textarea"
                ? false
                : th.cellEditAlignCenter,
            //  可编辑单元格所属组件样式名
            [`edit-cell-${cellEditName}`]: true
          };
        }

        if (th.operateBtns) {
          classes["operate-cell"] = true;
        }

        return classes;
      };
    },
    /**
     * 根据配置，返回是否编辑单元格
     */
    isEditCell(args) {
      return args => {
        const { th, tr } = args;
        if (!this.$utils.hasAttr(th, "cellEdit")) {
          return false;
        }
        const { cellEdit, cellEditName } = th;

        return this.$utils.isFunction(cellEdit)
          ? cellEdit({ ...args, value: tr[th.props] })
          : cellEdit;
      };
    },
    /**
     * 根据配置，返回单元格组件名称
     */
    cellEditNameRender(args) {
      return args => {
        const { th, tr } = args;
        const cellEditName = th.cellEditName;

        //  未指定编辑框类型，默认类型为文本
        if (!cellEditName) {
          return "input";
        } else {
          //  生成编辑框类型
          return this.$utils.isFunction(cellEditName)
            ? cellEditName({ ...args, value: tr[th.props] })
            : cellEditName;
        }
      };
    }
  },
  methods: {
    /**
     * @desc 点击行单复选
     * @param {Boolean} isChecked 选中情况
     * @param {Object} tr 行对象
     */
    rowCheckboxClick(isChecked, tr, trIndex) {
      const checkAlready = this.checkedRow(isChecked, tr);

      if(!checkAlready) {
        return false;
      }

      this.$parent.$emit("on-select", tr, isChecked, trIndex);
    },
    /**
     * @desc 点击行
     * @param {Event} e 事件对象
     * @param {Object} tr 行对象
     * @param {Boolean} isChecked 选中情况
     */
    rowClick(e, { tr, isChecked, trIndex }) {
      //  配置了点击行自动选择 且 传递了多选配置
      if (this.clickToSelect && this.hasMultipleConfig) {
        //  反选
        const checkAlready = this.checkedRow(!isChecked, tr);

        if(!checkAlready) {
          return false;
        }
      }
      //  总是发送事件，选择状态为当前行最新选择状态
      this.$parent.$emit("on-row-click", tr, tr.isChecked, trIndex);
    },
    /**
     * @desc 选择行
     * @param { Boolean } isChecked
     * @param { Object } tr
     */
    checkedRow(isChecked, tr) {
      const beforeRowSelectChange = this.beforeRowSelectChange;
      if (this.$utils.isFunction(beforeRowSelectChange) && !beforeRowSelectChange(tr)) {
        return false;
      }

      //  拥有单复选按钮情况，且单选状态下，需要清除其他行的选择
      if (this.hasMultipleConfig && !this.multiple) {
        this.tbodyList.forEach(tr => this.$set(tr, "isChecked", false));
      }
      //  更新选中值
      this.$set(tr, "isChecked", isChecked);
      return true;
    },
    /**
     * @desc 渲染行序号
     * @param { Number } trIndex 行序号
     */
    renderIndex(trIndex) {
      let index = trIndex + 1;
      const { currentPage, currentSize = 15 } = this.$parent.$attrs;
      if (currentPage) {
        index += (currentPage - 1) * currentSize;
      }
      return index;
    },
    /**
     * @desc 鼠标进入行
     */
    rowMouseEnter(e, { tr, trIndex }) {
      this.initAdditionCell(...arguments);
    },
    /**
     * @desc 鼠标离开行
     */
    rowMouseLeave(e, { tr, trIndex }) {
      this.hideAdditionCell();
    },
    /**
     * @desc 单元格点击
     */
    cellClick(args) {
      this.$parent.$emit("on-cell-click", args);
    },
    /**
     * @desc 内部可编辑表单校验
     */
    jrFormValidate(callback = () => {}, options) {
      let formArr = this.$refs.editCellForm;
      let allPass = true;
      if(!formArr) {
        return allPass;
      }

      //  指定校验
      if (options) {
        let {
          //  指定校验行号
          trIndex,
          //  指定校验列号
          thIndex } = options;

        let hasTrIndex = this.$utils.hasAttr(options, "trIndex");
        let hasThIndex = this.$utils.hasAttr(options, "thIndex");

        trIndex = +trIndex;
        thIndex = +thIndex;

        formArr = this.$refs.editCellForm.filter(vm => {
          let { trindex: cellTrIndex, thindex: cellThIndex } = vm.$el.dataset;
          cellTrIndex = +cellTrIndex;
          cellThIndex = +cellThIndex;

          //  判断是否拥有属性，是因为  xxIndex 可能会为数字0，而数字0是一个假值
          if (hasTrIndex && hasThIndex) {
            return (
              cellThIndex === thIndex && cellTrIndex === trIndex
            );
          } else if (hasTrIndex) {
            return cellTrIndex === trIndex;
          } else if (hasThIndex) {
            return cellThIndex === thIndex;
          }
        });
      }

      for (let i = 0; i < formArr.length; i++) {
        const form = formArr[i];
        form.validate(result => {
          if (!result) {
            allPass = false;
          }
        });
      }

      callback(allPass);
    },
    /**
     * @desc 重置表单
     */
    jrFormResetForm() {
      this.$refs.editCellForm.forEach(vm => vm.resetForm());
    },
    /**
     * @desc 移除表单校验项
     */
    jrFormClearValidate() {
      this.$refs.editCellForm.forEach(vm => vm.clearValidate());
    }
  }
};
</script>

<style lang="scss" scope>
.table__body {
  background-color: #fff;

  td {
    vertical-align: middle;
    padding: 0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    font-size: 13px;
    &.is-nowrap {
      white-space: nowrap;
    }

    //  可编辑单元格样式
    &.edit-cell {
      padding: 0px;
      position: relative;
      background-color: #fff;

      //  水平居中时，校验提醒的样式
      &.edit-cell-center /deep/ {
        .form-item {
          .message {
            left: 0px !important;
            right: 0px !important;
            text-align: center;
          }
        }

        input {
          text-align: center;
        }
      }

      //  铺满表单组件
      /deep/ .form-item {
        position: absolute;
        display: inline-block;
        width: 100%;
        min-width: 100px;
        height: 100%;
        left: 0px;
        top: 0px;
        margin-bottom: 0px;

        //  铺满
        .form-item-validate,
        .jr-input {
          height: 100%;
          width: 100%;
        }

        //  校验消息提醒位置
        .message {
          top: 8px !important;
        }
      }

      &.edit-cell-input /deep/ {
        .form-item {
          input {
            height: 100% !important;
            border: 0px !important;
            box-shadow: unset;
          }
        }
      }

      &.edit-cell-input-textarea /deep/ {
        .form-item {
          position: relative;
        }

        .jr-input {
          display: block;
        }

        pre {
          white-space: normal;
          word-break: break-all;
          padding: 5px 11px 37px 11px;
        }

        textarea {
          border: none;
          padding-bottom: 0px;
        }

        .message {
          top: 5px !important;
        }
      }

      &.edit-cell-select /deep/ {
        .form-item {
          .jerri-select {
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;

            .warning {
              top: 10px;
            }

            input {
              border: none;
              box-shadow: unset;
            }
          }
        }
      }

      &.edit-cell-date-picker /deep/ {
        .jr-datePicker {
          display: block;
          height: 100%;

          label.jr-input {
            position: absolute;
            display: inline-block;
            width: 100%;
            min-width: 100px;
            height: 100%;
            left: 0px;
            top: 0px;

            input {
              height: 100%;
              border: none;
              box-shadow: unset;
            }
          }
        }
      }
    }

    //  操作列样式
    &.operate-cell {
      > div {
        display: flex;
        justify-content: center;

        > i {
          font-size: 24px;
          padding: 0px 12px;
        }
      }
    }

    span {
      font-size: inherit;
      display: inline-block;
    }
  }

  tr {
    &.is-hover:hover {
      background-color: $--color-c5;
    }
  }

  //  附加单元格
  .addition-cell {
    padding: 0px;
    position: fixed;
    z-index: 1;
    padding-left: 2px;
    margin-left: -1px;

    &.multiple {
      > div:first-child {
        bottom: 25px;
      }
    }

    > div:last-child {
      bottom: 0px;
    }

    > div {
      width: 22px;
      height: 22px;
      border: none;
      position: absolute;
      border-radius: 0px 3px 3px 0px;
    }

    .j-add-btn {
      vertical-align: middle;
      display: inline-block;
      border: 1px solid $--color-c8;
      text-align: center;
      line-height: 15px;
      font-weight: 600;
      cursor: pointer;

      &::after {
        content: "+";
        font-size: 18px;
      }
    }

    .add-btn {
      background-color: $--color-c8;
      color: white;
      overflow: hidden;
      line-height: 16px;

      &:hover {
        background-color: $--color-c9;
      }
    }

    .del-btn i {
      width: 8px;
    }
  }

  .no-data {
    font-size: 13px;
    color: #999;
  }
}
</style>
