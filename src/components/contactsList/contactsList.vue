/****************************************************************************

所属系统: 组件库
所属模块: 通讯录
创建时间: 2020-01-02

***************************************************************************/
<template>
  <jr-message-box :value="isShowPop"
                  :title="renderTitle"
                  :isDefine="true"
                  maxHeight="auto"
                  @onClose="cancel">
    <!-- 主体内容区域 -->
    <main class="main-box flex-box">

      <!-- 左侧选择区域 -->
      <div class="ps-left">
        <!-- 左侧顶部搜索栏 -->
        <div class="filter-box flex-box">

          <!-- 切换搜索类型的下拉 -->
          <template v-if="isType('userOrg')">
            <div class="search-type">
              <p @click="openSearchType">
                <span>{{searchTypeKeyMap[searchType]}}</span>
                <ul v-show="searchTypeShow"
                    v-clickoutside="closeSearchType">
                  <li @click="toggleSearchType(1)">人名/岗位</li>
                  <li @click="toggleSearchType(2)">公司/部门</li>
                </ul>
              </p>
              <i class="icon-triangle"
                 :class="{open: searchTypeShow}"
                 @click="openSearchType"></i>
            </div>
          </template>
          <!-- 切换搜索类型的下拉 -->

          <!-- 搜索输入框 -->
          <input type="text"
                 v-model.trim="keyWords"
                 :placeholder="placeholderText"
                 @input="searchList">
          <!-- 搜索输入框 -->
        </div>
        <!-- 左侧顶部搜索栏 -->

        <!-- 左侧主体区域 -->
        <div class="main-list">

          <!-- 不存在搜索关键字，展示的选择区域 -->
          <template v-if="!keyWords.length">

            <!-- 人名/岗位类型时的选择区域 -->
            <template v-if="searchType === 1">
              <div class="user-choose-area flex-box">
                <div class="none flex-box"
                     v-show="!dataList.length">无相关通讯录权限</div>

                <!-- 公司选择列表 -->
                <div class="department"
                     v-show="dataList.length">
                  <ul>
                    <li v-for="(company, index) in dataList"
                        :key="index">
                      <dl>
                        <dt @click="toggleShowDetail(company)"
                            :title="company.name">{{ company.name }} <i :class="{ folder: !company.detail }"
                             class="icon icon-sort-up"
                             v-show="company.childList.length"></i></dt>
                        <dd v-show="company.detail"
                            :title="it.name"
                            v-for="(it, idx) in company.childList"
                            :key="idx"
                            :class="{ active: currentDepartMent.id === it.id }"
                            @click="changeDepartment(it)">{{ it.name }}</dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                <!-- 公司选择列表 -->
                <!-- 部门下人员选择列表 -->
                <div class="group">
                  <ul>
                    <li v-for="(department, index) in currentDepartMent.childList"
                        :key="index">
                      <dl>
                        <dt><i class="point"></i>{{ department.name }}</dt>
                        <dd v-for="(user, idx) in department.userList"
                            @click="toggleCheckUser(user, true)"
                            :class="{active: user.selected && !showSelectedList}"
                            :key="idx">
                          <label :title="user.selected ? '已选择此项' : user.userName + ' ' + user.positionName"
                                 class="people">
                            <span class="name">{{ user.userName }}</span>
                            <span>{{ user.positionName }}</span>
                            <template v-if="user.selected && !showSelectedList">
                              <i class="icon"
                                 :class="{'icon-right-warning': user.selected}"></i>
                            </template>
                            <template v-else>
                              <i class="icon icon-wrong-warning"></i>
                            </template>
                          </label>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                <!-- 部门下人员选择列表 -->
              </div>
            </template>
            <!-- 人名/岗位类型时的选择区域 -->

            <!-- 公司/部门类型时的选择区域 -->
            <template v-if="searchType === 2">
              <div class="org-choose-area flex-box">
                <div class="none flex-box"
                     v-show="!dataList.length">无相关通讯录权限</div>

                <!-- 公司选择列表 -->
                <div class="department"
                     v-show="dataList.length">
                  <ul>
                    <li v-for="(company, index) in dataList"
                        :key="index">
                      <dl>
                        <!-- 公司 -->
                        <dt :title="company.name">
                          <i :class="{ folder: !company.detail }"
                             @click.stop="toggleShowDetail(company)"
                             class="icon icon-sort-up"
                             v-show="company.childList.length"></i>
                          <p @click.stop="() => {
                                !orgLimitLevel.includes(1) && toggleCheckOrg(company, true);
                               }">{{ company.name }}</p>
                          <i class="icon icon-wrong-warning"></i>
                        </dt>
                        <!-- 公司 -->
                        <!-- 部门 -->
                        <div v-show="company.detail"
                             :title="department.name"
                             v-for="(department, idx) in company.childList"
                             :key="idx"
                             :class="{ active: currentDepartMent.id === department.id }">
                          <dd @click.stop="() => {
                                !orgLimitLevel.includes(2) && toggleCheckOrg(department, true);
                               }">
                            <p>
                              {{ department.name }}
                              <i :class="{ folder: !department.detail }"
                                 class="icon icon-sort-up"
                                 @click.stop="toggleShowDetail(department)"
                                 v-show="department.childList.length"></i>
                              <i class="icon icon-wrong-warning"></i>
                            </p>
                          </dd>
                          <!-- 小组 -->
                          <ul class="team"
                              v-show="department.detail">
                            <li v-for="(team, index) in department.childList"
                                :key="index">
                              <dl>
                                <dd :title="team.name"
                                    @click.stop="() => {
                                        !orgLimitLevel.includes(3) && toggleCheckOrg(team, true);
                                      }"
                                    :key="idx">{{ team.name }}
                                  <i class="icon icon-wrong-warning"></i></dd>
                              </dl>
                            </li>
                          </ul>
                          <!-- 小组 -->
                        </div>
                        <!-- 部门 -->
                      </dl>
                    </li>
                  </ul>
                </div>
                <!-- 公司选择列表 -->
              </div>
            </template>
            <!-- 公司/部门类型时的选择区域 -->

            <!-- 仅岗位类型时的选择区域 -->
            <template v-if="searchType === 3">
              <div class="position-choose-area flex-box">
                <div class="none flex-box"
                     v-show="!dataList.length">无相关通讯录权限</div>

                <!-- 公司选择列表 -->
                <div class="department"
                     v-show="dataList.length">
                  <ul>
                    <li v-for="(company, index) in dataList"
                        :key="index">
                      <dl>
                        <dt @click="toggleShowDetail(company)"
                            :title="company.name">{{ company.name }} <i :class="{ folder: !company.detail }"
                             class="icon icon-sort-up"
                             v-show="company.childList.length"></i></dt>
                        <dd v-show="company.detail"
                            :title="it.name"
                            v-for="(it, idx) in company.childList"
                            :key="idx"
                            :class="{ active: currentDepartMent.id === it.id }"
                            @click="changeDepartment(it)">{{ it.name }}</dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                <!-- 公司选择列表 -->

                <!-- 二级部门相同岗位级联选择 -->
                <div class="cascade-group" v-if="chooseSamePosition">
                  <ul>
                    <li v-for="(department, index) in currentDepartMent.childList"
                        :key="index">
                      <dl>
                        <dt><i class="point"></i>{{ department.name }}</dt>
                        <dd v-for="(user, idx) in department.positionList"
                            @click="toggleCheckPosition(user, true)"
                            :class="{active: user.selected && !showSelectedList}"
                            :key="idx">
                          <label :title="user.selected ? '已选择此项' : user.userName + ' ' + user.positionName"
                                 class="people">
                            <span class="name">{{ user.positionName }}</span>
                            <template v-if="user.selected && !showSelectedList">
                              <i class="icon"
                                 :class="{'icon-right-warning': user.selected}"></i>
                            </template>
                            <template v-else>
                              <i class="icon icon-wrong-warning"></i>
                            </template>
                          </label>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                <!-- 二级部门相同岗位级联选择 -->

                <!-- 部门下人员选择列表 -->
                <div class="group" v-else>
                  <ul>
                    <li v-for="(user, index) in positionList[currentDepartMent.id]"
                        :key="index">
                      <dl>
                        <dt @click="toggleCheckPosition(user, true)"
                            :title="user.selected ? '已选择此项' : user.positionName">{{ user.positionName }}
                          <i class="icon icon-wrong-warning"
                             title="添加"></i>
                        </dt>
                      </dl>
                    </li>
                  </ul>
                </div>
                <!-- 部门下人员选择列表 -->

              </div>
            </template>
            <!-- 仅岗位类型时的选择区域 -->

          </template>
          <!-- 不存在搜索关键字，展示的选择区域 -->

          <!-- 存在搜索关键字时 -->
          <template v-else>
            <!-- 人名/岗位类型时的搜索列表 -->
            <template v-if="searchType === 1">

              <div class="user-search-choose">
                <div class="none"
                     v-show="!userListPro.length"></div>
                <!-- 搜索人员结果显示 -->
                <ul>
                  <li v-for="(user, index) in userListPro"
                      @click="toggleCheckUser(user, !user.selected)"
                      :key="index"
                      :title="user.userName + ' ' + user.positionName + ' ' + user.departmentInfo">
                    <b>{{ user.userName }}</b>
                    <span>{{ user.positionName }}</span>
                    <label>{{ user.departmentInfo }}</label>
                    <template v-if="user.selected">
                      <i class="icon"
                         :class="{'icon-right-warning': user.selected}"></i>
                    </template>
                    <template v-else>
                      <i class="icon icon-wrong-warning"
                         title="添加"></i>
                    </template>
                  </li>
                </ul>
              </div>
            </template>
            <!-- 人名/岗位类型时的搜索列表 -->

            <!-- 公司/部门类型时的搜索列表 -->
            <template v-if="searchType === 2">
              <div class="org-search-choose">
                <div class="none"
                     v-show="!orgListPro.length"></div>
                <!-- 搜索人员结果显示 -->
                <ul>
                  <li v-for="(org, index) in orgListPro"
                      @click="toggleCheckOrg(org, !org.selected)"
                      :key="index"
                      :title="org.name">
                    <b>{{ org.name }}</b>
                    <span>{{ org.companyName ? `${org.companyName}` : ""}}{{ org.departmentName ? `/${org.departmentName}` : ""}}{{ org.teamName ? `/${org.teamName}` : ""}}</span>
                    <template v-if="org.selected">
                      <i class="icon"
                         :class="{'icon-right-warning': org.selected}"></i>
                    </template>
                    <template v-else>
                      <i class="icon icon-wrong-warning"
                         title="添加"></i>
                    </template>
                  </li>
                </ul>
              </div>
            </template>
            <!-- 公司/部门类型时的搜索列表 -->

            <!-- 仅岗位类型时的搜索列表 -->
            <template v-if="searchType === 3">

              <div class="position-search-choose">
                <div class="none"
                     v-show="!positionListPro.length"></div>
                <!-- 搜索人员结果显示 -->
                <ul>
                  <li v-for="(user, index) in positionListPro"
                      @click="toggleCheckPosition(user, !user.selected)"
                      :key="index"
                      :title="user.positionName">
                    <span>{{ user.positionName }}</span>
                    <label>{{ user.companyName }}</label>
                    <template v-if="user.selected">
                      <i class="icon"
                         :class="{'icon-right-warning': user.selected}"></i>
                    </template>
                    <template v-else>
                      <i class="icon icon-wrong-warning"
                         title="添加"></i>
                    </template>
                  </li>
                </ul>
              </div>
            </template>
            <!-- 仅岗位类型时的搜索列表 -->

          </template>
          <!-- 存在搜索关键字时 -->
        </div>
        <!-- 左侧主体区域 -->

      </div>
      <!-- 左侧选择区域 -->

      <!-- 右侧已选区域 -->
      <div class="ps-right"
           v-if="showSelectedList">
        <h5>
          已选
        </h5>
        <div class="department"
             v-if="userSelectedLength || orgSelectedLength || positionSelectedLength">
          <ul>
            <!-- 人员已选列表 -->
            <li v-if="isType('user')">
              <dl v-for="(company, name, index) in sortByOrgUserList"
                  :key="index">
                <dt @click="()=>{
                        $set(company, 'detail', !company.detail);
                        $forceUpdate();
                      }"
                    title="公司名称">{{name}} （{{company.childList.length}}）<i :class="{ folder: !company.detail }"
                     class="icon icon-sort-up"></i></dt>
                <dd v-show="company.detail"
                    :title="user.name"
                    v-for="(user, idx) in company.childList"
                    @click="cancelSelected('user', user.userId)"
                    :key="idx">
                  <span class="name">{{ user.userName }}</span>
                  <span>{{ user.positionName }}</span>
                  <i class="icon icon-prohibit"
                     title="移除"></i>
                </dd>
              </dl>
            </li>
            <!-- 人员已选列表 -->
            <!-- 人员/部门 已选列表 -->
            <li v-if="isType('userOrg') && userSelectedLength">
              <dl>
                <dt @click="toggleSelectMenu('user')"
                    title="人员">人员 （{{userSelectedLength}}）<i :class="{ folder: !selectedList['user'].detail }"
                     class="icon icon-sort-up"></i></dt>
                <dd v-show="selectedList['user'].detail"
                    :title="user.name"
                    v-for="(user, idx) in selectedList['user'].childList"
                    @click="cancelSelected('user', user.userId)"
                    :key="idx"><span class="name">{{ user.userName }}</span> <span>{{ user.positionName }}</span>
                  <i class="icon icon-prohibit"
                     title="移除"></i>
                </dd>
              </dl>
            </li>
            <!-- 人员/部门 已选列表 -->
            <!-- 部门已选列表 -->
            <li v-if="isType('org', 'userOrg') && orgSelectedLength">
              <dl>
                <dt @click="toggleSelectMenu('org')"
                    title="公司/部门">公司/部门 （{{orgSelectedLength}}）<i :class="{ folder: !selectedList['org'].detail }"
                     class="icon icon-sort-up"></i></dt>
                <dd v-show="selectedList['org'].detail"
                    :title="org.name"
                    v-for="(org, idx) in selectedList['org'].childList"
                    @click="cancelSelected('org', org.id)"
                    :key="idx">{{ org.companyName ? `${org.companyName}/` : ""}}{{ org.departmentName ? `${org.departmentName}/` : ""}}{{org.name}}
                  <i class="icon icon-prohibit"
                     title="移除"></i>
                </dd>
              </dl>
            </li>
            <!-- 部门已选列表 -->
            <!-- 岗位已选列表 -->
            <li v-if="isType('position')">
              <dl v-for="(company, name, index) in sortByOrgPositionList"
                  :key="index">
                <dt @click="()=>{
                        $set(company, 'detail', !company.detail);
                        $forceUpdate();
                      }"
                    title="公司名称">{{name}} （{{company.childList.length}}）<i :class="{ folder: !company.detail }"
                     class="icon icon-sort-up"></i></dt>
                <dd v-show="company.detail"
                    :title="user.name"
                    v-for="(user, idx) in company.childList"
                    @click="cancelSelected('position', user.positionId, user.teamId)"
                    :key="idx">{{ user.positionName }}{{ chooseSamePosition ? `/${user.teamName}` : "" }}
                  <i class="icon icon-prohibit"
                     title="移除"></i>
                </dd>
              </dl>
            </li>
            <!-- 岗位已选列表 -->
          </ul>
        </div>
        <div v-else
             class="none flex-box">
          请选择{{this.titleKeyMap[this.type]}}
        </div>
      </div>
      <!-- 右侧已选区域 -->
    </main>
    <!-- 主体内容区域 -->
    <!-- 主体内容下方附加插槽区域 -->
    <slot name="main-bottom"></slot>
    <!-- 主体内容下方附加插槽区域 -->
    <!-- 底部操作区域 -->
    <div class="tools-box flex-box">
      <div class="success">
        <jr-button v-if="canSubmit"
                   size="normal"
                   @click="confirm">确定</jr-button>
        <jr-button v-else
                   disabled
                   size="normal">确定</jr-button>
      </div>
    </div>
    <!-- 底部操作区域 -->

  </jr-message-box>
