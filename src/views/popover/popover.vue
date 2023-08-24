/****************************************************************************
所属系统: 组件库 所属模块: 操场 - 按钮组件 创建时间: 2020年3月10日10:50:28
维护人: 陈泽光 *┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　 　　　　　　　　　　 │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/

<template>
  <div class="box">
    <!-- 气泡 -->
    <jr-popover>
      <!-- 触发元素 -->
      <jr-button>hover触发</jr-button>

      <!-- 气泡内容 -->
      <div slot="content">
        我是气泡内容
      </div>
    </jr-popover>

    <jr-popover class="j-ml-50"
                trigger="click">
      <!-- 触发元素 -->
      <jr-button>click触发</jr-button>

      <!-- 气泡内容 -->
      <div slot="content">
        我是气泡内容
      </div>
    </jr-popover>

    <jr-popover class="j-ml-50"
                :always="true">
      <!-- 触发元素 -->
      <jr-button>一直显示气泡提示</jr-button>

      <!-- 气泡内容 -->
      <div slot="content">
        我是气泡内容
      </div>
    </jr-popover>

    <jr-popover class="j-ml-50"
                :showArrow="false">
      <!-- 触发元素 -->
      <jr-button>不显示箭头</jr-button>

      <!-- 气泡内容 -->
      <div slot="content">
        我是气泡内容
      </div>
    </jr-popover>

    <jr-popover class="j-ml-50"
                :disabled="true">
      <!-- 触发元素 -->
      <jr-button>禁止触发气泡</jr-button>

      <!-- 气泡内容 -->
      <div slot="content">
        我是气泡内容
      </div>
    </jr-popover>

    <div class="j-mt-100">
      <jr-popover :always="true"
                  placement="bottom">
        <!-- 触发元素 -->
        <jr-button>向下显示</jr-button>

        <!-- 气泡内容 -->
        <div slot="content">
          我是气泡内容
        </div>
      </jr-popover>

      <jr-popover class="j-ml-50"
                  :always="true"
                  placement="right">
        <!-- 触发元素 -->
        <jr-button>向右显示</jr-button>

        <!-- 气泡内容 -->
        <div slot="content">
          我是气泡内容
        </div>
      </jr-popover>
    </div>

    <div class="j-mt-100 j-ml-100">
      <jr-popover :always="true"
                  placement="left">
        <!-- 触发元素 -->
        <jr-button>向左显示</jr-button>

        <!-- 气泡内容 -->
        <div slot="content">
          我是气泡内容
        </div>
      </jr-popover>

      <jr-popover :always="true"
                  class="j-ml-100"
                  placement="bottom">
        <!-- 触发元素 -->
        <jr-button>多内容时</jr-button>

        <!-- 气泡内容 -->
        <div slot="content">
          我是气泡内容我是气泡内容我是气泡内容我是气泡内容我是气泡内容我是气泡内容我是气泡内容
          我是气泡内容我是气泡内容我是气泡内容我是气泡内容我是气泡内容我是气泡内容我是气泡内容
        </div>
      </jr-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "popover",
  label: "气泡",
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "popover.scss";
</style>
