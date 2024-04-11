/****************************************************************************

所属系统: 组件库
所属模块: html转图片模块


***************************************************************************/

<template>
  <div class="htmlImg">
    <jr-upload accept=".png,.jpg,.jpeg"
               :business-code="businessCode"
               :action="actionUrl"
               ref="jrInput"
               @file-result="getResult">
    </jr-upload>
  </div>
</template>


<script>
// html 转 canvas 插件
import html2canvas from "html2canvas";

export default {
  name: "JrHtmlToImg",
  props: {
    // 上传地址
    actionUrl: {
      default: "",
      type: String
    },
    // 系统编号
    businessCode: {
      default: "NS2",
      type: String
    }
  },
  methods: {
    /**
     * @desc dom节点转成图片
     * @param {Object} dom 要生成的dom节点
     * @param {String} pdfName pdf文件名
     * @param {Object} opts html2canvas配置项 覆盖默认值
     * @author 陈泽光
     * @date 2019年12月30日11:35:19
     */
    domToImg(dom, name, opts = {}) {
      html2canvas(dom, {
        scale: 1,
        useCORS: true,
        logging: false,
        ...opts
      }).then(canvas => {
        let pageData = canvas.toDataURL("image/jpg");
        let random = Math.random()
          .toString(36)
          .substr(2);

        // base64转文件
        let files = this.$utils.dataURLtoFile(
          pageData,
          `${name || random}.jpg`
        );

        this.$refs.jrInput.uploadFile(files);
      });
    },
    getResult(res) {
      this.$emit("result", res);
    }
  }
};
</script>
