/****************************************************************************

所属系统: 组件库
所属模块: html转pdf组件
创建时间: 2019年12月31日 10:33:42
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
<template>
  <div>
    <jr-upload accept=".pdf"
               v-bind="$attrs"
               ref="jrInput"
               @file-result="getResult">
    </jr-upload>
  </div>
</template>
<script>
// html 转 canvas 插件
import html2canvas from "html2canvas";
// 将图片转换成pdf
import jsPDF from "jspdf";
export default {
  name: "JrHtmlToPdf",
  inheritAttrs: false,
  components: {},
  mixins: [],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * @desc 上传完成通知父组件
     * @param {Object} res 文件信息
     * @author 陈宇奇
     * @date 2019年12月31日 16:16:56
     */
    getResult(res) {
      this.$emit("result", res);
    },
    /**
     * @desc 下载pdf
     * @param {DOM} ele dom元素
     * @param {String} pdfName pdf文件名
     * @param {Object} opts html2canvas配置项 覆盖默认值
     * @author 陈宇奇
     * @date 2019年12月31日 16:16:56
     */
    downloadPDF(ele, pdfName, opts = {}) {
      // 滚动条回到顶部 防止因为滚动条导致生成的图片偏移问题
      document.documentElement.scrollTop = 0;
      html2canvas(ele, {
        dpi: 300,
        scale: 1,
        logging: false,
        // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
        //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
        useCORS: true,
        ...opts
      }).then(canvas => {
        this.setPDFinfo(canvas, pdfName);
      });
    },
    /**
     * @desc 设置生成的PDF信息
     * @param {DOM} canvas html转换的canvas
     * @param {String} pdfName pdf文件名
     * @author 陈宇奇
     * @date 2019年12月31日 16:28:24
     */
    setPDFinfo(canvas, pdfName) {
      // a4纸的尺寸[595.28,841.89]
      const A4_WIDTH = 595.28,
        A4_HEIGHT = 841.89;
      // 画布宽度和高度
      let contentWidth = canvas.width,
        contentHeight = canvas.height,
        //一页pdf显示html页面生成的canvas高度;
        pageHeight = (contentWidth / A4_WIDTH) * A4_HEIGHT,
        //未生成pdf的html页面高度
        leftHeight = contentHeight,
        //页面偏移
        position = 0,
        //html页面生成的canvas在pdf中图片的宽高
        imgWidth = A4_WIDTH,
        imgHeight = (A4_WIDTH / contentWidth) * contentHeight,
        // 将canvas转换成base64
        pageData = canvas.toDataURL("image/jpeg", 1.0),
        // 声明jsPDF对象
        pdf = new jsPDF("", "pt", "a4");
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
        pdf.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
      } else {
        // 分页
        while (leftHeight > 0) {
          pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= A4_HEIGHT;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      // 直接下载pdf
      // pdf.save(`${pdfName}.pdf`);

      // 上传阿里
      let datauri = pdf.output("dataurlstring");
      // 去掉前面的字符串后，就是文件的加密字符串
      let random = Math.random()
        .toString(36)
        .substr(2);
      let files = this.$utils.dataURLtoFile(
        datauri,
        `${pdfName || random}.pdf`
      );
      this.$refs.jrInput.uploadFile(files);
    }
  }
};
</script>
<style scoped lang='scss'>
</style>
