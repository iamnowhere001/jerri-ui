<!--
/****************************************************************************
所属系统: 组件库
所属模块: 新文件上传组件
创建时间: 2020年06月30日 09:51:37
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div class="jr-upload-file-pro">
    <div
      v-if="showBatchDownload"
      class="jr-batch-download"
      @click="batchDownload"
    >
      批量下载（{{ upFiles.length }}）
    </div>
    <!-- 上排序文件开始 -->
    <ul v-if="upFiles.length" class="up-sort-files">
      <li
        v-for="(el, i) in upFiles"
        :key="i"
        :class="{ 'up-sort-item-err': el.isErr }"
      >
        <div class="up-sort-files-box">
          <img :src="$_fileImgType_getSrc(el.fileType, 'small')" />
          <span
            v-title
            class="jr-file-name j-ellip"
            :title="titleDesc(el)"
            @click="previewFile(el, false)"
            >{{ el.fileName }}.{{ el.fileType }}</span
          >

          <!-- 只读不显示 如果存在删除按钮插槽也不显示 -->
          <span
            v-if="!isRead && !$slots['file-del']"
            class="jr-file-del-icon"
            :title="$t('common_删除')"
            @click="delFile(el.md5)"
            ><i class="icon-close-picbig"></i
          ></span>
          <i
            v-show="showDownload"
            title="下载"
            class="j-icon icon-download j-ml-15"
            @click="downloadFile(el.url)"
          ></i>
          <span v-if="el.isErr" class="jr-upload-err-tips" @click="reUpload(el)"
            >上传失败</span
          >

          <!-- 文件名后面插槽 -->
          <slot name="file-name-after" :item="el" :index="i"></slot>
          <!-- 文件名后面插槽 -->

          <!-- 进度条 -->
          <div v-if="el.showPro && el.uploadProess < 1" class="progress-bar">
            <div
              class="progress-bar-in"
              :style="`width: ${el.uploadProess * 100}%`"
            ></div>
          </div>
          <!-- 进度条 -->
        </div>

        <!-- 文件后面插槽 -->
        <slot name="file-after" :item="el" :index="i"></slot>
        <!-- 文件后面插槽 -->

        <!-- 删除按钮插槽 -->
        <div
          v-if="$slots['file-del']"
          class="file-del"
          @click="delFile(el.md5)"
        >
          <!-- 文件后面插槽 -->
          <slot name="file-del"></slot>
          <!-- 文件后面插槽 -->
        </div>
        <!-- 删除按钮插槽 -->
      </li>
    </ul>
    <!-- 上排序文件结束 -->

    <!-- 下排序文件开始 -->
    <ul class="down-sort-files">
      <!-- 所有文件排上面下面的文件就隐藏 -->
      <template v-if="!allFilesUpSort">
        <li
          v-for="(el, i) in downFiles"
          :key="i"
          :style="boxSize"
          :class="{ 'last-bank': isLastBank(i + 1) }"
          @click="previewFile(el)"
        >
          <!-- 上传完成开始 -->
          <div class="j-img-box j-center" :title="titleDesc(el)">
            <img
              class="j-auto-img"
              :src="showImg(el)"
              @error="moveErrorImg($event, videoArr.includes(el.fileType), el)"
            />
            <span
              v-show="!isRead"
              class="jr-file-del-icon"
              :title="$t('common_删除')"
              @click.stop="delFile(el.md5)"
              ><i class="icon-close-picbig"></i
            ></span>
          </div>
          <!-- 上传完成结束 -->

          <!-- 视频上传完成遮罩开始 -->
          <div
            v-if="videoArr.includes(el.fileType) && el.uploadProess === 1"
            class="j-video-mask"
            :title="$t('uploadFile_点击播放')"
          >
            <i class="icon-play-wes2"></i>
          </div>
          <!-- 视频上传完成遮罩结束-->

          <!-- 进度组件开始 -->
          <jr-progress-sector v-if="el.showPro" :progress="el.uploadProess">
          </jr-progress-sector>
          <!-- 进度组件结束 -->

          <!-- 上传失败提示开始 -->
          <div v-if="el.isErr" class="jr-upload-err" @click="reUpload(el)">
            <span class="jr-upload-err-tips">上传失败</span>
          </div>
          <!-- 上传失败提示结束 -->
        </li>
      </template>
      <!-- 所有文件排上面下面的文件就隐藏 -->

      <!-- 上传按钮开始 -->
      <li
        v-if="showUploadBtn"
        class="jr-input-btn"
        @click="selectFile"
        :style="boxSize"
      >
        <i class="icon-upload"></i>
      </li>
      <!-- 上传按钮结束 -->
    </ul>
    <!-- 下排序文件结束 -->

    <!-- 上传组件结束 -->
    <jr-upload
      v-bind="$attrs"
      :maxLen="maxLen"
      :delMd5="delMd5"
      :isLoading="false"
      :reUploadId="reUploadId"
      ref="upload"
      @add-file="getFile"
      @file-progress="getProgress"
      @upload-err="uploadError"
      @file-result="getResult"
    />
    <!-- 上传组件结束 -->

    <!-- 文件预览组件开始 -->
    <jr-file-preview
      v-bind="$attrs"
      :visible.sync="preVisible"
      :showIcon="preShowIcon"
      :fileList="previewfiles"
      :fileIndex="preFileIndex"
      @del-file="delPreviewFile"
      ref="preview"
    ></jr-file-preview>
    <!-- 文件预览组件结束 -->
  </div>
</template>
<script>
// 文件上传混入
import uploadFileMixin from "../../mixins/uploadFile";
export default {
  name: "JrUploadFilePro",
  components: {},
  mixins: [uploadFileMixin],
  props: {
    // 容器大小
    boxWidth: { type: Number, default: 66 },
    boxHeight: { type: Number, default: 66 },
    // 所有文件排上面
    allFilesUpSort: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    // 下排序文件
    downFiles() {
      return this.files.filter(({ fileType }) =>
        this.mediaFile.includes(fileType)
      );
    },
    // 上排序文件
    upFiles() {
      return this.allFilesUpSort
        ? // 如果所有东西都排上面 那就整个文件排上面不区分了
          this.files
        : this.files.filter(
            ({ fileType }) => !this.mediaFile.includes(fileType)
          );
    },
    // 显示下载
    showDownload() {
      return this.isDownload && this.isRead;
    },
    // 是否显示批量下载
    showBatchDownload() {
      return this.showDownload && this.upFiles.length > 1;
    },
    // 预览文件列表
    previewfiles() {
      return this.allFilesUpSort
        ? this.files
        : // 上到下排好序
          this.upFiles.concat(this.downFiles);
    },
    // 换行的最后一个
    isLastBank() {
      return (count) => count % this.bankCount === 0;
    },
  },
  methods: {
    /**
     * @desc 删除当前文件
     * @param {String} fileMd5 文件md5值
     * @author 陈宇奇
     * @date 2019年9月7日 15:46:06
     */
    delFile(fileMd5) {
      // 取消上传
      this.delMd5 = fileMd5;
      const index = this.files.findIndex(({ md5 }) => md5 === fileMd5);
      this.files.splice(index, 1);
      // 通知父组件
      this.$emit("get-files", this.files);
      //  在 delMd5 赋值upload.vue成功删除后，需要在下一循环将 delMd5 清空，防止重复选择文件后无法取消上传进度的缺陷
      this.$nextTick(() => {
        this.delMd5 = "";
      });
    },
    /**
     * @desc 点击预览文件
     * @param {Object} item 当前文件信息
     * @param {Boolean} isOpenPre 是否打开文件预览组件
     * @author 陈宇奇
     * @date 2020年2月26日 18:35:14
     */
    async previewFile(item, isOpenPre = true) {
      // 上传之前做啥事 等待了在继续走
      const beforePreviewRes = await this.beforePreviewFn(item);
      // 如果预览之前钩子返回false 直接不继续执行
      if (beforePreviewRes === false) {
        return;
      }

      // 嵌套在审批流中等待iframe全屏才做事
      this.isIframe &&
        (await this.$frame.openFramePull(this.$refs.preview.$el));

      // 上传完成才可以预览
      if (item.uploadProess === 1) {
        // 如果是所有文件排上面 那么图片和视频需要打开文件预览
        if (this.allFilesUpSort) {
          this.previewUpFiles(item);
        } else {
          // 正常预览
          isOpenPre
            ? // 打开文件预览
              this.openFilePreview(item.md5, this.previewfiles)
            : // 直接预览地址
              this.$_fileImgType_openUrl(item.url);
        }
        // 通知父组件
        this.$emit("preview-file", item);
      }
    },
    /**
     * @desc 预览上排序文件
     * @param {Object} item 当前项
     * @author 陈宇奇
     * @date 2020年09月10日 11:49:18
     */
    previewUpFiles(item) {
      const isImgOrViode = [...this.videoArr, ...this.imgArr].includes(
        item.fileType
      );
      // 视频图片需要打开预览组件
      isImgOrViode
        ? this.openFilePreview(item.md5)
        : this.$_fileImgType_openUrl(item.url);
    },
    /**
     * @desc 文件下载
     * @param {String} url 文件地址
     * @author 陈宇奇
     * @date 2020年06月30日 20:55:57
     */
    downloadFile(url) {
      const ele = document.createElement("a");
      ele.setAttribute("href", url);
      ele.setAttribute("download", "download");
      ele.click();
    },
    /**
     * @desc 批量下载
     * @author 陈宇奇
     * @date 2020年08月12日 17:36:05
     */
    batchDownload() {
      this.upFiles.forEach(({ url }) => {
        const elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "uploadFilePro.scss";
</style>
