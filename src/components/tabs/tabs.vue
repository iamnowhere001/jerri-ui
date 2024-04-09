
/****************************************************************************

所属系统: 组件库
所属模块: tabs页签
创建时间: 2020-01-02


***************************************************************************/
<template>
  <div class="j-tabs">
    <!-- 线形 tabs栏 -->
    <nav-tab v-if="type === 'line'"
             :list="list"
             :value="value"
             @change="sendVal"
             :berforLeave="berforLeave">
      <template slot-scope="{ item }"
                v-if="item.badge">
        <jr-badge :is-dot="item.badge.isDot"
                  :value="item.badge.value"
                  :max="item.badge.max"
                  :type="item.badge.type"
                  :animation="item.badge.animation">
          <span> {{item.label}} </span>
        </jr-badge>
      </template>
    </nav-tab>

    <!-- 卡片形 tabs栏 -->
    <table-tab v-else-if="type === 'card'"
               :list="list"
               :value="value"
               @change="sendVal"
               :berforLeave="berforLeave">
      <template slot-scope="{ item }"
                v-if="item.badge">
        <jr-badge :is-dot="item.badge.isDot"
                  :value="item.badge.value"
                  :max="item.badge.max"
                  :type="item.badge.type"
                  :animation="item.badge.animation">
          <span> {{item.label}} </span>
        </jr-badge>
      </template></table-tab>

    <!-- 椭圆开关形式 tabs栏 -->
    <ellipse-tab v-else-if="type === 'ellipse'"
                 :list="list"
                 :value="value"
                 @change="sendVal"
                 :berforLeave="berforLeave">
      <template slot-scope="{ item }"
                v-if="item.badge">
        <jr-badge :is-dot="item.badge.isDot"
                  :value="item.badge.value"
                  :max="item.badge.max"
                  :type="item.badge.type"
                  :animation="item.badge.animation">
          <span> {{item.label}} </span>
        </jr-badge>
      </template>
    </ellipse-tab>
  </div>
</template>

<script>
import navTab from "./src/navTab";
import tableTab from "./src/tableTab";
import ellipseTab from "./src/ellipseTab";

export default {
  name: "JrTabs",
  components: { navTab, tableTab, ellipseTab },
  model: {
    props: "value",
    event: "change"
  },
  props: {
    // 每项对应的值
    value: [String, Number],
    // tabs栏的类型
    type: {
      type: String,
      default: "line",
      validator: value => {
        let res = ["line", "card", "ellipse"].indexOf(value) !== -1;
        !res &&
          console.error(
            new RangeError(
              "the optional value of type is line or card or ellipse"
            )
          );
        return res;
      }
    },
    // 接收的数组
    list: {
      type: Array,
      default: () => {}
    },
    // 切换之前的钩子，返回值为false阻止继续执行
    berforLeave: {
      type: Function
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    /**
     * @desc 切换tabs栏时触发的事件
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    sendVal(res) {
      this.$emit("change", res);
    }
  }
};
</script>

<style scoped lang="scss">
.j-tabs {
  /deep/.badge {
    transform: translate(100%, -50%);
  }
}
</style>
