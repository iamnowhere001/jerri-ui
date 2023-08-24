<template>
  <div>
    <h1 style="font-size: 40px;">通讯录操场</h1>
    <div>
      <jr-contacts-list
        :isShowPop="isShowPop"
        :list="list"
        :multiple="multiple"
        :required="true"
        :preSelectedList="preSelectedList"
        :orgLimitLevel="orgLimitLevel"
        @on-confirm="confirm"
        @on-cancal="cancal"
        :titleName="titleName"
        :type="type"
      >
        <template slot="main-bottom">
          <p>此处是通讯录底部插槽，你可以DIV这里的内容</p>
        </template>
      </jr-contacts-list>
      <p>
        <jr-button @click.native="toggleContactsList">打开通讯录</jr-button>
      </p>
      <hr />
      <p>当前为{{ multiple ? "多" : "单" }}选</p>
      <p>
        <jr-button @click.native="multiple = !multiple">切换单选多选</jr-button>
      </p>
      <hr />
      <p>当前选择类型 {{ typeKeyMap[type] }}</p>
      <p>
        <jr-button @click.native="type = 'user'">切换为人员选择</jr-button>
        <jr-button @click.native="type = 'org'">切换为部门选择</jr-button>
        <jr-button @click.native="type = 'userOrg'"
          >切换为人员部门选择</jr-button
        >
        <jr-button @click.native="type = 'position'">切换为岗位选择</jr-button>
      </p>
      <hr />
      <p>选择限制 {{ orgLimitText ? orgLimitText : "无限制" }}</p>
      <p>
        <jr-button @click.native="orgLimitLevel = []">不限制</jr-button>
        <jr-button @click.native="orgLimitLevel = [1]">限制公司选择</jr-button>
        <jr-button @click.native="orgLimitLevel = [2]"
          >限制一级部门选择</jr-button
        >
        <jr-button @click.native="orgLimitLevel = [3]"
          >限制二级部门选择</jr-button
        >
        <jr-button @click.native="orgLimitLevel = [1, 2, 3]"
          >限制全部部门选择</jr-button
        >
      </p>
      <hr />
      <p>
        <jr-button @click.native="preSelectedText = 'Y0001'"
          >预选择摩希</jr-button
        >
        <jr-button
          @click.native="preSelectedText = '0000000000importbyymm00000000001'"
          >预选择杨梅红公司</jr-button
        >
        <jr-button
          @click.native="preSelectedText = '1000000000importbyymm00000000008'"
          >预选择杨梅红下的IT中心</jr-button
        >
        <jr-button
          @click.native="preSelectedText = 'f13a6386ceab481a80ef6fe514d2a160'"
          >预选择总裁</jr-button
        >
        <jr-button
          @click.native="
            preSelectedText =
              '00000importbyjierenstation000017,00000importbyjierenstation000019'
          "
          >预选择前端和后端</jr-button
        >
        <jr-button
          @click.native="
            preSelectedText =
              '00000importbyjierenstation000017,00000importbyjierenstation000019,f13a6386ceab481a80ef6fe514d2a160'
          "
          >预选择前端和后端和总裁</jr-button
        >
      </p>
      <hr />
      <p>
        <jr-button
          @click.native="
            () => {
              list = [];
            }
          "
          >设置数据源为空数组</jr-button
        >

        <jr-button @click.native="reList">设置数据源正常数据</jr-button>
      </p>

      <p>
        <label for="">通讯录标题：</label>
        <jr-input v-model="titleName" />
      </p>
      <p>
        <label for="">通讯录预选择人员：</label>
        <jr-input v-model="preSelectedText" />
      </p>
    </div>
  </div>
</template>

<script>
import listData from "./contactsList.json";
window.listData = listData;

export default {
  name: "contactsListView",
  label: "通讯录",
  data() {
    return {
      isShowPop: false,
      list: listData,
      multiple: true,
      type: "userOrg",
      typeKeyMap: {
        user: "人员",
        org: "部门",
        userOrg: "人员部门",
        position: "岗位",
      },
      orgLimitLevel: [],
      titleName: "通讯录的标题啊啊啊啊啊啊啊啊啊",
      preSelectedText: "0000000000importbyymm00000000001",
    };
  },
  computed: {
    preSelectedList() {
      return this.preSelectedText.split(",");
    },
    orgLimitText() {
      return this.orgLimitLevel.map((item) => `${item}级部门`).join(",");
    },
  },
  methods: {
    confirm(data) {
      console.info(data);
      this.closeContactsList();
    },
    cancal() {
      this.closeContactsList();
    },
    closeContactsList() {
      this.isShowPop = false;
    },
    toggleContactsList() {
      this.isShowPop = !this.isShowPop;
    },
    reList() {
      this.list = window.listData;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.select-wrap {
  width: 180px;
}

p {
  margin: 10px 0px;
}

hr {
  margin: 10px 0px;
}

/deep/ .jr-button-wrap {
  margin: 0px 5px;
}
</style>
