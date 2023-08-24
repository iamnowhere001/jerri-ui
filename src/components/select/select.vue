/****************************************************************************
所属系统: 组件库 所属模块: 下拉选择器 创建时间: 2020-01-02 维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="jerri-select"
       ref="jSelect"
       @click="selected"
       v-clickOut="handleBodyClick">
    <i class="arrow icon-more"
       :class="{ re: isSelect, disabled: disabled }"
       ref="arrow"></i>
    <div class="options"
         ref="options"
         v-show="isSelect">
      <!-- 超过7条数据显示搜索功能 -->
      <div @click.stop
           class="search"
           :class="{ 'drop-up': dropUp }"
           v-if="isSelect && list.length > SEARCH_LIMIT && filterable">
        <label for="search-inp"
               class="icon-search"></label>
        <input id="search-inp"
               type="text"
               :placeholder="$t('select_搜索')"
               autocomplete="off"
               @input="search($event)" />
      </div>

      <!-- 可选列表 -->
      <div class="optionsWrap"
           :class="{
          'drop-up': dropUp,
          'show-search': list.length > SEARCH_LIMIT,
          'auto-pos': dropUp && list.length > SEARCH_LIMIT,
        }"
           ref="menu">
        <ul ref="ul">
          <li @click="selItem('select')"
              v-if="!isRequired && showList.length">
            {{ reSelect }}
          </li>
          <li v-for="(el, i) in showList"
              :key="i"
              :title="el[title]"
              class="jr-options-item j-ellip"
              :class="{'insert-mark': markable && hasMarked, 'disabled': el.disabled }"
              :style="el.bgc ? {backgroundColor: el.bgc, color: '#fff'} : ''"
              @click.stop="selItem(i, el)">
            <i v-if="markable && el.mark"
               :style="typeof el.mark === 'string' && {backgroundColor: el.mark}" />
            <span>{{ el.label }}{{ ext }}</span>
          </li>
          <li class="disabled"
              v-if="!showList.length">
            {{ $t("select_无匹配结果") }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 选择器 -->
    <input :class="{ black: reSelect === $t('select_全部'), disabled: disabled }"
           type="text"
           autocomplete="off"
           readonly
           @focus="handleFocus"
           @blur="handleBlur"
           v-model.trim="showVal"
           :placeholder="reSelect"
           ref="select_input" />
  </div>
</template>

<script>
import emitter from "../../mixins/emitter";
// 多语言转换方法
import { translate } from "../../assets/constants/lang";
export default {
  name: "JrSelect",
  mixins: [emitter],
  model: {
    prop: "val",
    event: "change",
  },
  props: {
    // 默认的选择项
    val: { default: "" },
    // 下拉列表数据
    items: {
      type: Array,
      required: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    // 下拉显示的key值
    valKey: {
      type: String,
      default: "",
    },
    // 下拉每一项value的属性名
    valSelect: {
      type: String,
      default: "",
    },
    // 是否是必填项用于是否可以重置选项
    isRequired: {
      type: Boolean,
      default: false,
    },
    // 重置选项展示的字体
    reSelect: {
      type: String,
      default: translate("common_请选择"),
    },
    // 打开下拉框时候距离底部多少距离向上展示
    distance: {
      type: Number,
      default: 0,
    },
    // 装下拉的容器
    selectBox: {
      // 默认是html
      default: "documentElement",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 下拉的每项对应显示的title key值
    title: {
      type: String,
    },
    // 延迟多少时间显示下拉框;
    loadShowOptions: {
      type: Number,
      default: 0,
    },
    // 选项的拓展字符;
    ext: {
      type: String
    },
    // 默认开启标记
    markable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      SEARCH_LIMIT: 7,
      // 选择框显示的值
      showVal: "",
      // 下拉列表
      list: [],
      showList: [],
      // 是否显示下拉框
      isSelect: false,
      // 选择的索引
      listIndex: null,
      // 向上显示菜单
      dropUp: false,
      // 搜索数组
      searchArr: [],
      // 装组件的容器
      container: "",
      // 首次下拉计算选项最小值
      isOpened: false,
    };
  },
  directives: {
    // 点击下拉组件之外的自定义指令
    clickOut: {
      bind (el, binding) {
        el.handler = (e) => {
          if (el.contains(e.target)) return false;
          // 存在自定义指令函数则执行
          binding.expression && binding.value();
        };
        document.addEventListener("click", el.handler);
      },
      unbind (el) {
        document.removeEventListener("click", el.handler);
      },
    },
  },
  watch: {
    // 监听数组变化
    items: {
      handler (val) {
        // 如果不是对象数组 直接返回自身
        this.showList = this.$utils.deepCopy(val);

        if (this.valKey) {
          this.showList.forEach((element) => {
            element.label = element[this.valKey];
          });
        } else {
          this.showList = this.showList.map((el) => {
            return {
              label: el,
            };
          });
        }
        this.list = this.valKey === "" ? val : val.map((el) => el[this.valKey]);
        // 克隆一份传进来的数组
        this.reArr();
      },
      deep: true,
      // 首次赋值也监听
      immediate: true,
    },
    // 监听展示的值变化
    val: {
      handler (val = "") {
        if (this.valKey) {
          // 选中的项
          let option = this.findItemByVal(this.valSelect, val, this.items);
          if (option) {
            this.showVal = option[this.valKey];
            this.$nextTick(() => {
              option.bgc
                ? this.setInputFace(option.bgc)
                : this.clearInputFace();
            });
          } else {
            this.showVal = val;
          }
        } else {
          this.showVal = val;
        }

        if (this.ext && this.showVal) {
          this.showVal = `${this.showVal}${this.ext}`;
        }
      },
      // 首次赋值也监听
      immediate: true,
    },
    // 监听选择框的打开收起
    isSelect (val) {
      if (!val) return;
      // 打开状态才计算是否向上展示
      this.$nextTick(() => {
        this.dropUp = this.toggleDrop(this.$refs.menu.clientHeight);
      });
    },
    // 监听下拉组件容器
    selectBox: {
      handler (val) {
        // 没传则返回
        if (!val) return;
        this.$nextTick(() => {
          // 查找对应容器
          this.container = document[val] || val;
          // 容器高度
          this.htmlHeight = this.container.clientHeight;
        });
      },
      // 首次赋值也监听
      immediate: true,
    },
  },
  computed: {
    hasMarked () {
      if (Array.isArray(this.showList)) {
        return this.showList.find((item) => item.mark);
      }
    },
  },
  mounted () {
    // 选择框高度
    this.selectHeight = this.$refs.jSelect.clientHeight;
  },
  beforeDestroy () {
    this.$refs.options.remove();
  },
  methods: {
    /**
     * @desc 不是点击自身收起下拉框
     */
    handleBodyClick () {
      this.isSelect = false;
    },
    /**
     * @desc 获取组件到body顶部的距离
     * @param {DOM} el Dom元素
     * @return {Number} offsetTop
     */
    getOffsetTopByBody (el) {
      let offsetTop = 0;
      while (el && el.tagName !== "BODY") {
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      }
      return offsetTop;
    },
    /**
     * @desc toggleDrop 判断下拉框向上还是向下显示
     * @param {Number} menuHeight 菜单高度
     */
    toggleDrop (menuHeight) {
      // 选择框
      let select = this.$refs.jSelect,
        // 选择框到顶部的距离 如果是判断html则获取到body的距离 否则获取容器的
        selectTop =
          this.selectBox === "documentElement"
            ? this.getOffsetTopByBody(select)
            : select.offsetTop,
        // 滚出容器的高度
        scrollHeight = this.container.scrollTop;
      // 计算是否需要向上展示
      return (
        this.htmlHeight -
        (selectTop - scrollHeight + menuHeight + this.selectHeight) <=
        this.distance
      );
    },
    // 打开或关闭下拉框
    async selected () {
      // 延迟多少时间显示下拉框;
      let wait = () => {
        return new Promise((res) => {
          setTimeout(() => {
            res();
          }, this.loadShowOptions);
        });
      };
      await wait();

      this.showOptions(this.$refs.jSelect);
      if (this.disabled) {
        return false;
      }
      // 让输入框聚焦
      this.$refs.select_input.focus();
      this.isSelect = !this.isSelect;
      // 重置下拉选项
      this.showList = this.showListCp;
    },
    showOptions (el) {
      let currentPosition = el.getBoundingClientRect();
      let bd = document.body;
      let options = this.$refs.options;

      // 定位方式
      let res = this.hasFixedParent(this.$refs.jSelect);
      options.style.position = res ? "fixed" : "absolute";

      // 选择器距离视口底部的距离
      // offsetWidth
      this.isOnTop(currentPosition)
        ? this.onTop(options, currentPosition)
        : this.beneath(options, currentPosition);
      // 检查是否有父级元素是否有fixed定位
      //  父级不为绝对定位时，需要为距离左侧的值加上横向滚动距离
      options.style.left = `${Math.ceil(currentPosition.x + (res ? 0 : document.documentElement.scrollLeft))}px`;
      options.style.width = `${Math.ceil(currentPosition.width)}px`;
      bd.appendChild(options);
      if (this.isOpened) {
        return;
      }
      setTimeout(() => {
        let ul = this.$refs.ul;
        let ClientRectOfUl = ul.getBoundingClientRect();
        options.style.minWidth = `${Math.ceil(ClientRectOfUl.width) + 18}px`;
        this.isOpened = true;
        this.$nextTick(() => {
          ul.style.width = "100%";
        });
      });
    },
    // 判断当前选项应该在选择器是上方还是下方
    isOnTop (currentPosition) {
      // 每一个选项的基础高度
      const BASE_HEIGHT = 30;
      // 选项开启搜索过滤的条件
      let baseHeight =
        this.items.length > this.SEARCH_LIMIT
          ? BASE_HEIGHT * this.SEARCH_LIMIT
          : this.items.length * BASE_HEIGHT;
      let placeholderHeight = this.isRequired ? 0 : BASE_HEIGHT;
      let searchHeight =
        this.items.length > this.SEARCH_LIMIT && this.filterable
          ? BASE_HEIGHT
          : 0;
      let sumHeight = baseHeight + placeholderHeight + searchHeight;
      let toBottom = Math.ceil(window.innerHeight - currentPosition.top);
      return toBottom < sumHeight;
    },
    // 在选择器下方展示
    beneath (options, currentPosition) {
      let top =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      options.style.top =
        options.style.position === "absolute"
          ? `${Math.ceil(currentPosition.y) +
          Math.ceil(currentPosition.height) +
          top +
          4}px`
          : `${Math.ceil(currentPosition.y) +
          Math.ceil(currentPosition.height) +
          4}px`;
      options.style.transform = "";
    },
    // 在选择器上方方展示
    onTop (options, currentPosition) {
      let top =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      options.style.top =
        options.style.position === "absolute"
          ? `${Math.ceil(currentPosition.y) + top - 4}px`
          : `${Math.ceil(currentPosition.y) - 4}px`;
      options.style.transform = "translateY(-100%)";
    },
    // 点击选项
    selItem (i, el) {
      // 过滤禁用
      if (el && el.disabled) {
        return false;
      }
      // 确定背景色
      el && el.bgc ? this.setInputFace(el.bgc) : this.clearInputFace();

      // 点击选项传递事件
      this.$emit("selected");
      // 选择还原选项按钮
      if (i === "select") {
        this.showVal = "";
        this.$emit("change", undefined);
        this.dispatch("JrFormItem", "form-change", [undefined]);
        this.clearInputFace();
        return;
      }
      // 隐藏下拉框
      this.isSelect = false;
      this.showVal = this.valKey && this.valSelect ? el[this.valKey] : el.label;
      // 传给父组件当前选择的对象
      let res = this.valKey && this.valSelect ? el[this.valSelect] : el.label;
      this.$emit("change", res, el);
      this.dispatch("JrFormItem", "form-change", [res]);
    },
    // 搜索
    search (e) {
      const val = e.target.value.trim();
      // 没搜索条件数组还原
      if (val === "") {
        this.showList = this.showListCp;
        return;
      }
      // 过滤搜索数组
      this.showList = this.showListCp.filter((el) => {
        let element = String(el.label);
        return element.includes(val);
      });
    },
    // 还原过滤数组
    reArr () {
      this.searchArr = this.$utils.deepCopy(this.list);
      this.showListCp = this.$utils.deepCopy(this.showList);
    },
    // 根据对象数组中的某值找到该项
    findItemByVal (key, val, arr) {
      if (Array.isArray(arr)) {
        return arr.find((item) => {
          return item[key] === val;
        });
      }
    },
    // 是否有fixed定位的父级
    hasFixedParent (el) {
      let parent = el.parentElement;
      while (true) {
        if (!parent) {
          return false;
        }
        if (this.getCssAtrribute(parent, "position") === "fixed") {
          return true;
        }
        parent = parent.parentElement;
      }
    },
    // 获取元素指定css属性
    getCssAtrribute (el, arr) {
      return getComputedStyle(el)[arr];
    },
    // 下拉失焦事件
    handleBlur () {
      this.$emit("on-blur", this.val);
      this.dispatch("JrFormItem", "form-blur", [this.val]);
    },
    // 聚焦
    handleFocus () {
      this.$emit("on-focus", true);
    },
    focus () {
      this.dispatch("JrFormItem", "form-focus", [true]);
      this.$refs.select_input.focus();
      setTimeout(() => {
        this.selected();
      });
    },
    // 设置选择器外衣
    setInputFace (bgc) {
      const input = this.$refs.select_input;
      const arrow = this.$refs.arrow;
      input.style.backgroundColor = bgc;
      arrow.style.color = input.style.color = "#fff";
    },

    // 清除选择器外衣
    clearInputFace (bgc) {
      const input = this.$refs.select_input;
      const arrow = this.$refs.arrow;
      input.style = arrow.style = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./select.scss";
</style>
