/****************************************************************************

所属系统: 组件库
所属模块: 表格文件上传组件


***************************************************************************/
<template>
  <div class="j-table-file-upload">

    <!-- 表格 -->
    <jr-table-pro :theadList="theadList"
                  :tbodyList="tbodyList"
                  :showBody='Boolean(tbodyList.length)'
                  additionCell='del'
                  @on-row-del='delelteData'>

      <!-- 文件名称 -->
      <template #fileName='{row}'>
        <div class="j-fileName-box"
             @click="changeEdit(row)">

          <!-- 图片和名称 -->
          <div class="j-img-box">
            <img class=" j-mr-10"
                 :src="judgeFile(row.row.fileType)"></img>
            <span class="j-ellip">{{row.row.fileName}}</span>
            <span class="gray-span">{{changeFileSize(row.row.fileSize) }}</span>
          </div>

          <!-- 进度条 -->
          <div class="j-table-progress"
               :style="{width:row.row.progress * 100 + '%'}"
               v-show='row.row.progress !== 1'></div>
        </div>
      </template>

      <!-- 状态 -->
      <template #status='{row:{row}}'>
        <div class="j-status-box">

          <!-- 成功和失败 -->
          <i class=" j-file-icon"
             :title="row.statusName ==='error' ? '重新上传':'上传成功'"
             :class="countIClass(row,true)"
             v-if="row.statusName ==='success' || row.statusName ==='error'"
             @click="reUpload(row)"></i>

          <!-- 等待上传和正在上传 -->
          <span :class="{'j-green':row.statusName ==='wait'}"
                v-else>
            {{countIClass(row,false)}}
          </span>
        </div>
      </template>
    </jr-table-pro>

    <!-- 新增按钮 -->
    <div class="j-upload-box j-pointer"
         @click="clickUpload"
         v-show="maxLen > tbodyList.length">

      <!-- 按钮组件 -->
      <jr-button slotText="+"
                 shape="circle"
                 size="normal"
                 type="plain" />
      <span>添加附件</span>
    </div>

    <!-- 上传 -->
    <jr-upload v-bind="$attrs"
               :accept="accept"
               :isMany="true"
               :maxLen="maxLen"
               :listNum="tbodyList.length"
               :re-upload-id='reUploadId'
               ref="jrInput"
               @add-file='getFile'
               @file-progress='getProgress'
               @upload-err="uploadError"
               @file-result="getResult">
    </jr-upload>
  </div>
