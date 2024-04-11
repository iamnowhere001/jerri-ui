<!--
/****************************************************************************

所属系统: 组件库
所属模块: 地址控件


***************************************************************************/
-->
<template>
  <div class="add-content" v-clickoutside="cancel">
    <!-- 输入框。选中之后进入此输入框 -->
    <div class="input-box">
      <!-- 查看时的样式 -->
      <p
        class="show-p j-pointer"
        :class="{ 'add-place-chosed': !currentAdd }"
        :style="{ 'line-height': inputHeight - 2 + 'px' }"
        @click="showAdd"
        v-title
      >
        {{ currentAdd || placeholderStr }}
      </p>

      <!-- 选择时的样式 -->
      <jr-input
        v-model="currentAdd"
        @click.native="showAdd"
        :style="{ width: inputWidth + 'px', height: inputHeight + 'px' }"
        readonly
        :disabled="disabled"
        placeholder="请选择"
        suffixIcon="icon-choose"
      />
    </div>

    <div class="add-main " ref="mainRef" v-show="visible" id="mainRef">
      <!-- 区域 -->
      <div class="add-area-select">
        <span
          v-for="(item, index) in areaArr"
          :key="index"
          :class="{ active: areaFlag === index }"
          @click="changeActive(index)"
          :title="item.value"
          >{{ item.value }}</span
        >
      </div>
      <!-- 区域 -->

      <div class="add-definite-select j-scroll-bar">
        <!-- 加载地址数据时的loading -->
        <jr-loading-petal :visible="loadHide"></jr-loading-petal>

        <!-- 城市/区 -->
        <div class="add-definite-content" v-show="!isProvinceList && !loadHide">
          <span
            class="add-definite-span"
            v-for="(item, index) in newArr.value"
            :key="index"
            :class="{ active: index === newFlag }"
            @click="
              changeMiddle({
                flag: index,
                id: item.id,
                type: newArr.type,
                val: item.value,
              })
            "
            >{{ item.value }}</span
          >
        </div>
        <!-- 城市/区 -->

        <!-- 省份 -->
        <div class="add-province-content " v-show="isProvinceList && !loadHide">
          <div
            class="add-province-div"
            v-for="(item, index) in provinceList.value"
            :key="index"
          >
            <span class="add-province-div-span" v-if="item.key !== ''">{{
              item.key
            }}</span>
            <div class="add-province-select ">
              <span
                v-for="(el, flag) in item.value"
                :key="flag"
                class="add-definite-span"
                :class="{
                  active: item.indexActive === flag,
                  key: item.key !== '',
                  mb0:
                    item.key !== '' && index === provinceList.value.length - 1,
                }"
                @click="
                  changeProvince({
                    index,
                    flag,
                    id: el.id,
                    val: el.val,
                  })
                "
                >{{ el.val }}</span
              >
            </div>
          </div>
        </div>
        <!-- 省份 -->
      </div>

      <!-- 确定和输入详细地址DOM -->
      <div class="add-btn-box">
        <div class="add-address">
          <template v-if="hasDetailAddress">
            <span v-show="isWrite">
              详细地址 :
            </span>
            <input
              type="text"
              v-show="isWrite"
              ref="addressInput"
              v-model.trim="addressVal"
              placeholder="请输入"
              :maxlength="addressMaxLength"
            />
          </template>
        </div>
        <jr-button
          @click="sendAddress"
          :disabled="isInputRequired ? !addressVal.length : !isWrite"
          >确定</jr-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  name: "JrChooseDistrict",
  // 点击确认返回方法sendData-----
  props: {
    //国家的ID   中国1，香港273，澳门274，台湾272，美国2，法国7，加拿大3，印度26，
    stateId: {
      type: Number,
      default: 1,
    },
    // 默认传过来的值
    address: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 输入框是否必填
    isInputRequired: {
      type: Boolean,
      default: false,
    },
    // 选中的地址
    selectAddress: {
      type: String,
      default: "",
    },
    // 请求环境
    action: {
      type: String,
    },
    // 输入框的宽度
    inputWidth: {
      type: Number,
      default: 200,
    },
    // 输入框的高度
    inputHeight: {
      type: Number,
      default: 26,
    },
    placeholderStr: {
      type: String,
      default: "请选择",
    },
    // 详情地址允许输入的字段长度
    addressMaxLength: {
      type: Number,
      default: 25,
    },
    //  允许选择层级限制
    limit: {
      type: Number,
      default: 3,
    },
    //  允许选择的国家
    countyChooseList: {
      type: Array,
      default() {
        return ["中国", "美国", "法国", "加拿大", "印度"];
      },
    },
    //  拥有填写详细地址文本框
    hasDetailAddress: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
  },
  data() {
    return {
      // 是否显示地址控件
      visible: false,
      // 当前选择的地址
      currentAdd: "",
      // loding的显示
      loadHide: false,
      // 控件点击标记
      mainFlag: false,
      // 是否显示英文
      enFlag: false,
      // 总数据
      sumData: [],
      // 详细地址,
      addressVal: "",
      // 区域当前选择下标
      areaFlag: 0,
      // 区域选择数组
      areaArr: [
        {
          value: "国家/地区",
          id: 1,
        },
      ],
      // 中间内容渲染的数组
      newArr: [],
      // 中间当前选择的下标
      newFlag: 999,
      // 国家以及其他数据选择数组
      stateList: {
        type: "state",
        value: [
          {
            value: "中国",
            id: "1",
            childs: [],
          },
          {
            value: "美国",
            id: "2",
            childs: [],
          },
          {
            value: "法国",
            id: "7",
            childs: [],
          },
          {
            value: "加拿大",
            id: "3",
            childs: [],
          },
          {
            value: "印度",
            id: "26",
            childs: [],
          },
        ].filter((countyItem) => {
          if (this.countyChooseList.includes(countyItem.value)) {
            return true;
          }
        }),
      },
      // 省份选择数组
      provinceList: {
        type: "province",
        value: [],
      },
      // 省份页面是否显示
      isProvinceList: false,
      // 城市数组
      cityList: {
        type: "city",
        value: [],
      },
      // 区县数组
      countyList: {
        type: "county",
        value: [],
      },
      // 是否可以填写详细地址
      isWrite: false,
      // 存储所有已经选择的ID
      objId: {
        stateId: 999,
        provinceId: 999,
        cityId: 999,
        countyId: 999,
      },
      tabArr: [], // tab栏数组
      specialTag: false,
      // 后台返回的国家ID
      countryId: {
        ChinaId: "1",
        HongKong: "273",
        Aomen: "274",
        Taiwan: "272",
        American: "2",
        France: "7",
        Canada: "3",
        India: "26",
      },
      countryIdArr: [
        {
          Id: 1,
          val: "中国",
        },
        {
          Id: 2,
          val: "美国",
        },
        {
          Id: 7,
          val: "法国",
        },
        {
          Id: 3,
          val: "加拿大",
        },
        {
          Id: 26,
          val: "印度",
        },
      ],
      // 地址对象
      homeAddressFormat: {
        state: "",
        province: "",
        city: "",
        countyArea: "",
        address: "",
      },
    };
  },
  created() {
    this.initData();
  },
  watch: {
    selectAddress: {
      immediate: true,
      handler() {
        this.currentAdd = this.selectAddress;
      },
    },
    address: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          if (this.address.state) {
            this.setData(this.address);
          }
        });
      },
    },
  },
  mounted() {},
  methods: {
    /**
     * @desc 初始化数据
     * @author 叶志
     * @date 2019-6-18 10:11:40
     */
    initData() {
      this.newArr = this.stateList; // 默认的数组
      this.currentAdd = this.selectAddress;
      if (this.address.state) {
        this.setData(this.address);
      } else if (this.stateId) {
        this.countryIdArr.forEach((ele, index) => {
          if (ele.Id === this.stateId) {
            this.changeMiddle({
              flag: index,
              id: ele.Id,
              type: "state",
              val: ele.val,
            });
          }
        });
      }
    },
    /**
     * @desc 显示控件
     * @author 叶志
     * @date 2019-9-25 15:12:49
     */
    showAdd() {
      if (this.disabled) {
        return;
      }
      this.visible = true;
    },
    /**
     * @function 获取接口信息
     * @param areaId 城市的ID
     * @param level 城市的水平线
     * @param flag 当前选择是什么区域
     * @param index 当前选择的下标
     * @param outIndex 当前选择的外部的下标--专门为省份写的
     */
    async getNewData(areaId, flag, index, outIndex) {
      if (
        flag === "county" ||
        (flag === "city" && this.tabArr.length < 3) ||
        (flag === "province" && this.tabArr.length < 2)
      ) {
        if (flag === "province") {
          this.provinceList.value[outIndex].value[index].childs = [];
        } else {
          this[flag + "List"].value[index].childs = [];
        }
        return;
      }
      this.loadHide = true;
      let { data } = await this.getDistrict(this.action, { areaId });
      this.loadHide = false;
      if (flag === "province") {
        this.provinceList.value[outIndex].value[index].childs = data || [];
      } else {
        this[flag + "List"].value[index].childs = data || [];
      }
    },
    // 部门组件数据请求
    getDistrict(API_URI, params = null) {
      let url = `${API_URI}/api/BDP1/area/v2/GetChildsAreaById?${qs.stringify(
        params
      )}`;
      return this.$utils.formAjax(
        {
          url,
        },
        "GET"
      );
    },
    /**
     * @function 点击确认发送sendData事件给父组件
     *
     */
    sendAddress() {
      if (!this.isWrite) {
        return;
      }
      // 赋值基础地址
      this.homeAddressFormat.address = this.addressVal;
      let homeAddressFormat = this.$utils.deepCopy(this.homeAddressFormat);
      // 详细地址
      let addressString =
        this.homeAddressFormat.state +
        this.homeAddressFormat.province +
        this.homeAddressFormat.city +
        (this.homeAddressFormat.countyArea || "") +
        (this.homeAddressFormat.address || "");
      this.cancel();
      this.currentAdd = addressString;
      let ids = this.$utils.deepCopy(this.objId);
      // 直辖市数组
      let specialArr = ["241", "262", "249", "242"];
      // 直辖市标记
      let municipality = specialArr.some((ele) => ele === ids.provinceId);
      if (this.limit === 2 && municipality) {
        ids.cityId = ids.provinceId;
      }
      this.$emit("success", {
        homeAddressFormat,
        addressString,
        ids,
        municipality,
      });
    },
    /**
     * @function 隐藏选项框
     * @param type 传过来的属于什么级别（城市or国家等）类型
     * @param address 传过来的地址
     */
    cancel() {
      this.visible = false;
    },
    /**
     * @function 提供给默认地址。获取数据的方法
     * @param type 传过来的属于什么级别（城市or国家等）类型
     * @param address 传过来的地址
     */
    getData(type, address, callbackOne) {
      this[type + "List"].value.forEach((el, index) => {
        if (el.value === address[type === "county" ? type + "Area" : type]) {
          this.changeMiddle({
            flag: index,
            id: el.id,
            type,
            val: el.value,
            callback: callbackOne,
          });
        }
      });
    },
    /**
     * @function  默认有地址的方法
     */
    setData(address) {
      let that = this;
      this.getData("state", address, () => {
        this.provinceList.value.forEach((el, index) => {
          el.value.forEach((elSelf, elIndex) => {
            if (elSelf.val === address.province) {
              that.changeProvince({
                index,
                flag: elIndex,
                id: elSelf.id,
                val: elSelf.val,
                callback: () => {
                  this.addressVal = address.address;
                  this.getData("city", address, () => {
                    this.addressVal = address.address;
                    this.getData("county", address, () => {
                      this.addressVal = address.address;
                    });
                  });
                },
              });
            }
          });
        });
      });
    },
    /**
     * @function  找到并且选中（中间区域）之前选择的下标
     * @param val 传入标记字符串
     */
    chooseFlag(val) {
      if (typeof val === "boolean" && val) {
        // 省份的选择。
        this.provinceList.value.forEach((el, item) => {
          el.indexActive = 999;
          el.value.forEach((val, flag) => {
            if (val.id === this.objId.provinceId) {
              el.indexActive = flag;
            }
          });
        });
        return;
      }
      // 除了省份其他的选择
      this[val + "List"].value.forEach((el, item) => {
        if (+el.id === +this.objId[val + "Id"]) {
          this.newFlag = item;
        }
      });
    },
    /**
     * @function  点击改变选择区域选择
     * @param flag 传入的下标
     *
     */
    changeActive(flag) {
      //正在加载的时候不能点击
      if (this.loadHide) {
        return;
      }
      this.newFlag = 999; // 去除之前（中间区域）的选择下标
      this.areaFlag = flag; // 切换Tab栏
      this.isProvinceList = false; // 不显示省份选项
      switch (flag) {
        // 国家
        case 0:
          this.chooseFlag("state");
          this.newArr = this.stateList;
          break;
        // 省份
        case 1:
          this.chooseFlag(true);
          this.isProvinceList = true;
          break;
        // 城市
        case 2:
          this.chooseFlag("city");
          this.newArr = this.cityList;
          break;
        // 区域
        case 3:
          this.chooseFlag("county");
          this.newArr = this.countyList;
          break;
      }
    },
    /**
     * @function  --还原数据
     * @param flag --标记字符串
     * @param areaF --tab栏的切换
     * @param id -- 选择的ID
     * @param val 当前选择区域的字符串
     */
    restoreData(flag, areaF, id, val) {
      const FLAGNAME = ["state", "province", "city", "countyArea"];
      let nameFlag = false;
      FLAGNAME.forEach((ele, index) => {
        if (nameFlag) {
          this.homeAddressFormat[ele] = "";
        }
        if (ele === flag) {
          nameFlag = true;
        }
      });
      this.newFlag = 999; // 不要默认选择
      this.addressVal = ""; // 第二次选择的时候清空详细地址
      // 是否可填详细地址
      flag === "city" ? (this.isWrite = true) : (this.isWrite = false);
      // 第二次选择的时候清空原本选择的ID
      flag === "state" ? (this.objId.provinceId = 999) : "";
      flag === "city" ? "" : (this.objId.cityId = 999);
      this.objId.countyId = 999;
      this.objId[flag + "Id"] = id; // 选择设置当前的ID
      this.homeAddressFormat[flag] = val;
      this.areaArr.splice(areaF); // 二次选择的时候删除之前tab的数组
      if (this.tabArr.length >= areaF) {
        this.areaFlag = areaF; // tab栏的切换
        this.areaArr.push({
          value: this.tabArr[areaF - 1],
          id: 2,
        }); // 点击添加一个tab栏的选项
      }
      this.areaArr[areaF - 1].value = val; // tab栏默认值变成上级选择的字符串
    },
    /**
     * @function  --筛选tab栏数据
     * @param val  传入的选中的值
     */
    judgeTabType(val) {
      let tabArr;
      switch (val) {
        case "中国":
          tabArr = ["省份", "城市", "县区"];
          break;
        case "美国":
          tabArr = ["州/省", "城市"];
          break;
        case "加拿大":
          tabArr = ["城市"];
          break;
        default:
          tabArr = [];
          break;
      }
      this.tabArr = tabArr.splice(0, this.limit);
    },
    /**
     * @function 筛选省份/州的数据
     * @param flag 下标
     */
    screenProvince(flag) {
      let provinceData = this.stateList.value[flag].childs; // 获取上一级选择的子数组的
      let that = this;
      this.enFlag = false;
      let parentID = provinceData[0].parentID;
      // 当选择国家为中国的情况-----------------------
      if (parentID === this.countryId.ChinaId) {
        let provinceDataVal = [
          {
            key: "A-G",
            value: [],
          },
          {
            key: "H-I",
            value: [],
          },
          {
            key: "J-L",
            value: [],
          },
          {
            key: "M-Q",
            value: [],
          },
          {
            key: "S-T",
            value: [],
          },
          {
            key: "X-Z",
            value: [],
          },
        ];
        provinceData.forEach((el) => {
          let index = this.judgeLetter(el.first);
          provinceDataVal[index]["value"].push({
            val: el.name,
            id: el.id,
            childs: el.childs,
          });
        });
        this.provinceList.value = provinceDataVal;
        return;
      }
      // 判断选择国家不是中国的情况-----------------------------------------------------
      let provinceDataVal = [];
      // 当选择国家为加拿大和美国时。显示的语言为英文
      if (
        parentID === this.countryId.American ||
        parentID === this.countryId.Canada
      ) {
        this.enFlag = true;
      }
      // 当选择国家为台湾和香港,加拿大时.不显示第一个开头字母。特殊处理.
      if (
        parentID === this.countryId.HongKong ||
        parentID === this.countryId.Taiwan ||
        parentID === this.countryId.Canada
      ) {
        provinceData.forEach((el) => {
          // 如果有key为空字符的数据加往里面加内容。没有就添加一个key为空字符串的下标。
          if (provinceDataVal[0]) {
            provinceDataVal[0].value.push({
              val: that.enFlag ? el.nameEn : el.name,
              id: el.id,
              childs: el.childs,
            });
          } else {
            provinceDataVal[0] = {
              key: "",
              value: [
                {
                  val: that.enFlag ? el.nameEn : el.name,
                  id: el.id,
                  childs: el.childs,
                },
              ],
            };
          }
        });
        this.provinceList.value = provinceDataVal;
        return;
      }
      provinceData.forEach((el) => {
        let index;
        provinceDataVal.forEach((proEl, proElIndex) => {
          if (proEl.key === el.first) {
            index = proElIndex;
          }
        });
        // 如果有这个字母的数据就push没有就新增
        if (index >= 0) {
          provinceDataVal[index]["value"].push({
            val: that.enFlag ? el.nameEn : el.name,
            id: el.id,
            childs: el.childs,
          });
        } else {
          provinceDataVal.push({
            key: el.first,
            value: [
              {
                val: that.enFlag ? el.nameEn : el.name,
                id: el.id,
                childs: el.childs,
              },
            ],
          });
        }
      });
      this.provinceList.value = provinceDataVal;
    },
    /**
     * @function 筛选城市数据
     * @param index 外层数组下表
     * @param flag 内层数组下表
     */
    screenCity(index, flag) {
      let cityData = this.provinceList.value[index].value[flag].childs || [];
      // 获取上一级选择的子数组的
      let that = this;
      let cityListVal = [];
      cityData.forEach((el) => {
        cityListVal.push({
          value: that.enFlag ? el.nameEn : el.name,
          id: el.id,
          childs: el.childs,
        });
      });
      this.cityList.value = cityListVal;
    },
    /**
     * @function 筛选区/悬数据
     * @param index 外层数组下表
     * @param flag 内层数组下表
     */
    screenCounty(index) {
      let countyData = this.cityList.value[index].childs; // 获取上一级选择的子数组的
      let that = this;
      let countyListVal = [];
      countyData.forEach((el) => {
        countyListVal.push({
          value: that.enFlag ? el.nameEn : el.name,
          id: el.id,
          childs: el.childs,
        });
      });
      this.countyList.value = countyListVal;
      return countyListVal;
    },
    /**
     * @function  点击改变选择中间内容选择
     * @param flag 传入的下标
     * @param id 选择的id
     * @param type 属于什么地区类型
     * @param val 当前选择区域的字符串
     */
    async changeMiddle({ flag, id, type, val, callback = () => {} }) {
      this.isProvinceList = false;
      switch (type) {
        case "state":
          this.judgeTabType(val);
          this.restoreData("state", 1, id, val);
          id === "1" ? (this.specialTag = true) : (this.specialTag = false); // 特殊标记。当省份选择为北京，重庆，天津，上海直辖市使用
          // 当选择为印度.澳门.法国直接显示填写详细地址和选中标签--默认如果有下一级时不选中标签的
          if (
            id === this.countryId.India ||
            id === this.countryId.Aomen ||
            id === this.countryId.France
          ) {
            this.isWrite = true;
            this.newFlag = flag;
            return;
          }
          await this.getNewData(id, type, flag);
          this.screenProvince(flag);
          this.isProvinceList = true;
          this.provinceList.value.forEach((el, elIndex) => {
            el.indexActive = 999;
          }); // 第二次选择时，取消之前选的省份
          callback();
          break;
        case "city":
          if (this.tabArr.length > 2) {
            await this.getNewData(id, type, flag);
          }
          this.restoreData("city", 3, id, val);
          if (this.limit > 2 && this.tabArr.length > 2) {
            this.screenCounty(flag);
          }
          // 判断如果有子数组并且上边tab栏有下一级时才替换数组
          if (this.countyList.value.length > 0 && this.tabArr.length > 2) {
            this.isWrite = false;
            this.newArr = this.countyList;
          } else {
            // 特殊处理（如果没有数据且又大于2说明会出现多余的tab）
            if (this.tabArr.length > 2) {
              this.areaArr.pop();
              this.areaFlag = 2;
            }
            // 如果不符合直接选中
            this.newFlag = flag;
          }
          callback();
          break;
        case "county":
          this.areaArr[3].value = val; // tab栏默认值变成上级选择的字符串
          this.objId.countyId = id;
          this.homeAddressFormat.countyArea = val;
          this.isWrite = true;
          callback();
          this.newFlag = flag;
          break;
      }
    },
    /**
     * @function  点击改变选择省份/洲内容选择
     * @param index 当前外层数组下标
     * @param flag 传入的内层下标
     * @param id 传入的id
     * @param val 传入的当前选择的数组
     */
    async changeProvince({ index, flag, id, val, callback = () => {} }) {
      this.provinceList.value.forEach((el, elIndex) => {
        el.indexActive = 999;
        if (index === elIndex) {
          el.indexActive = flag;
        }
      });
      // 限制只能选到省份
      if (this.limit === 1) {
        this.restoreData("province", 2, id, val);
        this.isWrite = true;
        return;
      }
      // 省份的选择。
      // 特殊标记(中国才有)。当选中为直辖市时。tab栏变换。
      // 处理默认进来未点击的情况
      if (this.stateId === 1) {
        // 中国的特殊标记。有特殊处理
        this.specialTag = true;
      }
      if (this.specialTag) {
        switch (id) {
          //北京241, 重庆262,上海249,天津242,香港273,澳门274,台湾272
          case "241":
          case "262":
          case "249":
          case "242":
            this.tabArr = ["省份", "县区"];
            break;
          case "273":
            this.tabArr = ["省份", "县/区"];
            break;
          case "274":
            this.tabArr = ["省份"];
            break;
          case "272":
            this.tabArr = ["省份", "市/县", "区/乡"];
            break;
          default:
            this.tabArr = ["省份", "城市", "县区"];
            break;
        }
      }
      await this.getNewData(id, "province", flag, index);
      this.restoreData("province", 2, id, val);
      if (val.includes("市") && this.limit < 3) {
        this.isWrite = true; // 可写
        return false;
      }
      this.screenCity(index, flag);
      // 判断如果有子数组并且上边tab栏有下一级时才替换数组
      if (this.cityList.value.length > 0 && this.tabArr.length >= 2) {
        this.newArr = this.cityList;
        this.isProvinceList = false;
      } else {
        this.areaFlag = 1; // tab栏的不切换
        this.areaArr.splice(2); // 剪切数组
        this.isWrite = true; // 可写
      }
      callback();
    },
    // 中国大陆正则判断是否属于某个范围
    judgeLetter(letter) {
      if (/[A-G]/.test(letter)) {
        return 0;
      } else if (/[H-I]/.test(letter)) {
        return 1;
      } else if (/[J-L]/.test(letter)) {
        return 2;
      } else if (/[M-Q]/.test(letter)) {
        return 3;
      } else if (/[S-T]/.test(letter)) {
        return 4;
      } else if (/[W-Z]/.test(letter)) {
        return 5;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./chooseDistrict.scss";
</style>
