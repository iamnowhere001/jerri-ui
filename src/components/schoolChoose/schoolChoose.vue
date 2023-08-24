<!--
/****************************************************************************

所属系统: 组件库
所属模块: 校区选择模块
创建时间: 2020年07月10日 09:54:16
维护人: 叶志
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div class="jr-school-choose">
    <jr-message-box v-model="visible"
                    title="加粗"
                    width="1000px"
                    maxHeight='auto'
                    @onClose='closeThis'
                    :isDefine="true">
      <strong slot="title">{{schoolTitle}}</strong>
      <div class="jr-school-content">

        <!-- 左侧选择校区 -->
        <div class="school-content-left">
          <div class="input-box">
            <jr-input v-model="searchKey"
                      @input="searchSchool"></jr-input>
          </div>
          <div class="school-show">
            <div class="city-box"
                 v-for="(item,index) in showCityList"
                 :key="index + 'city'">

              <!-- 城市标题 -->
              <p class="city-title"
                 @click="item.isPack = !item.isPack">

                <!-- icon标签 -->
                <i class="icon-sort-up"
                   :class="{'rotateI':!item.isPack}"></i>

                <!-- 市 -->
                <span>{{item.city}}</span>
              </p>

              <!-- 校区内容 -->
              <div class="city-school-box"
                   v-if="item.isPack">

                <!-- 校区名称 -->
                <p v-for="(childItem,childIndex) in item.childrenList"
                   @click="chooseSchool(item,childItem)"
                   v-title> {{childItem.name}} <jr-button slotText='+'
                             shape='circle'
                             class="common-btn"></jr-button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧已选择 -->
        <div class="school-content-right">
          <p class="right-titlex">已选</p>
          <div class="school-show">
            <div class="city-box"
                 v-for="(item,index) in choosedList"
                 :key="index + 'city'">

              <!-- 城市标题 -->
              <p class="city-title"
                 @click="item.isPack = !item.isPack">

                <!-- icon标签 -->
                <i class="icon-sort-up"
                   :class="{'rotateI':!item.isPack}"></i>

                <!-- 市 -->
                <span>{{item.city}}</span>
              </p>

              <!-- 校区内容 -->
              <div class="city-school-box"
                   v-if="item.isPack">

                <!-- 校区名称 -->
                <p v-for="(childItem,childIndex) in item.childrenList"
                   v-title> {{childItem.name}}
                  <i class="icon-wrong-warning common-btn"
                     @click=" deleteChoosed({item,childItem,childIndex,index})"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="j-center j-mt-30">
        <jr-button>确定</jr-button>
      </div>
    </jr-message-box>
  </div>
</template>
<script>
export default {
  name: 'JrSchoolChoose',
  components: {},
  mixins: [],
  props: {
    // 标题
    schoolTitle: {
      type: String,
      default: "选择校区"
    },

    // 需要特殊搜索的字段
    specialArr: {
      type: Array,
      default() {
        return [
          // {
          //   // 搜索的名称
          //   searchName: "黄贝",
          //   // 对应校区下的字段
          //   key: "isTest"
          // }
        ]
      }
    }
  },
  data() {
    return {
      visible: true,
      // 搜索的key值
      searchKey: "",
      // 显示的城市校区数组
      showCityList: [],
      // 全部的校区数组
      citySchoolList: [
        {
          city: '深圳市',
          cityId: 1,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区",
              isUnder: true,
            },
            {
              id: 2,
              name: "深圳百花校区"
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '苏州市',
          cityId: 2,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区",
              isUnder: true,
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '北京市',
          isPack: false,
          cityId: 3,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区",
              isTest: true
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '重庆市',
          isPack: false,
          cityId: 4,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区",
              isTest: true
            },
            {
              id: 3,
              name: "深圳东海校区",
            },
          ]
        },
        {
          city: '上海市',
          cityId: 5,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区",
              isTest: true
            },
            {
              id: 2,
              name: "深圳百花校区",
              isTest: true
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '天津市',
          cityId: 6,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区"
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '哈尔滨',
          cityId: 7,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区"
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '内蒙古',
          cityId: 7,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区"
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '广州市',
          cityId: 7,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区"
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '长沙市',
          cityId: 8,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区"
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
        {
          city: '惠州市',
          cityId: 9,
          isPack: false,
          childrenList: [
            {
              id: 1,
              name: "深圳黄贝岭校区"
            },
            {
              id: 2,
              name: "深圳百花校区"
            },
            {
              id: 3,
              name: "深圳东海校区"
            },
          ]
        },
      ],
      // 已选的校区数组
      choosedList: [
      ],
    }
  },
  created() {
    this.initData();
  },
  mounted() { },
  methods: {
    /**
    * @desc 初始化数据
    * @author 叶志
    * @date 2020年07月10日 15:01:13
    */
    initData() {
      this.showCityList = this.$utils.deepCopy(this.citySchoolList);
    },
    /**
    * @desc 搜索校区
    * @author 叶志
    * @date 2020年07月10日 14:47:01
    */
    searchSchool() {
      this.showCityList = [];
      let citySchoolList = this.$utils.deepCopy(this.citySchoolList)
      citySchoolList.forEach(ele => {

        // 寻找特殊的搜索字段
        let findSpecial = this.specialArr.find(specialArr => specialArr.searchName === this.searchKey);

        // 筛选符合要求的字段
        let searchData = ele.childrenList.filter(childrenEle => childrenEle.name.includes(this.searchKey) || (findSpecial && childrenEle[findSpecial.key]));

        // 有长度即可添加
        if (searchData && searchData.length) {
          ele.childrenList = searchData;
          this.showCityList.push(ele);
        }
      })
    },
    /**
    * @desc 删除已选校区
    * @author 叶志
    * @date 2020年07月10日 14:47:01
    */
    deleteChoosed({ item, childIndex, index }) {
      if (item.childrenList.length === 1) {
        this.choosedList.splice(index, 1)
      } else {
        item.childrenList.splice(childIndex, 1)
      }
    },
    /**
    * @desc 校区选择
    * @param 
    * @return 
    * @author 叶志
    * @date 2020年07月10日 14:29:54
    */
    chooseSchool(item, childItem) {
      let obj = this.choosedList.find(ele => ele.cityId === item.cityId);
      if (obj) {
        if (!obj.childrenList.some(ele => ele.id === childItem.id)) {
          obj.childrenList.push(childItem);
        }
      } else {
        let newData = this.$utils.deepCopy(item);
        newData.childrenList = [];
        newData.childrenList.push(childItem)
        this.choosedList.push(newData);
      }
    },
    /**
    * @desc 关闭弹窗
    * @author 叶志
    * @date 2020年07月10日 10:11:20
    */
    closeThis() {
      this.$emit('onClose', false);
    },
  }
}
</script>
<style scoped lang='scss'>
@import "./schoolChoose.scss";
</style>