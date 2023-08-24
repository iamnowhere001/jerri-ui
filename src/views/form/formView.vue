/****************************************************************************

所属系统: 表单操场
所属模块: 模块—[子模块]
创建时间: 2020年3月11日 10:26:40
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div>
    <div class="j-pt-30 j-pl-30">
      <h2 class="j-pb-20">表单操场</h2>
      <jr-form class="form"
               :model="lol"
               ref="form"
               :rules="rules">
        <!-- 输入框 -->
        <jr-form-item label="老师"
                      ref="lolName"
                      prop="name">
          <jr-input v-model="lol.name"></jr-input>
        </jr-form-item>

        <jr-form-item label="年龄"
                      prop="age">
          <jr-input v-model="lol.age"
                    placeholder="非必填项"></jr-input>
        </jr-form-item>

        <jr-form-item label="年龄"
                      prop="age">
          <jr-input v-model="lol.age"
                    placeholder="非必填项"
                    type="textarea"></jr-input>
        </jr-form-item>
        <!-- 复选框 -->
        <jr-form-item label="选择英雄"
                      ref="hero"
                      left="390px"
                      prop="checkboxVal">
          <jr-checkbox-group v-model="lol.checkboxVal">
            <jr-checkbox label="提莫">提莫</jr-checkbox>
            <jr-checkbox label="李青老师">李青老师</jr-checkbox>
            <jr-checkbox label="库奇老师"
                         disabled>库奇老师</jr-checkbox>
            <jr-checkbox label="ys">亚索</jr-checkbox>
          </jr-checkbox-group>
        </jr-form-item>
        <!-- 单选框 -->
        <jr-form-item label="选择路线"
                      left="250px"
                      prop="radioVal">
          <jr-radio-group v-model="lol.radioVal">
            <jr-radio :label="item.value"
                      v-for="(item, index) in list"
                      :key="index">{{ item.label }}</jr-radio>
          </jr-radio-group>
        </jr-form-item>
        <!-- 下拉选择器 -->
        <jr-form-item label="选择皮肤"
                      prop="skin">
          <div class="skin">
            <jr-select :items="options"
                       v-model="lol.skin"></jr-select>
          </div>
        </jr-form-item>
        <!-- 日期选择器 -->
        <jr-form-item label="选择日期"
                      prop="currentDate">
          <jr-date-picker v-model="lol.currentDate"></jr-date-picker>
        </jr-form-item>
        <jr-form-item class="last-item"
                      label="上传文件"
                      :prop="lol.url?'':'url'"
                      top="135px"
                      left="160px">
          <jr-upload-file accept=".xls,.docx,.txt,.pdf,.png,.mp4,.psd,.ptt,.rar,.jpg"
                          businessCode="NS2"
                          :maxLen="1"
                          :maxSize="200"
                          :readFiles="readFiles"
                          :action="'//192.168.99.29:8200/'"
                          @get-files="getFiles"></jr-upload-file>
        </jr-form-item>
        <div class="j-btn-group">
          <jr-button size="normal"
                     @click="handleSubmit('form')">提交</jr-button>
          <jr-button size="normal"
                     type="plain"
                     @click="handleReset('form')">重置</jr-button>
          <jr-button size="normal"
                     type="plain"
                     @click="handleClear('form')">移除</jr-button>
        </div>
      </jr-form>
      <div class="j-center j-pt-30">
        <jr-button @click="goBottom">校验失败的情况下点击滚到底部看看</jr-button>
      </div>
      <div style="height: 800px"></div>
      <div id="bottom"></div>
      <div class="j-center j-pb-30">
        <jr-button @click="goWarn()">点击定位第一个校验错误位置</jr-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "formView",
  label: "表单组件操场",
  components: {},
  mixins: [],
  data() {
    // 自定义校验规则(建议在单独js中统一管理)
    var mustBeNmuber = (rule, value, callback) => {
      if (value.length > 5) {
        return callback(new Error("名字不是越长越牛逼"));
      }
      callback();
    };
    return {
      readFiles: [],
      list: [
        { label: "上路", value: "top" },
        { label: "中路", value: "middle" },
        { label: "下路", value: "bottom" }
      ],
      options: ["限定", "史诗", "传说", "限定1"],
      lol: {
        name: "",
        age: "",
        checkboxVal: [],
        radioVal: "",
        currentDate: "",
        skin: "",
        url: ""
      },
      rules: {
        // 输入框的校验
        name: [
          { required: true, message: "请输入老师姓名", trigger: "blur" },
          { min: 2, message: "最少2个字符", trigger: "blur" },
          { validator: mustBeNmuber, trigger: "blur" }
        ],
        // 复选框的校验
        checkboxVal: [
          {
            required: true,
            type: "array",
            message: "至少选择一个英雄",
            trigger: "change"
          }
        ],
        // 单选框的校验
        radioVal: [
          { required: true, message: "选择一条战线", trigger: "change" }
        ],
        // 下拉选择器的校验
        skin: [{ required: true, message: "选择一款皮肤", trigger: "change" }],
        // 日期的校验
        currentDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        url: [{ required: true, message: "请上传文件", trigger: "change" }]
      }
    };
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("ok", this.lol);
        } else {
          console.log("faild");
        }
      });
    },
    handleReset(formName) {
      this.$refs[formName].resetFields();
      this.lol.url = "";
      this.readFiles = [];
    },
    handleClear(formName) {
      this.$refs[formName].clearValidate();
    },
    getFiles(files) {
      this.lol.url = files[0].url;
    },
    goBottom() {
      this.$utils.jump("#bottom");
    },
    goWarn() {
      // this.$utils.arriveDom(".message.visible", 0);
      this.$utils.jump(".message.visible", {
        animate: false,
        distanceTop: 0
        // container: ".container"
      });
      // 第一个警告提示的dom
      // let firstWar = document.querySelector(".message.visible");
      // if (firstWar) {
      //   // 让滚动条滚动到对应警告提示处
      //   document.documentElement.scrollTop =
      //     firstWar.getBoundingClientRect().top +
      //     document.documentElement.scrollTop -
      //     distance;
      // }
    }
  }
};
</script>
<style scoped lang='scss'>
@import "./form.scss";
/deep/ .jr-form {
  .last-item {
    margin-bottom: 0;
  }
}
</style>
