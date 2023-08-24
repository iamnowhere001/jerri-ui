<!--
/****************************************************************************

所属系统: 组件库
所属模块: 超级表单——超级表单项
创建时间: 2020年06月17日 10:37
维护人: 杨文杰

input 输入框
select  下拉
date-picker 日期选择
upload-file 文件上传
checkbox-group  单复选组

*┌──────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                              │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <jr-form-item v-bind="{...$attrs, ...msgPosition}"
                v-on="$listeners"
                :prop="prop"
                ref="formItem">
    <slot name="component">
      <!-- 文件上传 -->
      <template v-if="cName === 'upload-file'">
        <jr-upload-file accept="*"
                        businessCode="NS2"
                        v-bind="cBind"
                        v-on="cOn"
                        :readFiles="modelData"
                        @get-files="getFiles"
                        @on-uploading="onUploading"></jr-upload-file>
      </template>
      <!-- 文件上传 -->

      <!-- 基础通用组件 -->
      <template v-else>
        <component :is="`jr-${cName}`"
                   v-model="modelData"
                   v-bind="cBind"
                   v-on="cOn">
          <slot></slot>
        </component>
      </template>
      <!-- 基础通用组件 -->
    </slot>

  </jr-form-item>
</template>
<script>
export default {
  name: "JrFormItemPro",
  props: {
    value: {
      validator: function() {
        return true;
      }
    },
    prop: {
      type: String,
      default: ""
    },
    cName: {
      type: String,
      default: "input"
    },
    cBind: {
      type: Object,
      default() {
        return {};
      }
    },
    cOn: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      msgPosition: {},
      modelData: this.value
    };
  },
  computed: {
    //  表单组件实例
    formItemVm() {
      return this.$refs.formItem;
    },
    //  全部子组件
    components() {
      return this.formItemVm.$children;
    },
    //  最后一个组件
    lastComponent() {
      return this.formItemVm.$children.last;
    },
    $attrsMsgPosition() {
      const { left, top, right, bottom } = this.$attrs;
      return { left, top, right, bottom };
    }
  },
  watch: {
    modelData(val) {
      this.updateVal(val);
    },
    $attrsMsgPosition() {
      this.setMessagePosition();
    }
  },
  mounted() {
    //  设置消息提醒位置
    this.setMessagePosition();
    //  重载校验方法
    this.reloadValidate();
  },
  methods: {
    /**
     * @desc 设置消息位置
     */
    setMessagePosition() {
      //  组件名称
      const cName = this.cName;
      //  当前
      const $attrs = this.$attrs;
      //  传入坐标
      let { left, top, bottom, right } = $attrs;

      if (!["radio-group", "checkbox-group", "upload-file"].includes(cName)) {
        return;
      }

      //  一旦传入一项配置，不自动设置消息位置
      if (left || top || bottom || right) {
        return;
      }

      //  组件区域最后一个组件
      const $el = this.lastComponent.$el;
      //  提示消息高度
      const messageHeight = 23;
      //  边距大小
      const padding = 3;
      //  消息追随目标节点
      let targetNode = $el.lastChild;

      switch (cName) {
        case "radio-group":
        case "checkbox-group":
          {
            top = $el.offsetHeight - messageHeight - padding;
          }
          break;

        case "upload-file":
          {
            targetNode = this.lastComponent.$refs.draggableItem.$el.lastChild;
            top = targetNode.offsetHeight - messageHeight;
          }
          break;
      }

      this.msgPosition["left"] = `${targetNode.offsetLeft +
        targetNode.offsetWidth +
        padding}px`;
      this.msgPosition["top"] = `${top}px`;
      this.$forceUpdate();
    },
    /**
     * @desc 重载表单项组件的校验方法
     */
    reloadValidate() {
      const formItemVm = this.formItemVm;
      const originValidate = formItemVm.validate;

      formItemVm.validate = (...args) => {
        const cb = args[1];
        let error = false;
        originValidate("", err => {
          if (err) {
            error = true;
          }
        });

        //  上传组件时校验是否上传完成
        if (this.cName === "upload-file") {
          //  未上传完成时，是不存在表单数据的，需要清空表单提示校验项
          if (!this.isUploadComplete(this.lastComponent)) {
            error = true;
            formItemVm.resetField();
          }
        }

        if (this.$utils.isFunction(cb)) {
          cb(error);
        }
      };
    },
    /**
     * @desc 是否所有文件上传完毕
     * @param {VM} upload 文件夹上传组件
     * @param {String} msg 没上传完成的提示消息
     * @param {String} errMsg 存在上传失败的文件的提示消息
     * @return {Boolean} 是否上传完毕
     * @author 陈宇奇
     * @date 2019年11月14日 15:55:21
     */
    isUploadComplete(
      upload,
      msg = "请等待文件上传完成",
      errMsg = "文件上传失败,请重新上传"
    ) {
      let result = true;
      let tip = "";
      if (upload) {
        // 存在上传失败的情况
        if (upload.isExistErr) {
          result = false;
          tip = errMsg;
        }
        // 没上传完成的情况
        if (!upload.allComplete) {
          result = false;
          tip = msg;
        }
      }

      tip && this.$messageBox({ tip });
      return result;
    },
    /**
     * @desc 更新双向绑定值
     * @param { any } val 值
     */
    updateVal(val) {
      this.$emit("input", val);
      this.$nextTick(() => {
        const model = this.lastComponent.$options.model;
        //  双向绑定更新事件不为输入，需要再次手动校验规则是否符合
        if (model && model.event !== "input") {
          this.formItemVm.validate("");
        }
      });
    },
    /**
     * @desc 文件上传后回调
     * @param { any } val 值
     */
    getFiles(val) {
      this.formItemVm.resetField();
      this.updateVal(val);
      const getFiles = this.cOn["get-files"];
      //  如有自定义传入回调
      if (getFiles && this.$utils.isFunction(getFiles)) {
        getFiles(val);
      }
    },
    /**
     * @desc 文件开始上传
     */
    onUploading() {
      this.formItemVm.resetField();
      const onUploading = this.cOn["on-uploading"];
      //  如有自定义传入回调
      if (onUploading && this.$utils.isFunction(onUploading)) {
        onUploading(val);
      }
    }
  }
};
</script>
<style scoped lang="scss"></style>
