
<template>
  <div class="content">
    <h2 class="j-mb-20">地区选择</h2>

      <jr-choose-district action='http://192.168.99.29:8200'
                          @success="success"
                          :selectAddress="addString"
                          :limit='2'
                          :address="address" />
  </div>
</template>

<script>
export default {
  name: "chooseDistrictView",
  label: "地区选择",
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
