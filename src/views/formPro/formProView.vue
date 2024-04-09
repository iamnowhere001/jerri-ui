
<template>
  <div class="j-pt-30 j-pl-30">
    <h2 class="j-pb-20">超级表单组件</h2>
    <p>
      <jr-button class="j-mb-30"
                 @click="allFormPro = !allFormPro">切换</jr-button>

      <span>
        {{ allFormPro
          ? "目前为完全的super士兵船坞系统"
          : "目前为单独的super士兵船坞" }}
      </span>
      <span style="color: #ccc">（不同类型的界面外观完全一样，只是在代码编写上不同）</span>

    </p>

    <template v-if="!allFormPro">
      <jr-form ref="form"
               :model="formData"
               :rules="rules">
        <jr-form-Item-pro label="学生姓名"
                          prop="name"
                          v-model="formData['name']" />

        <jr-form-Item-pro label="年龄"
                          prop="age"
                          v-model="formData['age']" />

        <jr-form-Item-pro label="选择等级"
                          prop="level"
                          v-model="formData['level']"
                          cName="select"
                          :cBind="{
                            items: [1, 2, 3]
                          }" />

        <jr-form-Item-pro label="选择英雄"
                          prop="hero"
                          v-model="formData['hero']"
                          cName="checkbox-group">
          <jr-checkbox label="提莫">提莫</jr-checkbox>
          <jr-checkbox label="李青老师">李青老师</jr-checkbox>
          <jr-checkbox label="库奇老师"
                       disabled>库奇老师</jr-checkbox>
          <jr-checkbox label="ys">亚索</jr-checkbox>
        </jr-form-Item-pro>

        <jr-form-Item-pro label="选择路线"
                          prop="line"
                          v-model="formData['line']"
                          cName="radio-group">
          <jr-radio label="上">上</jr-radio>
          <jr-radio label="中">中</jr-radio>
          <jr-radio label="下">下</jr-radio>
        </jr-form-Item-pro>

        <jr-form-Item-pro label="生日"
                          prop="birthday"
                          v-model="formData['birthday']"
                          cName="date-picker"></jr-form-Item-pro>

        <jr-form-Item-pro label="上传文件"
                          prop="file"
                          cName="upload-file"
                          v-model="formData['file']"
                          ref="file"
                          :cBind="{
            businessCode: 'NS2',
            action: '//192.168.99.29:8200/'
          }" />
      </jr-form>
    </template>

    <template v-else>
      <jr-form-pro ref="form"
                   :model="formData"
                   :rules="rules"
                   :formProList="formProList">
        <template #hero>
          <jr-form-Item-pro label="选择英雄"
                            prop="hero"
                            v-model="formData['hero']"
                            cName="checkbox-group">
            <jr-checkbox label="提莫">提莫</jr-checkbox>
            <jr-checkbox label="李青老师">李青老师</jr-checkbox>
            <jr-checkbox label="库奇老师"
                         disabled>库奇老师</jr-checkbox>
            <jr-checkbox label="ys">亚索</jr-checkbox>
          </jr-form-Item-pro>
        </template>

      </jr-form-pro>
    </template>
    <jr-button @click="validateForm">提交</jr-button>
  </div>
</template>
<script>
export default {
  name: "formProView",
  label: "超级表单",
  mixins: [],
  data() {
    return {
      //  是否使用超级的士兵船坞系统
      allFormPro: true,
      //  超级的士兵船坞系统配置列表
      formProList: [
        {
          label: "学生姓名",
          prop: "name"
        },
        {
          label: "年龄",
          prop: "age"
        },
        {
          label: "选择等级",
          prop: "level",
          cName: "select",
          cBind: { items: [1, 2, 3] }
        },
        {
          label: "选择英雄",
          prop: "hero",
          slotRender: true
        },
        {
          label: "选择路线",
          prop: "line",
          cName: "radio-group",
          cGroupList: [
            { key: "上", value: "上" },
            { key: "中", value: "中" },
            { key: "下", value: "下" }
          ]
        },
        {
          label: "生日",
          prop: "birthday",
          cName: "date-picker"
        },
        {
          label: "上传文件",
          prop: "file",
          cName: "upload-file",
          cBind: {
            businessCode: "NS2",
            action: "//192.168.99.29:8200/"
          }
        }
      ],
      //  表单数据
      formData: {
        hero: [],
        line: [],
        file: []
      },
      //  表单规则
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        age: [{ required: true, message: "请输入", trigger: "blur" }],
        level: [
          {
            required: true,
            message: "选择一款皮肤",
            trigger: "change",
            type: "number"
          }
        ],
        hero: [
          {
            required: true,
            type: "array",
            message: "至少选择一个英雄",
            trigger: "change"
          }
        ],
        line: [{ required: true, message: "选择一条战线", trigger: "change" }],
        birthday: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        file: [
          {
            required: true,
            message: "请上传文件",
            trigger: "change",
            type: "array"
          }
        ]
      }
    };
  },
  mounted() {
    window.fuck = this.formData;
  },
  methods: {
    validateForm() {
      this.$refs.form.validate(valid => {
        console.info(valid);
      });
    }
  }
};
</script>
<style scoped lang="scss"></style>
