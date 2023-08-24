<!--
/****************************************************************************
所属系统: 组件库
所属模块: 查询组件
创建时间: 2019年9月9日 16:44:01
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div class="jr-search-container">
    <div
      class="advanced-query"
      :class="[
        isShow ? 'advanced-show' : 'advanced-hidden',
        {
          'search-advabce': isAdvanced,
          'hide-query': !isShowQuery,
        },
      ]"
    >
      <div
        class="jr-search-bar"
        :class="{ 'search-bar-responsive': isResponsive }"
        ref="searchBar"
      >
        <!-- 循环渲染查询类型组件 -->
        <div
          v-for="(item, index) in searchList"
          :key="index"
          :style="{
            flex: item.minWidth ? '1' : item.flex,
            minWidth: item.minWidth,
            maxWidth: item.maxWidth,
          }"
          :class="{ advabce: isAdvanced }"
        >
          <div
            class="search-item"
            :class="{
              'date-picker': ['datePicker', 'datePickerRange'].includes(
                item.type
              ),
            }"
            :style="{
              marginLeft: item.marginLeft
                ? item.marginLeft
                : item.label
                ? ''
                : '-34px',
              marginRight: item.marginRight ? item.marginRight : '40px',
            }"
          >
            <span>
              <slot :name="`label-${item.bindKey || item.startKey}`">
                <span
                  class="label-text"
                  :style="{ width: item.labelWidth }"
                  :class="{ 'text-align-justify': item.labelJustify }"
                  >{{ item.label | replaceColon }}</span
                >
                <span v-if="item.label">：</span>
              </slot>
            </span>

            <!-- 下拉 -->
            <jr-select
              v-if="item.type === 'select'"
              v-model="item.val"
              v-bind="item.attrConfig"
              v-on="item.eventConfig"
            />

            <!-- 输入框 -->
            <jr-input
              v-else-if="item.type === 'input'"
              v-model.trim="item.val"
              v-bind="item.attrConfig"
              :suffixIcon="item.suffixIcon"
              :prefixIcon="item.prefixIcon"
              v-on="item.eventConfig"
              @keydown.enter.native="handleEnter"
              @icon-click="handleIconClick(arguments, item)"
            />

            <!-- 日期选择器 -->
            <jr-date-picker
              v-else-if="item.type === 'datePicker'"
              v-model="item.val"
              v-bind="item.attrConfig"
              v-on="item.eventConfig"
            />

            <!-- 范围日期选择器 -->
            <template v-else-if="item.type === 'datePickerRange'">
              <jr-date-picker
                v-model="item.val[0]"
                @change="dateChange(arguments, 'start', item)"
                v-bind="item.startAttrConfig"
                v-on="item.startEventConfig"
              ></jr-date-picker>
              <i>至</i>
              <jr-date-picker
                v-model="item.val[1]"
                :btns="
                  (item.endArrtConfig && item.endArrtConfig.btns) || ['clear']
                "
                :min="
                  item.val[0] || (item.endArrtConfig && item.endArrtConfig.min)
                "
                v-bind="item.endArrtConfig"
                v-on="item.endEventConfig"
              ></jr-date-picker>
            </template>

            <!-- 自定义插槽 -->
            <slot
              v-else-if="item.type === 'slot'"
              :name="item.bindKey"
              :item="item"
              :index="index"
            ></slot>

            <!-- jsx渲染 -->
            <template v-else-if="item.type === 'jsx'">
              <JSXDom :render="item['jsxRender']"></JSXDom>
            </template>
          </div>
        </div>

        <!-- 查询按钮 -->
        <div
          class="search-button"
          v-if="isShowQuery && (!isAdvanced || isBtnFollow)"
        >
          <jr-button :disabled="disabled" @click="handleClick">{{
            $t("searchBar_搜索")
          }}</jr-button>
        </div>

        <!-- 可自定义更多按钮 -->
        <slot v-if="!isAdvanced || isBtnFollow"></slot>

        <!-- 高级查询不跨行 -->
        <div
          class="no-inter-bank"
          v-if="!isBtnFollow && isAdvanced && !interBank"
        >
          <jr-button
            v-if="isShowQuery"
            :disabled="disabled"
            @click="handleClick"
            >{{ $t("searchBar_搜索") }}</jr-button
          >
          <jr-button
            class="no-bank-btn"
            type="plain"
            v-if="isReset"
            @click="clear"
            >{{ $t("searchBar_重置") }}</jr-button
          >

          <!-- 可自定义更多按钮 -->
          <slot></slot>
        </div>
      </div>
    </div>

    <!-- 跨行按钮带收起条件 -->
    <div class="btns-condition" v-if="!isBtnFollow && isAdvanced && interBank">
      <div class="btns-export">
        <slot name="export">
          <jr-button type="plain" @click="handleExport"
            ><i class="icon-allot-class" />{{ $t("searchBar_导出") }}</jr-button
          >
        </slot>
      </div>
      <div class="btns-query">
        <div class="fold-bar" @click="foldSearch" v-if="isFold">
          <span>{{
            isShow ? $t("searchBar_收起搜索条件") : $t("searchBar_更多搜索条件")
          }}</span>
          <i class="icon-wes2-more" :class="isShow ? 'reverse' : 'normal'"></i>
        </div>
        <jr-button
          v-if="isShowQuery"
          class="j-ml-10"
          :disabled="disabled"
          @click="handleClick"
          >{{ $t("searchBar_搜索") }}</jr-button
        >
        <jr-button class="j-ml-10" v-if="isReset" type="plain" @click="clear">{{
          $t("searchBar_重置")
        }}</jr-button>

        <!-- 可自定义更多按钮 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JrSearchBar",
  props: {
    // 下拉渲染列表
    searchList: Array,
    // 是否显示多余的搜索条件
    isShowConditions: {
      type: Boolean,
      default: true,
    },
    // 是否隐藏查询按钮
    isShowQuery: {
      type: Boolean,
      default: true,
    },
    // 是否禁用查询按钮
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否开启高级查询
    isAdvanced: {
      type: Boolean,
      default: false,
    },
    // 查询条件是否跨行
    interBank: {
      type: Boolean,
      default: true,
    },
    // 是否开启重置按钮
    isReset: {
      type: Boolean,
      default: true,
    },
    // 是否显示折叠条件
    isFold: {
      type: Boolean,
      default: true,
    },
    // 高级查询按钮是否跟随
    isBtnFollow: Boolean,
    // 是否开启响应式
    isResponsive: Boolean,
  },
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    JSXDom: {
      functional: true,
      props: {
        render: Function,
      },
      /**
       * @param {fn} createElement 创建jsx
       * @param {object} context 上下文作用域
       */
      render: (createElement, context) => {
        return context.props.render(createElement);
      },
    },
  },
  computed: {
    /**
     * @desc 需要记录深度监听的查询数组变化 需要克隆一份数组来监听
     * @return {Array} 需要监听的数组
     * @author 陈宇奇
     * @date 2020年3月10日 15:52:09
     */
    watchList() {
      return this.$utils.deepCopy(this.searchList.filter(({ watch }) => watch));
    },
  },
  filters: {
    // 替换冒号号
    replaceColon(text = "") {
      return text.replace(/：|:/g, "");
    },
  },
  watch: {
    /**
     * @desc 监听是否隐藏更多查询条件
     * @author 陈宇奇
     * @date 2019年9月9日 16:46:14
     */
    isShowConditions: {
      handler(bol) {
        this.isShow = bol;
      },
      immediate: true,
    },
    /**
     * @desc 监听是否开启高级查询
     * @param {Boolean} newVal 父组件传递的值
     * @author 陈宇奇
     * @date 2019年9月9日 16:46:33
     */
    isAdvanced: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            // 开启高级查询 弹性布局可换行
            this.$refs.searchBar.style = "flex-wrap: wrap;";
          });
        }
      },
      immediate: true,
    },
    /**
     * @desc 监听需要监听的数组 记录变化抛出给父组件
     * @param {Array} newList 改变值后的数组
     * @param {Array} oldList 改变值前的数组
     * @author 陈宇奇
     * @date 2019年9月9日 16:46:14
     */
    watchList(newList, oldList) {
      if (newList.length) {
        let curIndex = newList.findIndex(
          (item, i) => item.val !== oldList[i].val
        );
        let newItem = newList[curIndex],
          oldItem = oldList[curIndex];
        if (newItem) {
          newItem.onChange && newItem.onChange(newItem.val, oldItem.val);
          // 通知父组件
          this.$emit(
            "watchItem",
            this.emitPar([newItem]),
            this.emitPar([oldItem])
          );
        }
      }
    },
  },
  methods: {
    /**
     * @desc 收起搜索条件
     * @author 陈宇奇
     * @date 2020年4月24日 17:57:24
     */
    foldSearch() {
      this.isShow = !this.isShow;
    },
    /**
     * @desc 点击导出文件通知父组件
     * @author 陈宇奇
     * @date 2019年9月9日 16:47:28
     */
    handleExport() {
      this.$emit("exportFile", this.emitPar());
    },
    /**
     * @desc 抛出参数
     * @param {Array} searchList 需要合并参数的查询列表
     * @return {Object} 抛出给父组件的对象
     * @author 陈宇奇
     * @date 2019年11月7日 18:17:17
     */
    emitPar(searchList = this.searchList) {
      let result = {};
      searchList.forEach((item) => {
        if (item.type === "datePickerRange") {
          result[item.startKey] = item.val[0] || "";
          result[item.endKey] = item.val[1] || "";
        } else {
          result[item.bindKey] = item.val;
        }
      });
      return result;
    },
    /**
     * @desc 点击重置通知父组件
     * @author 陈宇奇
     * @date 2019年9月9日 16:47:28
     */
    clear() {
      this.$emit("reset");
    },
    /**
     * @desc 如果只有一个输入框的时候 查询条件回车有生效
     * @author 陈宇奇
     * @date 2019年9月9日 16:47:28
     */
    handleEnter() {
      // 一个输入框按回车查询
      if (this.searchList.length === 1 && this.searchList[0].type === "input") {
        this.handleClick();
      }
    },
    /**
     * @desc 点击查询把查询结果抛出给父组件
     * @author 陈宇奇
     * @date 2019年9月9日 16:47:28
     */
    handleClick() {
      if (!this.disabled) {
        this.$emit("click", this.emitPar());
      }
    },
    /**
     * @desc 修改日历范围开始时间
     * @param {Array} args 日历范围组件会抛出的参数
     * @param {String} key 需要赋值的键值
     * @param {Object} item 日历范围项对象
     * @author 陈宇奇
     * @date 2020年1月13日 16:11:13
     */
    dateChange(args, key, item) {
      if (item.val[1] && this.judgeDate(args[0], item.val[1])) {
        this.$set(item.val, "1", "");
      }
    },
    /**
     * @desc 判断开始日期是否大于结束日期
     * @param {String} start 开始时间
     * @param {String} end 结束时间
     * @return {Boolean} 是否大于
     * @author 陈宇奇
     * @date 2020年1月13日 16:12:36
     */
    judgeDate(start, end) {
      return new Date(start).getTime() > new Date(end).getTime();
    },
    /**
     * @desc 接收input抛出icon点击事件
     * @author 赖泽城
     * @param {array-like} payload input组件中抛出的数据
     * @param {object} item
     * @date 2020年08月24日 16:59
     */
    handleIconClick(payload, item) {
      const [value, element] = payload;
      this.$emit("iconClick", item, element);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./searchBar.scss";
</style>
