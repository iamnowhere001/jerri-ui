<!--
/****************************************************************************
所属系统: 组件库
所属模块: 侧栏菜单组件
创建时间: 2020年09月07日 17:09:25

***************************************************************************/
-->
<template>
  <div class="jr-menu">
    <jr-button class="jr-menu-add" @click="addItem">{{ addText }}</jr-button>

    <strong class="jr-menu-title">{{ title }}</strong>

    <jr-input
      class="jr-menu-input"
      v-model="keyword"
      :placeholder="placeholder"
    ></jr-input>

    <!-- 渲染列表 -->
    <div
      class="jr-menu-list"
      v-for="renderItem in renderList"
      :key="renderItem.key"
    >
      <!-- 列表标题 -->
      <div class="jr-menu-list-title" @click="changeListStatus(renderItem)">
        <i class="icon-sort-up" :class="{ rotate: renderItem.hide }"></i>
        <span>{{ renderItem.title }}</span
        ><span class="count"
          >({{ statusList(`${renderItem.key}Status`).length }})</span
        >
      </div>
      <!-- 列表标题 -->

      <ul v-show="!renderItem.hide">
        <li
          v-for="(item, index) in statusList(`${renderItem.key}Status`)"
          :key="index"
          @click="handlerClick(renderItem.key, item, index)"
        >
          <slot
            :name="`${renderItem.key}-name`"
            v-bind="scopedSlot(item, index)"
            >{{ item[valKey] }}</slot
          >

          <!-- icon插槽 -->
          <div class="jr-menu-list-icons">
            <slot
              :name="`${renderItem.key}-icons`"
              v-bind="scopedSlot(item, index)"
            >
              <!-- 需要显示默认icon才显示 -->
              <template v-if="renderItem.showIcon">
                <i
                  class="j-icon icon-edit"
                  @click="handlerIconClick('edit', item, index)"
                ></i>
                <i
                  class="j-icon icon-del"
                  @click="handlerIconClick('del', item, index)"
                ></i>
              </template>
              <!-- 需要显示默认icon才显示 -->
            </slot>
          </div>
          <!-- icon插槽 -->
        </li>
      </ul>
    </div>
    <!-- 渲染列表 -->
  </div>
</template>
<script>
export default {
  name: "JrMenu",
  components: {},
  mixins: [],
  props: {
    // 新增按钮文本
    addText: {
      type: String,
      default: "新增上传"
    },
    // 菜单标题
    title: String,
    // 搜索框占位
    placeholder: String,
    // 显示的名称对应key值
    valKey: String,
    // 状态对应key值
    statusKey: String,
    // 草稿状态
    draftStatus: [Number, String],
    // 提交状态
    commitStatus: [Number, String],
    // 渲染列表
    list: Array
  },
  data() {
    return {
      // 搜索关键字
      keyword: "",
      // 渲染列表
      renderList: [
        // 草稿列表
        {
          hide: false,
          key: "draft",
          title: "草稿",
          showIcon: true
        },
        // 已提交列表
        {
          hide: false,
          key: "commit",
          title: "已提交"
        }
      ]
    };
  },
  created() {},
  computed: {
    // 过滤的数据列表
    filterList() {
      return this.list.filter(item => item[this.valKey].includes(this.keyword));
    },
    statusList() {
      return status => {
        return this.filterList.filter(
          item => item[this.statusKey] === this[status]
        );
      };
    }
  },
  methods: {
    /**
     * @desc 修改列表状态
     * @param {Object} item 当前渲染项
     * @author 陈宇奇
     * @date 2020年09月08日 09:43:05
     */
    changeListStatus(item) {
      item.hide = !item.hide;
    },
    /**
     * @desc 作用域插槽参数
     * @param {Object} item 当前项
     * @param {Number} index 当前索引
     * @author 陈宇奇
     * @date 2020年09月08日 10:10:19
     */
    scopedSlot(item, index) {
      return { item, index };
    },
    /**
     * @desc 点击新增按钮
     * @author 陈宇奇
     * @date 2020年09月08日 10:49:49
     */
    addItem() {
      this.$emit(`add-click`);
    },
    /**
     * @desc 点击对应列表项
     * @param {String} key 渲染项的key
     * @param {Object} item 当前项
     * @param {Number} index 当前索引
     * @author 陈宇奇
     * @date 2020年09月08日 10:39:06
     */
    handlerClick(key, item, index) {
      // 已提交点击列表项才通知父组件
      key === "commit" && this.$emit(`${key}-click`, item, index);
    },
    /**
     * @desc 点击对应icon
     * @param {String} type icon的类型
     * @param {Object} item 当前项
     * @param {Number} index 当前索引
     * @author 陈宇奇
     * @date 2020年09月08日 10:35:48
     */
    handlerIconClick(type, item, index) {
      // 通知父组件
      this.$emit(`${type}-click`, item, index);
    }
  }
};
</script>
<style scoped lang="scss">
@import "./menu.scss";
</style>