</template>
<script>
export default {
  name: "JrContactsList",
  props: {
    //  通讯录数据
    list: {
      type: Array,
      required: true
    },
    //  是否展示通讯录
    isShowPop: {
      type: Boolean,
      default: false,
      required: true
    },
    //  是否必须选择
    required: {
      type: Boolean,
      default: undefined
    },
    //  通讯录标题名称
    titleName: {
      type: String
    },
    //  通讯录预选择列表
    preSelectedList: {
      type: Array,
      default() {
        return [];
      }
    },
    //  是否多选类型
    multiple: {
      type: Boolean,
      default: true
    },
    //  通讯录类型
    type: {
      type: String,
      default: "user",
      validator: val => {
        let res = ["user", "org", "position", "userOrg"].indexOf(val) === -1;
        res &&
          window["console"].error(
            new RangeError(
              "the optional value of selection is user or org or position or userOrg"
            )
          );
        return !res;
      }
    },
    //  部门类型数据，限制选择等级
    orgLimitLevel: {
      type: Array,
      default() {
        return [];
      },
      validator: val => {
        if (val.length > 3) {
          window["console"].error(
            new RangeError("limit level max length is three")
          );
          return false;
        } else if (val.some(item => isNaN(item))) {
          window["console"].error(new RangeError("limit level must be number"));
          return false;
        }
        return true;
      }
    },
    //  搜索框默认文本渲染函数
    placeholder: {
      type: [String, Function]
    },
    //  其他团队的相同岗位
    chooseSamePosition: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 通讯录数据列表
      dataList: [],
      // 人员列表
      userList: [],
      //  部门列表
      orgList: [],
      //  职位列表
      positionList: {},
      // 搜索关键字
      keyWords: "",
      //  当前搜索类型
      searchType: 1,
      //  搜索类型键值对
      searchTypeKeyMap: {
        1: "人名/岗位",
        2: "公司/部门",
        3: "岗位"
      },
      titleKeyMap: {
        user: "人员",
        org: "部门",
        userOrg: "人员/部门",
        position: "岗位"
      },
      //  搜索菜单下拉展示
      searchTypeShow: false,

      //  人名/岗位，根据关键字匹配后结果
      userListPro: [],
      //  公司/部门，根据关键字匹配后结果
      orgListPro: [],
      //  岗位，根据关键字匹配后结果
      positionListPro: [],

      //  当前选择的部门
      currentDepartMent: {},

      //  已选列表
      selectedList: {
        org: {
          detail: true,
          childList: {}
        },
        user: {
          detail: true,
          childList: {}
        },
        position: {
          detail: true,
          childList: {}
        }
      }
    };
  },
  computed: {
    //  展示已选列表
    showSelectedList() {
      return this.type === "user" ? this.multiple : true;
    },
    //  窗体标题
    renderTitle() {
      return this.titleName || `选择${this.titleKeyMap[this.type] || ""}`;
    },
    /**
     * @desc 属于某种类型
     * @param {String} typeName 类型名称
     */
    isType() {
      return (...types) => {
        return types.includes(this.type);
      };
    },
    /**
     * @desc 根据部门进行分类的人员列表
     */
    sortByOrgUserList() {
      return Object.values(this.selectedList["user"].childList).reduce(
        (prev, current) => {
          prev[current.companyName]
            ? prev[current.companyName].childList.push(current)
            : (prev[current.companyName] = {
                detail: true,
                childList: [current]
              });
          return prev;
        },
        {}
      );
    },
    /**
     * @desc 根据部门进行分类的岗位列表
     */
    sortByOrgPositionList() {
      return Object.values(this.selectedList["position"].childList).reduce(
        (prev, current) => {
          prev[current.companyName]
            ? prev[current.companyName].childList.push(current)
            : (prev[current.companyName] = {
                detail: true,
                childList: [current]
              });
          return prev;
        },
        {}
      );
    },
    hasRequire() {
      return Object.prototype.toString.call(this.required) ===
        "[object Boolean]"
        ? this.required
        : true;
    },
    //  允许提交
    canSubmit() {
      if (this.type === "userOrg") {
        return this.hasRequire
          ? this.userSelectedLength || this.orgSelectedLength
          : true;
      } else {
        return this.hasRequire ? this[`${this.type}SelectedLength`] : true;
      }
    },
    //  已选择用户数据的长度
    userSelectedLength() {
      let user = this.selectedList["user"];
      return Object.keys(user.childList).length;
    },
    //  已选择部门数据的长度
    orgSelectedLength() {
      let org = this.selectedList["org"];
      return Object.keys(org.childList).length;
    },
    //  已选择岗位数据的长度
    positionSelectedLength() {
      let position = this.selectedList["position"];
      return Object.keys(position.childList).length;
    },
    //  搜索框下拉默认文本
    placeholderText() {
      if (this.placeholder) {
        return this.$utils.isFunction(this.placeholder)
          ? this.placeholder(this.searchType)
          : this.placeholder;
      } else {
        return "搜索" + this.searchTypeKeyMap[this.searchType];
      }
    }
  },
  watch: {
    isShowPop(now) {
      if (now) {
        this.resetData();
        this.init();
      }
    },
    list() {
      this.resetData();
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * @desc 通讯录初始化
     */
    init() {
      if (!this.multiple && this.preSelectedList.length > 1) {
        window["console"].error("当前为单选通讯录，但预选择列表多于一人");
      }
      //  不存在数据
      if (!this.list.length) {
        return;
      }

      this.initSearchType();
      //  计算数据
      this.calcData(this.list);

      //  自动展开
      this.changeDepartment(this.dataList[0].childList[0]);
    },
    /**
     * @desc 根据组件类型生成初始搜索类型
     * @author 杨文杰
     * @date 2019年7月22日 17:19:27
     */
    initSearchType() {
      this.searchType = {
        user: 1,
        org: 2,
        userOrg: 1,
        position: 3
      }[this.type];
    },
    /**
     * @desc 判断数据是否在预选列表中，自动选中对象
     * @param {String} type 数据类型
     * @param {Object} item 数据
     */
    autoCheckItem(type, item) {
      if (this.type !== type) {
        return;
      }
      const matchId = {
        user: "userId",
        org: "id",
        position: "positionId"
      };
      if (this.preSelectedList.includes(item[matchId[type]])) {
        switch (type) {
          case "user":
            this.toggleCheckUser(item, true);
            break;
          case "org":
            this.toggleCheckOrg(item, true);
            break;
          case "position":
            this.toggleCheckPosition(item, true);
            break;
        }
      }
    },
    /**
     * @desc 遍历并初始化数据
     * @param {Array} data 通讯录数据
     * @author 杨文杰
     * @date 2019年5月8日 18:42:59
     */
    calcData(data) {
      data.map(company => {
        company.orgType = 1;
        this.$set(company, "detail", true);
        this.$set(company, "selected", false);

        this.orgList.push(company);

        //  如部门等级限制，不包含一级公司
        if (!this.orgLimitLevel.includes(1)) {
          //  检查是否需要自动选择公司
          this.autoCheckItem("org", company);
        }

        company.childList.map(department => {
          department.orgType = 2;
          this.$set(department, "selected", false);
          this.positionList[department.id] = {};

          this.orgList.push(department);
          department.companyId = company.id;
          department.companyName = company.name;

          //  如部门等级限制，不包含二级部门
          if (!this.orgLimitLevel.includes(2)) {
            //  检查是否需要自动选择部门
            this.autoCheckItem("org", department);
          }

          department.childList.map(team => {
            team.orgType = 3;
            this.$set(team, "selected", false);

            team.companyId = company.id;
            team.companyName = company.name;
            team.departmentId = department.id;
            team.departmentName = department.name;
            this.orgList.push(team);

            //  如部门等级限制，不包含二级部门
            if (!this.orgLimitLevel.includes(3)) {
              //  检查是否需要自动选择小组
              this.autoCheckItem("org", team);
            }

            team.userList.map(user => {
              user.companyId = company.id;
              user.companyName = company.name;
              user.departmentId = department.id;
              user.departmentName = department.name;
              user.teamId = team.id;
              user.teamName = team.name;
              user.departmentInfo = `${company.name}/${department.name}`;

              this.$set(user, "selected", false);

              //  检查是否需要自动选择人员
              this.autoCheckItem("user", user);

              //  检查是否需要自动选择岗位
              this.autoCheckItem("position", user);

              this.positionList[department.id][user.positionName] = user;
              this.userList.push(user);
            });

            team.positionList = team.userList.reduce((prev, current) => {
              let [list, obj] = prev;
                if (!obj[current.positionId]) {
                  list.push(current);
                  obj[current.positionId] = true;
                }
                return [list, obj];
            }, [[], {}])[0];
          });
        });
      });
      this.dataList = data;
    },
    /**
     * @desc 重置数据
     */
    resetData() {
      this.dataList = [];
      this.userList = [];
      this.orgList = [];
      this.positionList = {};

      this.keyWords = "";
      this.currentDepartMent = {};

      this.selectedList = {
        org: {
          detail: true,
          childList: {}
        },
        user: {
          detail: true,
          childList: {}
        },
        position: {
          detail: true,
          childList: {}
        }
      };
    },
    /**
     * @desc 切换打开关闭已经选择的菜单
     */
    toggleSelectMenu(item) {
      let obj = this.selectedList[item];
      this.$set(obj, "detail", !obj.detail);
    },
    /**
     * @desc 打开搜索类型下拉
     * @author 杨文杰
     * @date 2019年6月19日 18:30:21
     */
    openSearchType() {
      this.searchTypeShow = !this.searchTypeShow;
    },
    /**
     * @desc 搜索类型切换
     * @param {Number} type 搜索类型
     * @author 杨文杰
     * @date 2019年6月19日 18:31:42
     */
    toggleSearchType(type) {
      this.searchType = type;
    },
    /**
     * @desc 关闭搜索类型
     * @author 杨文杰
     * @date 2019年6月19日 18:29:22
     */
    closeSearchType() {
      this.searchTypeShow && (this.searchTypeShow = false);
    },
    /**
     * @desc 正在输入搜索文本框内容
     * @author vivvn
     * @date 2019年4月24日08:24:19
     */
    searchList() {
      const keyWords = this.keyWords;
      window.clearTimeout(this.searchTimeout);
      if (this.searchType === 1) {
        this.userListPro = [];
        this.searchTimeout = window.setTimeout(() => {
          this.userListPro = this.userList.filter(
            user =>
              user.positionName.includes(keyWords) ||
              user.userName.includes(keyWords)
          );
        }, 300);
      } else if (this.searchType === 2) {
        this.orgListPro = [];
        this.searchTimeout = window.setTimeout(() => {
          this.orgListPro = this.orgList.filter(org => {
            if (
              org.name.includes(keyWords) &&
              !this.orgLimitLevel.includes(org.orgType)
            ) {
              return true;
            }
          });
        }, 300);
      } else if (this.searchType === 3) {
        this.positionListPro = [];
        this.searchTimeout = window.setTimeout(() => {
          this.positionListPro = Object.values(this.positionList)
            .reduce((prev, current) => {
              return prev.concat(Object.values(current));
            }, [])
            .reduce(
              (prev, current) => {
                let [list, obj] = prev;
                if (!obj[current.positionId]) {
                  list.push(current);
                  obj[current.positionId] = true;
                }
                return [list, obj];
              },
              [[], {}]
            )[0]
            .filter(user => user.positionName.includes(keyWords));
        }, 300);
      }
    },
    /**
     * @desc 折叠当前对象
     * @param {Object} item 选中的公司集合
     * @author vivvn
     * @date 2019年4月24日08:37:52
     */
    toggleShowDetail(item) {
      this.$set(item, "detail", !item.detail);
    },
    /**
     * @desc 确认选择
     * @author vivvn
     * @date 2019年4月24日08:38:46
     */
    confirm() {
      const selectedList = this.selectedList;
      let data;
      if (this.type === "userOrg") {
        data = {
          user: Object.values(selectedList["user"].childList),
          org: Object.values(selectedList["org"].childList)
        };
      } else {
        data = Object.values(selectedList[this.type].childList);
      }
      this.$emit("on-confirm", data);
      this.cancel();
    },
    /**
     * @desc 隐藏弹窗
     * @author vivvn
     * @date 2019年4月24日08:50:51
     */
    cancel() {
      // 之前发送的事件名称拼写错误，保留此错误的事件名称
      this.$emit("on-cancal");

      // 关闭弹窗
      this.$emit("on-cancel");
    },
    /**
     * @desc 改变部门
     * @param {Object} it 选中的部门
     * @author 杨文杰
     * @date 2019年5月8日 18:42:26
     */
    changeDepartment(it) {
      this.currentDepartMent = it;
    },
    /**
     * @desc 切换选择岗位
     */
    toggleCheckPosition(item, value) {
      //  如存在最大长度 且 为选中 且 已选择长度等于最大长度
      if (
        typeof this.maxLength === "number" &&
        value &&
        this.selectedLength === this.maxLength
      ) {
        return this.$confirm(`单次最多选择${this.maxLength}个`);
      }
      let selectedObj = this.selectedList["position"].childList;

      //  如为单选模式，清空已选列表
      if (!this.multiple) {
        for (let i in selectedObj) {
          this.cancelSelected("position", selectedObj[i].positionId, selectedObj[i].teamId);
        }
      }

      //  设置选中状态
      this.$set(item, "selected", value);

      //  在岗位列表中，寻找相同的人，设置相同的操作
      Object.values(this.positionList)
        .reduce((prev, current) => {
          return prev.concat(Object.values(current));
        }, [])
        .forEach(
          user =>
            user.positionId === item.positionId &&
            this.$set(item, "selected", value)
        );

      const key = item.positionId + (this.chooseSamePosition ? item.teamId : "");

      //  设置对象属性
      if (value) {
        this.$set(selectedObj, key, item);
      }
      //  如果没有选中，干掉
      else if (!item.selected) {
        this.$delete(selectedObj, key);
      }
    },
    /**
     * @desc 切换选择部门
     */
    toggleCheckOrg(org, value) {
      let selectedObj = this.selectedList["org"].childList;

      //  过滤已选列表，不满足情况不允许选择或取消选择
      let topOrgInSelectedObj = Object.keys(selectedObj).find(id => {
        //  已选列表中包含自己的上级部门
        if (org.companyId === id || org.departmentId === id) {
          return true;
        }

        //  如已选对象的公司ID或部门ID等于新选择的部门ID，清除选择
        if (
          [selectedObj[id].companyId, selectedObj[id].departmentId].includes(
            org.id
          )
        ) {
          this.cancelSelected("org", id);
        }
      });

      //  上级部门存在于已选列表
      if (topOrgInSelectedObj) return;

      //  如为单选模式，清空已选列表
      if (!this.multiple) {
        for (let i in selectedObj) {
          this.cancelSelected("org", i);
        }
      }
      //  设置选中状态
      this.$set(org, "selected", value);

      //  在职位列表中，寻找相同的职位，设置相同的操作
      this.orgList.forEach(
        item => item.id === org.id && this.$set(item, "selected", value)
      );

      //  设置对象属性
      if (value) {
        this.$set(selectedObj, org.id, org);
      }
      //  如果没有选中，干掉
      else if (!org.selected) {
        this.$delete(selectedObj, org.id);
      }
    },
    /**
     * @desc 切换选择人员
     * @param {Object} user 选中的人员
     * @param {Boolean} value 选中的状态
     * @author 杨文杰
     * @date 2019年5月16日 15:17:51
     */
    toggleCheckUser(user, value) {
      //  如存在最大长度 且 为选中 且 已选择长度等于最大长度
      if (
        typeof this.maxLength === "number" &&
        value &&
        this.selectedLength === this.maxLength
      ) {
        return this.$confirm(`单次最多选择${this.maxLength}人`);
      }
      let selectedObj = this.selectedList["user"].childList;
      //  如为单选模式，清空已选列表
      if (!this.multiple) {
        for (let i in selectedObj) {
          this.cancelSelected("user", selectedObj[i].userId);
        }
      }

      //  设置选中状态
      this.$set(user, "selected", value);

      //  在人员列表中，寻找相同的人，设置相同的操作
      this.userList.forEach(
        item =>
          item.userId === user.userId && this.$set(item, "selected", value)
      );

      //  设置对象属性
      if (value) {
        this.$set(selectedObj, user.userId, user);
      }
      //  如果没有选中，干掉
      else if (!user.selected) {
        this.$delete(selectedObj, user.userId);
      }
    },
    /**
     * @desc 在已选列表中删除已选的目标
     * @param {object} type 删除的类型
     * @param {object} id 目标ID
     * @author 杨文杰
     * @date 2019年5月29日 17:58:55
     */
    cancelSelected(type, id, teamId) {
      let selectedObj = this.selectedList[type].childList;

      if (type === "user") {
        //  在人员列表中，寻找相同的人，设置相同的操作
        this.userList.forEach(
          item => item.userId === id && (item.selected = false)
        );
      } else if (type === "org") {
        //  在部门列表中，寻找相同的部门，设置相同的操作
        this.orgList.forEach(item => item.id === id && (item.selected = false));
      } else if (type === "position") {
        //  在岗位列表中，寻找相同的岗位，设置相同的操作
        Object.values(this.positionList)
          .reduce((prev, current) => {
            return prev.concat(Object.values(current));
          }, [])
          .forEach(item => {
            if(this.chooseSamePosition) {
              if(item.positionId === id && item.teamId === teamId){
                item.selected = false;
              }
            } else {
              if(item.positionId === id){
                item.selected = false;
              }
            }
          });

        if(this.chooseSamePosition) {
          id = id + teamId;
        }
      }

      //  已选列表中移除
      this.$delete(selectedObj, id);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./contactsList.scss";
</style>
