<!--
/****************************************************************************
所属系统: 组件库
所属模块: 上传文件组件
创建时间: 2019年9月9日 16:44:01
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div class="upload-file">
    <ul class="jr-file-item">
      <!-- 排序组件 -->
      <draggable
        class="draggable-box-wrap"
        element="ul"
        :list="files"
        @change="$emit('get-files', files)"
        :options="{
          animation: 1000,
          draggable: '.draggable-item',
          disabled: disabledSort || files.length === 1,
        }"
      >
        <!-- 上传按钮 -->
        <li
          v-show="showUploadBtn"
          :slot="isReverse ? 'footer' : 'header'"
          class="jr-upload"
          :style="boxSize"
          :class="{ 'not-file-name': !showName }"
          @click="selectFile"
        >
          <slot>
            <jr-button slotText="+" shape="circle" size="normal" type="plain" />
            <span>{{ uploadWord }}</span>
            <span class="upload-desc" v-if="uploadDesc">{{ uploadDesc }}</span>
            <slot name="uploadDesc"></slot>
          </slot>
        </li>

        <li
          v-for="(el, i) in files"
          class="draggable-item"
          :key="i"
          @dragstart="dragstart(i)"
          @dragend="dragIndex = null"
          :class="{
            'not-file-name': !showName,
            'is-draging': dragIndex === i,
            'last-bank': isLastBank(i + 1),
          }"
          :style="boxSize"
        >
          <!-- 拖拽的时候遮罩 -->
          <div
            class="shadow"
            :class="{ 'has-name': showName }"
            v-show="dragIndex === i"
          ></div>
          <div
            class="jr-file"
            :class="[{ 'j-pointer': isPreview }]"
            :title="isPreview ? titleDesc(el) : ''"
            :style="boxSize"
            @click="previewFile(el)"
          >
            <!-- 文件类型区别 -->
            <img
              :key="el.fileType"
              :src="showImg(el)"
              @error="moveErrorImg($event, videoArr.includes(el.fileType), el)"
            />

            <!-- 视频上传完毕需要有遮罩 -->
            <template
              v-if="videoArr.includes(el.fileType) && el.uploadProess === 1"
            >
              <div class="j-video-mask" :title="$t('uploadFile_点击播放')">
                <i class="icon-play-wes2"></i>
              </div>
            </template>

            <!-- 进度组件 -->
            <jr-progress-sector v-if="el.showPro" :progress="el.uploadProess">
              <div :style="boxSize"></div>
            </jr-progress-sector>

            <div
              class="jr-upload-err"
              @click.stop="reUpload(el)"
              v-if="el.isErr"
            >
              <p>
                <i class="icon-warning-big"></i
                >{{ $t("uploadFile_上传失败点击重试") }}
              </p>
            </div>
          </div>

          <!-- 文件名称插槽 -->
          <slot name="fileName" :item="el" :index="i">
            <div class="jr-file-name j-text-left" v-if="showName" v-title>
              <span>{{ `${el.fileName}.${el.fileType}` }}</span>
            </div>
          </slot>

          <!-- 删除icon -->
          <span
            v-if="showDelIcon"
            class="file-del-icon"
            :title="$t('common_删除')"
            @click="delFile(i)"
            ><i class="icon-close-picbig"></i
          ></span>

          <!-- 重新上传按钮 -->
          <div v-if="showReUploadBtn" class="re-upload">
            <i class="icon-reupload j-icon"></i>
            <jr-button @click="selectFile" type="plain">{{
              $t("uploadFile_重新上传")
            }}</jr-button>
          </div>
        </li>
      </draggable>
    </ul>

    <!-- 上传文件组件 -->
    <jr-upload
      v-bind="$attrs"
      :maxLen="maxLen"
      :delMd5="delMd5"
      :reUploadId="reUploadId"
      :isLoading="false"
      ref="upload"
      @add-file="getFile"
      @file-progress="getProgress"
      @upload-err="uploadError"
      @file-result="getResult"
    />

    <!-- 文件预览组件 -->
    <jr-file-preview
      v-bind="$attrs"
      :visible.sync="preVisible"
      :showIcon="preShowIcon"
      :fileList="files"
      :fileIndex="preFileIndex"
      @del-file="delPreviewFile"
      ref="preview"
    ></jr-file-preview>
  </div>
</template>
<script>
// 文件上传混入
import uploadFileMixin from "../../mixins/uploadFile";
// 拖拽组件
import draggable from "vuedraggable";
// 多语言转换方法
import { translate } from "../../assets/constants/lang";
export default {
  name: "JrUploadFile",
  components: { draggable },
  mixins: [uploadFileMixin],
  props: {
    // 容器大小
    boxWidth: {
      type: Number,
      default: 154,
    },
    boxHeight: {
      type: Number,
      default: 154,
    },
    // 是否显示文件名称
    showName: {
      type: Boolean,
      default: true,
    },
    // 上传按钮下方字体
    uploadWord: {
      type: String,
      default: translate("uploadFile_点击上传"),
    },
    // 文件上传下方描述
    uploadDesc: {
      type: String,
      default: "",
    },
    // 是否在右边出现上传
    isReverse: {
      type: Boolean,
      default: false,
    },
    // 是否开启预览
    isPreview: {
      type: Boolean,
      default: true,
    },
    // 是否禁止文件排序
    disabledSort: {
      type: Boolean,
      default: true,
    },
    defaultDel: Boolean,
  },
  data() {
    return {
      // 拖拽文件索引
      dragIndex: null,
    };
  },
  computed: {
    // 是否显示重新上传按钮
    showReUploadBtn() {
      const { isRead, maxLen, defaultDel } = this;
      // 以默认形式显示删除按钮则不显示重新上传 否则只读状态并且只上传一张显示
      return defaultDel ? false : !isRead && maxLen === 1;
    },
    // 是否显示删除icon
    showDelIcon() {
      const { isRead, maxLen, defaultDel } = this;
      // 编辑状态 以默认形式显示删除按钮直接显示 否则上传数量大于1才显示
      return !isRead && (defaultDel || maxLen > 1);
    },
    // 换行的最后一个
    isLastBank() {
      return (count) => {
        return (
          // 如果上传按钮显示着需要算多一个
          (this.showUploadBtn
            ? (count + 1) % this.bankCount
            : count % this.bankCount) === 0
        );
      };
    },
  },
  methods: {
    /**
     * @desc 拖拽时候索引赋值
     * @param {Number} i 拖拽的文件索引
     * @author 陈宇奇
     * @date 2019年11月15日 09:39:37
     */
    dragstart(i) {
      setTimeout(() => {
        this.dragIndex = i;
      }, 0);
    },
    /**
     * @desc 预览文件
     * @param {Object} item 当前点击文件
     * @author 陈宇奇
     * @date 2019年9月7日 15:44:42
     */
    async previewFile(item) {
      // 上传之前做啥事 等待了在继续走
      const beforePreviewRes = await this.beforePreviewFn(item);
      // 如果预览之前钩子返回false 直接不继续执行
      if (beforePreviewRes === false) {
        return;
      }

      // 嵌套在审批流中等待iframe全屏才做事
      this.isIframe &&
        (await this.$frame.openFramePull(this.$refs.preview.$el));

      // 可以预览并且上传完成才预览
      if (this.isPreview && item.uploadProess === 1) {
        // 打开文件预览组件
        this.openFilePreview(item.md5);
        if (this.canPreviewArr.includes(item.fileType)) {
          // 其他预览
          this.$emit("preview-file", item);
        }
      }
    },
    /**
     * @desc 删除当前文件
     * @param {Number} i 点击的索引
     * @author 陈宇奇
     * @date 2019年9月7日 15:46:06
     */
    delFile(i) {
      // 取消上传
      this.delMd5 = this.files[i].md5;
      this.files.splice(i, 1);
      this.$emit("get-files", this.files);
      //  在 delMd5 赋值upload.vue成功删除后，需要在下一循环将 delMd5 清空，防止重复选择文件后无法取消上传进度的缺陷
      this.$nextTick(() => {
        this.delMd5 = "";
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "./uploadFile.scss";
</style>
