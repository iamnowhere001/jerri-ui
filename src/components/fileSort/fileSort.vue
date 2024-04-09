/****************************************************************************

所属系统: 组件库
所属模块: 文件排序
创建时间: 2020-01-02

***************************************************************************/

<template>
  <jr-message-box :value="showFileSort"
                  :title="title"
                  width="1005px"
                  maxHeight="auto"
                  :isDefine="true"
                  @onClose="sortCancel">
    <div class="content-box">
      <draggable class="img-box-wrap"
                 v-model="sortFiles"
                 :options="{animation:1000}">
        <div v-for="(item,i) in sortFiles"
             :title="showName?'':item[nameKey]"
             :key="i"
             @dragstart="dragstart(i)"
             @dragend="($event) =>{
                 dragIndex = '';
                }"
             :class="{'is-draging': dragIndex === i}"
             class="img-box">
          <div class="shadow"
               :class="{'has-name':showName}"
               v-show="dragIndex === i"></div>
          <i><span>{{i+1}}</span></i>
          <img :src="transView(item[fileUrlKey])">
          <div v-show="item[fileUrlKey].includes('.mp4') || item[fileUrlKey].includes('.flv')"
               class="video-mask">
          </div>
          <div v-if="showName"
               class="j-ellip show-name"
               v-title>
            <span>{{item[nameKey]}}</span>
          </div>
        </div>
      </draggable>
    </div>
    <div class="j-btn-group">
      <div>
        <jr-button size="normal"
                   @click="sortOk"
                   normal>{{$t('common_确定')}}</jr-button>
      </div>
    </div>

  </jr-message-box>
</template>
<script>
// 拖拽组件
import draggable from "vuedraggable";
// 多语言转换方法
import { translate } from "../../assets/constants/lang";
export default {
  name: "JrFileSort",
  components: {
    draggable
  },
  props: {
    //拖拽的文件
    files: {
      default: () => {
        return [];
      }
    },
    //  标题
    title: {
      type: String,
      default: translate("fileSort_文件排序")
    },
    // 文件标志键值
    fileKey: {},
    //标志键值下标  第几个
    indexKey: {},
    //url key值
    fileUrlKey: {
      default: "fileAddress"
    },
    //title现实的文件名键值
    nameKey: {
      default: "newFileName"
    },
    //是否存储于阿里云
    isOss: {
      default: true
    },
    // 是否显示文件排序
    showFileSort: {
      type: Boolean,
      default: false
    },
    // 是否显示文件名称
    showName: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dragIndex: "",
      //展示的文件
      sortFiles: []
    };
  },
  watch: {
    files: {
      handler(files) {
        this.sortFiles = this.$utils.deepCopy(files);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    dragstart(i) {
      setTimeout(() => {
        this.dragIndex = i;
      }, 0);
    },
    /**
     * @desc 取消回调
     * @author 林逸豪
     * @date 2019年7月15日
     */
    sortCancel() {
      this.$emit("close");
      this.$emit("update:showFileSort", false);
    },
    /**
     * @desc 选择完毕 确定回调
     * @author 林逸豪
     * @date 2019年7月15日
     */
    sortOk() {
      let data = {
        index: this.indexKey,
        fileKey: this.fileKey,
        files: this.sortFiles
      };
      this.$emit("sortOk", data);
      this.$emit("update:showFileSort", false);
    },
    /**
     * @desc 控制文件的显示
     * @param {String} 文件地址
     * @return {String} 文件显示
     * @author 林逸豪
     * @date2019年7月15日
     */
    transView(url) {
      if (!url) return require("../../assets/images/fileSort/i_video_work.png");
      // 文件后缀
      let fileSuffix = url.substring(url.lastIndexOf(".") + 1);
      switch (fileSuffix.toLowerCase()) {
        // ai
        case "ai":
          return require("../../assets/images/uploadFile/i_ai_big.png");
        // id
        case "id":
          return require("../../assets/images/uploadFile/i_id_big.png");
        // cdr
        case "cdr":
          return require("../../assets/images/uploadFile/i_cdr_big.png");
        // 图片格式
        case "jpg":
        case "png":
        case "jpeg":
        case "gif":
          return this.isOss ? `${url}?x-oss-process=image/resize,w_300` : url;
        // 视频格式
        case "mp4":
        case "flv":
          // 判断是不是文件服务器上的正则（文件服务器规则:url上有xxxx/xx/xx   （年月日））
          // 不是则加载oss视频第一帧
          return !this.isOss || /\d{4}\/\d{2}\/\d{2}/.test(url)
            ? require("../../assets/images/fileSort/i_video_work.png")
            : url +
                "?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_7000,f_jpg,w_0,h_0,m_fast";
        //音频格式
        case "mp3":
          return require("../../assets/images/uploadFile/i_voice_big.png");
        case "psd":
          return require("../../assets/images/uploadFile/i_psd_big.png");
        //  压缩包
        case "zip":
        case "rar":
        case "7z":
          return require("../../assets/images/uploadFile/i_zip_big.png");
        case "pdf":
          return require("../../assets/images/uploadFile/i_pdf_big.png");
        //  ppt
        case "ppt":
        case "pptx":
          return require("../../assets/images/uploadFile/i_ppt_big.png");
        //  txt
        case "txt":
          return require("../../assets/images/uploadFile/i_txt_big.png");
        //  word
        case "doc":
        case "docx":
          return require("../../assets/images/uploadFile/i_doc_big.png");
        //  excel
        case "xls":
        case "xlsx":
          return require("../../assets/images/uploadFile/i_xls_big.png");
        default:
          return require("../../assets/images/uploadFile/i_unknow_big.png");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./fileSort.scss";
</style>
