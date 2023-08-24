/****************************************************************************

所属系统: 组件库
所属模块: 操场 - 地区选择组件
创建时间: 2020年3月10日10:50:28
维护人: 陈泽光
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　         　　　　　　　　　　 │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/

<template>
  <div class="content">
    <h2 class="j-mb-20">地区选择组件</h2>

    <div class="left">
      <jr-choose-district action='http://192.168.99.29:8200'
                          @success="success"
                          :selectAddress="addString"
                          :limit='2'
                          :address="address" />
    </div>

  </div>
</template>

<script>
export default {
  name: "chooseDistrictView",
  label: "地区选择操场",
  data() {
    return {
      //  默认需要显示的地址
      address: {
        //国家ID
        state: "中国",
        //省份ID
        province: "广东省",
        //城市ID --特殊地区国家可不传
        city: "",
        // 区级ID --特殊地区国家可不传
        countyArea: "",
        // 详细地址
        address: ""
      },
      // 完整的地址
      addString: "中国广东省"
    };
  },
  methods: {
    success(res) {
      console.log("res: ", res);
      // 默认需要显示的地址
      this.address = res.homeAddressFormat;
      // 完整的地址
      this.addString = res.addressString;
    }
  }
};
</script>