</template>
<script>
export default {
  name: "JrTableFileUpload",
  inheritAttrs: false,
  model: {
    prop: "fileList",
    event: "change"
  },
  watch: {
    fileList: {
      handler: function (val) {
        if (JSON.stringify(this.tbodyList) !== JSON.stringify(val)) {
          this.tbodyList = this.$utils.deepCopy(val);
          this.countFileList();
        }
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    // 最大上传张数
    maxLen: {
      type: Number,
      default: 20
    },
    // 是否开启编辑附件名称功能
    isFileNameEdit: {
      type: Boolean,
      default: true
    },
    // fileName , fileType , fileMd5 ,fileAddress
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    let _this = this;
    return {
      // 表头
      theadList: [
        { label: "序号", props: "number", width: "10%" },
        {
          label: "附件名称",
          props: "fileName",
          cellEdit(row) {
            return row.tr.isEdit;
          },
          cellEditName: "input",
          cellEditAttr: {
            type: "input"
          },
          cellEditEvent(row) {
            return {
              blur() {
                row.tr.isEdit = false;
                _this.modelChange();
              }
            };
          },
          width: "75%"
        },
        { label: "状态", props: "status", width: "15%" }
      ],
      // 表格内容
      tbodyList: [],
      // 重新上传
      reUploadId: ""
    };
  },
  computed: {
    accept() {
      // 默认文件类型可以传所有
      return this.$attrs.accept || "*";
    }
  },
  methods: {
    /**
     * @desc 重新计算赋值--(为传入的显示的值赋值)
     * @author 叶志
     * @date 2020-3-24 10:23:13
     */
    countFileList() {
      this.tbodyList.forEach((element, index) => {
        element.number = `附件${index + 1}`;
        if (!element.hasOwnProperty("isEdit")) {
          element.isEdit = false;
          element.statusName = "success";
          element.progress = 1;
        }
      });
    },
    /**
     * @desc 改变附件名称的编辑状态
     * @param {Object} row
     * @author 叶志
     * @date 2020-3-18 16:05:24
     */
    changeEdit({ row }) {
      if (row.statusName !== "success" && this.isFileNameEdit) {
        return;
      }
      row.isEdit = true;
      this.$nextTick(() => {
        document.querySelector(".edit-cell-input .jr-input input").focus();
      });
    },
    /**
     * @desc 判断属于什么文件
     * @param {String} type
     * @author 叶志
     * @date 2020-3-18 16:00:55
     */
    judgeFile(type) {
      let flagName = "";
      switch (type) {
        case "pdf":
          flagName = "i_pdf_small";
          break;
        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
          flagName = "i_pic_small";
          break;
        case "ppt":
        case "pptx":
          flagName = "i_ppt_small";
          break;
        case "txt":
          flagName = "i_txt_small";
          break;
        case "mp3":
        case "wave":
          flagName = "i_voice_small";
          break;
        case "doc":
        case "docx":
          flagName = "i_doc_small";
          break;
        case "xlsx":
        case "xls":
          flagName = "i_xls_small";
          break;
        case "zip":
        case "rar":
          flagName = "i_zip_small";
          break;
        case "flv":
        case "mp4":
        case "mov":
        case "avi":
        case "mkv":
          flagName = "i_video_small";
          break;
        default:
          flagName = "i_unknow_small";
          break;
      }
      return require(`../../assets/images/small-file/${flagName}.png`);
    },
    /**
     * @desc 点击上传
     * @author 叶志
     * @date 2020-3-18 15:35:14
     */
    clickUpload() {
      this.reUploadId = "";
      this.$refs.jrInput.upload();
    },
    /**
     * @desc 重新上传
     * @param {Object} 当前点击的tr
     * @author 叶志
     * @date 2020-3-18 17:36:26
     */
    reUpload({ statusName, fileMd5 }) {
      statusName === "error" ? (this.reUploadId = fileMd5) : "";
    },
    /**
     * @desc 判断文件的MD5有没有重复
     * @param {String} md5
     * @author 叶志
     * @date 2020-3-18 16:58:08
     */
    judgeFileMd5(md5) {
      return Boolean(
        this.tbodyList.filter(element => element.fileMd5 === md5).length
      );
    },
    /**
     * @desc 获取本地文件
     * @author 叶志
     * @date 2020-3-18 10:13:39
     */
    getFile(val) {
      if (this.judgeFileMd5(val.md5)) {
        this.$msg("文件重复", 1000);
        return;
      }
      let newObj = {
        number: `附件${this.tbodyList.length + 1}`,
        fileAddress: window.URL.createObjectURL(val.file),
        fileName: val.fileName,
        progress: 0,
        fileMd5: val.md5,
        fileType: val.fileType,
        fileSize: val.fileSize,
        isEdit: false,
        // wait 等待上传,progress 正在上传，error 上传失败，success 上传成功
        statusName: "wait"
      };
      this.tbodyList.push(newObj);
      this.modelChange();
    },
    /**
     * @desc 获取进度
     * @author 叶志
     * @date 2020-3-18 10:13:39
     */
    getProgress(val) {
      this.tbodyList.forEach(element => {
        if (element.fileMd5 === val.md5) {
          element.progress = val.proess;
          element.statusName = "progress";
        }
      });
    },
    /**
     * @desc 失败上传
     * @author 叶志
     * @date 2020-3-18 10:13:39
     */
    uploadError(val) {
      this.tbodyList.forEach(element => {
        if (element.fileMd5 === val.md5) {
          element.progress = 1;
          element.statusName = "error";
          element.fileAddress = "";
        }
      });
      this.modelChange();
    },
    /**
     * @desc 获取结果
     * @author 叶志
     * @date 2020-3-18 10:13:39
     */
    getResult(val) {
      this.tbodyList.forEach(element => {
        if (element.fileMd5 === val.fileMd5) {
          element.fileAddress = val.fileUrl;
          element.progress = 1;
          element.statusName = "success";
        }
      });
      this.modelChange();
    },
    /**
     * @desc 重新计算number值
     * @author 叶志
     * @date 2020-4-25 15:24:45
     */
    reCountNumber() {
      this.tbodyList.forEach((ele, index) => {
        ele.number = `附件${index + 1}`;
      });
    },
    /**
     * @desc 删除某一行
     * @author 叶志
     * @date 2020-3-28 15:13:42
     */
    delelteData(tr, trIndex) {
      this.tbodyList.splice(trIndex, 1);
      this.reCountNumber();
      this.$emit("delete", { tr, trIndex });
    },
    /**
     * @desc 计算成功或者失败的I标签
     * @param {Object} 当前改变的表格列
     * @param {Boolean} 等待上传和正在上传还是成功或者失败
     * @author 叶志
     * @date 2020-3-24 09:42:42
     */
    countIClass(row, bol) {
      let classObj = {
        "icon-right-warning": row.statusName === "success",
        "icon-save-warning": row.statusName === "error"
      };
      let returnData =
        row.statusName === "wait"
          ? "等待上传"
          : Math.floor(row.progress * 100) + "%";
      return bol ? classObj : returnData;
    },
    /**
    * @desc 转换文件大小变成MB
    * @author 叶志
    * @date 2020年08月28日 09:10:17
    */
    changeFileSize(fileSize) {
      let mbSize = ((fileSize / 1024).toFixed(2) / 1024).toFixed(2);
      let kbSize = ((fileSize / 1024).toFixed(2));
      return 0 >= mbSize ? `${kbSize}K` : `${mbSize}M`;
    },
    /**
     * @desc 改变v-model的值
     * @author 叶志
     * @date 2020-3-19 17:49:48
     */
    modelChange() {
      this.$emit("change", this.tbodyList);
    }
  }
};
</script>
<style scoped lang='scss'>
@import "./tableFileUpload.scss";
</style>
