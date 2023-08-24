/****************************************************************************

所属系统: 组件库
所属模块: 表单项
创建时间: 2020-01-02
维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div class="jr-form clearfix">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "JrForm",
  componentName: "JrForm",
  props: {
    // 统一的校验规则对象
    rules: {
      type: Object
    },
    // 待校验的对象
    model: {
      type: Object
    },
    // 引导文字所在区域的宽度
    labelWidth: {
      type: String,
      default: "62px"
    },
    // 引导文字出现的位置
    labelPositon: {
      type: String,
      default: "justify"
    },
    // 校验提示语是否需要警示图标
    messageIcon: {
      type: Boolean,
      default: true
    }
  },
  // 将当前实例注入所有子孙组件
  provide() {
    return {
      form: this
    };
  },
  data() {
    return {
      fields: []
    };
  },
  created() {
    // 监听需要增加校验的事件
    this.$on("form-add", field => {
      if (field) this.fields.push(field);
    });
    // 监听需要移除校验的事件
    this.$on("form-remove", field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  mounted() {},
  methods: {
    /**
     * @desc 重置表单
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    resetFields() {
      this.resetForm();
      this.$nextTick(() => {
        this.resetForm();
      });
    },

    /**
     * @desc 重置表单
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    resetForm() {
      this.fields.forEach(field => field.resetField());
    },

    /**
     * @desc 移除表单校验项
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    clearValidate() {
      this.fields.forEach(field => field.clearValidate());
    },

    /**
     * @desc 校验表单
     * @author ZhengKai
     * @date 2019-08-10 16:51:58
     */
    validate(cb) {
      let valid = true;
      this.fields.forEach(field => {
        field.validate("", error => {
          error && (valid = false);
        });
      });
      typeof cb === "function" && cb(valid);
    }
  }
};
</script>

<style scoped></style>
