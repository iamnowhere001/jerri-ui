<!--
/****************************************************************************
所属系统: 组件库
所属模块: 组件 - 树结构通栏
***************************************************************************/
-->

<template>
  <div class="j-pt-50 j-pl-30 j-pb-50 ">
    <h2 class="j-mb-50">树结构通栏组件</h2>

    <!-- 直接复制这块结构去操作吧 -->
    <div class="j-center">
      <jr-tree-item-box
        :typeList="typeList"
        radiusDirection="left"
        :showLoading.sync="showLoading"
        @scroll-end="scrollEnd"
      >
        <template #item="{item}">
          <div
            class="tree-item j-pointer"
            :class="{ active: item.index === activeIndex }"
            @click="activeIndex = item.index"
          >
            <jr-input v-model.trim="item.index + 1" />
            <div class="item-name j-ellip" v-title>
              <span>
                {{ item.el.name }}
              </span>
            </div>
            <div class="icons">
              <jr-switch v-model="toggle" />
              <i class="j-icon icon-edit" title="编辑"></i>
              <i class="j-icon icon-permissions2" title="授权"></i>
              <i
                class="j-icon icon-del"
                :class="{ 'j-disabled': true }"
                title="删除"
              ></i>
            </div>
          </div>
        </template>
        <template #btns>
          <div class="tree-btns">
            <jr-button type="plain">上传课件</jr-button>
            <jr-button type="plain">批量上传</jr-button>
          </div>
        </template>
      </jr-tree-item-box>

      <jr-tree-item-box :typeList="typeList1" radiusDirection="none">
        <template #btns>
          <div class="tree-btns">
            <jr-button type="plain">上传课件</jr-button>
            <jr-button type="plain">批量上传</jr-button>
          </div>
        </template>
      </jr-tree-item-box>

      <jr-tree-item-box :typeList="typeList1" radiusDirection="right">
      </jr-tree-item-box>
    </div>
  </div>
</template>

<script>
export default {
  name: "treeItemBoxView",
  label: "通栏",
  data() {
    return {
      pullup: true,
      pageIndex: 1,
      typeList: [
        {
          name:
            "市场市场市场市场市场市场市场市场市场市场市场市场市场",
          id: 1,
        },
        { name: "招生", id: 2 },
        { name: "教学", id: 3 },
        { name: "市场", id: 1 },
        { name: "招生", id: 2 },
        { name: "教学", id: 3 },
        { name: "市场", id: 1 },
        { name: "招生", id: 2 },
        { name: "教学", id: 3 },
        { name: "市场", id: 1 },
        { name: "招生", id: 2 },
        { name: "教学", id: 3 },
        { name: "市场", id: 1 },
        { name: "招生", id: 2 },
        { name: "教学", id: 3 },
      ],
      activeIndex: 0,
      toggle: true,
      typeList1: [],
      showLoading: false,
    };
  },
  methods: {
    changeSort(sort, item) {
      console.log(sort, item);
    },
    scrollEnd() {
      // 加载到没数据就禁止上拉加载了
      if (this.pageIndex > 5) {
        // 禁止加载
        this.pullup = false;
      }
      this.pageIndex++;
      setTimeout(() => {
        this.typeList = this.typeList.concat(this.typeList.slice(0, 10));
        this.showLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-item {
  display: flex;
  &:hover,
  &.active {
    margin-right: 1px;
  }
  &:hover {
    .item-name {
      background-color: #f7f9fb;
    }
    .icons {
      display: flex;
    }
  }
  &.active {
    .item-name {
      font-weight: 600;
      color: #067f42;
      background-color: #eff3f7;
    }
    .icons {
      background-color: #eff3f7;
    }
  }

  .item-name {
    flex: 1;
    padding-left: 5px;
  }
  /deep/ .jr-input {
    width: 30px;
    min-width: auto;
    margin: 0 10px;
    height: 42px;

    input {
      height: 42px;
      border: 0;
      padding: 0;
      outline: 0;
      color: #067f42;
      text-align: center;

      &:focus:not([readonly]) {
        box-shadow: inset 0 -1px 0 #abc0ba;
      }

      &[readonly] {
        color: #000;
      }
    }
  }

  .icons {
    padding-right: 10px;
    width: 134px;
    align-items: center;
    display: none;
    justify-content: space-between;
    background-color: #f7f9fb;
    > i {
      font-size: 22px;
    }
    /deep/ .switch-wrap {
      width: 34px;
      .switch {
        vertical-align: middle;
        width: 100% !important;
        &.active-bgc {
          &::after {
            left: calc(100% - 15px);
          }
        }
        &::after {
          width: 16px;
          height: 16px;
          top: -1px;
        }
      }
    }
  }
}
</style>
