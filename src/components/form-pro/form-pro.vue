<!--
/****************************************************************************

所属系统: 组件库
所属模块: 超级表单
创建时间: 2020年06月17日 10:37
***************************************************************************/
-->
<template>
  <jr-form v-bind="$attrs"
           :model="model"
           ref="form">
    <template v-for="(formPro, index) in formProList"
              v-if="formPro.vIf ? formPro.vIf() : true">
      <div v-if="formPro.slotRender" :key="formPro.key">
        <!-- 插槽 -->
        <slot :name="formPro.slotRender"
              v-bind="formPro.slotArgs"></slot>
        <!-- 插槽 -->
      </div>

      <!-- jsx渲染 -->
      <JSXDom v-else-if="formPro.jsxRender"
              :render="formPro.jsxRender"
              :key="formPro.key"></JSXDom>
      <!-- jsx渲染 -->

      <!-- 表单项渲染 -->
      <jr-form-Item-pro v-else
                        v-bind.sync="formPro"
                        v-model="model[formPro.prop]"
                        :ref="formPro.prop"
                        :key="formPro.key">
        <template v-if="formPro.cName && ['radio-group', 'checkbox-group'].includes(formPro.cName)">
          <component v-for="(component, i) in formPro.cGroupList"
                     :is="`jr-${formPro.cName.split('-').first}`"
                     :key="formPro.key + i"
                     :label="component.key">
            {{ component.value }}
          </component>
        </template>
      </jr-form-Item-pro>
      <!-- 表单项渲染 -->
    </template>
  </jr-form>
</template>
<script>
export default {
  name: "JrFormPro",
  props: {
    model: {
      type: Object,
      default() {
        return {};
      }
    },
    formProList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      //  表单项视图实例
      formProVms: []
    };
  },
  watch: {
    formProList: {
      immediate: true,
      deep: true,
      handler(arr) {
        arr.forEach((item, index) => {
          item.key = String(new Date().getTime()) + (item.prop || item.slotRender) + index;
        });
      }
    }
  },
  methods: {
    /**
     * @desc 校验表单
     */
    validate(cb) {
      return this.$refs.form.validate(cb);
    },
    /**
     * @desc 重置表单
     */
    resetForm() {
      return this.$refs.form.resetForm();
    },
    /**
     * @desc 移除表单校验项
     */
    clearValidate() {
      return this.$refs.form.clearValidate();
    }
  }
};
</script>
