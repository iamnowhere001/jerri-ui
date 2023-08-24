<!--
/****************************************************************************
所属系统: 组件库
所属模块: 文件预览组件
创建时间: 2020年07月22日 17:07:28
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
-->
<template>
  <div
    v-show="visible"
    class="jr-file-preview j-mask"
    :class="{ 'full-page': fullPage }"
  >
    <div class="file-preview" ref="previewContainer" :style="previewContainerStyles">
      <!-- 顶部开始 -->
      <div
        v-if="!fullPage"
        class="file-preview-title"
        v-move="() => $refs.previewContainer"
        :move-disabled="isFull"
      >
        <div class="file-preview-name j-ellip">
          <span v-show="isImg || isVideo">{{ currFileName }}</span>
        </div>
        <div class="file-preview-icons">
          <i
            :title="isFull ? '向下还原' : '最大化'"
            :class="[isFull ? 'icon-reduction_file' : 'icon-maximize_file']"
            @click="toggleFull"
          ></i>
          <i title="关闭" class="icon-close_file" @click="closeFileView"></i>
        </div>
      </div>
      <!-- 顶部结束 -->

      <!-- 预览内容开始 -->
      <div class="file-preview-content">
        <div
          class="file-preview-display"
          :class="{ 'file-preview-display-samll': showThumb }"
        >
          <!-- 加载进度 -->
          <jr-loading-petal :visible="isLoading"></jr-loading-petal>
          <!-- 加载进度 -->

          <!-- 消息提示 -->
          <span v-show="msgConfig.show" class="file-preview-msg">{{
            msgConfig.text
          }}</span>
          <!-- 消息提示 -->

          <!-- 图片类型开始 -->
          <div
            v-if="isImg"
            key="img"
            class="file-preview-img-box"
            @mousewheel="mousewheelFn"
          >
            <img
              :src="currFile.url"
              :style="{
                transform: 'rotateZ(' + deg + 'deg) scale(' + multiples + ')',
              }"
              :move-out="true"
              :move-disabled="isDisabledImgMove"
              v-move="() => $refs.img"
              ref="img"
              @load="successLoadImg"
              @error="moveErrorImg($event, 'big')"
            />
          </div>
          <!-- 图片类型结束 -->

          <!-- 视频类型开始 -->
          <div v-else-if="isVideo" key="video" class="file-preview-video-box">
            <jr-video-player
              v-if="visible"
              :boxWidth="videoWidth"
              :boxHeight="videoHeight"
              :videoUrl="currFile.snapshot || currFile.url"
              @getVideoSize="getVideoSize"
            ></jr-video-player>
          </div>
          <!-- 视频类型结束 -->

          <!-- 其他文件类型开始 -->
          <div v-else key="other" class="file-preview-other">
            <img
              :src="showImgSrc(currFile.url)"
              @click="$_fileImgType_openUrl(currFile.url)"
            />
            <div class="file-preview-other-name">{{ currFileName }}</div>

            <!-- 音频显示播放icon开始 -->
            <div v-if="isAudio" class="file-preview-audio">
              <i :class="[isPlay ? 'stop' : 'play']" @click="toggleAudio"></i>
              <audio
                v-if="visible"
                :src="currFile.url"
                hidden
                ref="audio"
                @ended="isPlay = false"
              ></audio>
            </div>
            <!-- 音频显示播放icon结束 -->
          </div>
          <!-- 其他文件类型结束 -->

          <!-- 箭头开始 -->
          <div
            class="file-preview-arrow file-preview-arrow-next"
            :title="isDisNext ? '已是最后一个' : ''"
            :class="{ disabled: isDisNext }"
            @click="switchFile()"
          ></div>
          <div
            class="file-preview-arrow file-preview-arrow-prev"
            :title="isvDisPre ? '已是第一个' : ''"
            :class="{ disabled: isvDisPre }"
            @click="switchFile(false)"
          ></div>
          <!-- 箭头结束 -->
        </div>

        <!-- 缩略图列表开始 -->
        <div
          class="file-preview-thumb-wrap"
          :class="{ 'small-height': !showThumb }"
        >
          <div
            v-show="showThumb"
            class="file-preview-thumb-content"
            ref="thumbContainer"
            @scroll="changePageTurningStatus"
          >
            <ul ref="thumbList">
              <li
                :class="{ active: index === activeIndex }"
                v-for="(item, index) in fileList"
                :key="index"
                @click="changeActive(index)"
              >
                <div class="small-img">
                  <img
                    :src="showImgSrc(item.url, 'small')"
                    @error="moveErrorImg($event, 'small')"
                  />
                </div>
              </li>
            </ul>
          </div>
          <template v-if="showThumbArrow">
            <i
              class="file-preview-thumb-arrow icon-image-arrow next"
              :class="{ disabled: isDisThumbNext }"
              @click="pageTurning()"
            ></i>
            <i
              class="file-preview-thumb-arrow icon-image-arrow prev"
              :class="{ disabled: isDisThumbPrev }"
              @click="pageTurning(false)"
            ></i>
          </template>
        </div>
        <!-- 缩略图列表结束 -->
      </div>
      <!-- 预览内容结束 -->

      <!-- 操作选项开始 -->
      <div class="file-preview-options">
        <i title="预览" class="icon-preview_file" @click="toggleThumb"></i>
        <div class="file-preview-tool">
          <!-- 图片才显示放大缩小旋转 -->
          <template v-if="isImg && !currFile.showErr">
            <i
              :title="isActual ? '恢复尺寸' : '实际尺寸'"
              :class="[isActual ? 'icon-screen_file' : 'icon-onebyone_file']"
              @click="toggleActual"
            ></i>
            <i title="放大" class="icon-enlarge_file" @click="zoom()"></i>
            <i title="缩小" class="icon-shrink_file" @click="zoom(false)"></i>
            <i title="旋转" class="icon-spin_file" @click="rotate"></i>
          </template>
          <!-- 图片才显示放大缩小旋转 -->

          <i
            v-if="showIcon.download"
            title="下载"
            class="icon-download_file"
            @click="download"
          ></i>
          <i
            v-if="showIcon.del"
            title="删除"
            class="icon-delete-file"
            @click="delFile"
          ></i>
        </div>
        <div class="file-preview-page">
          <span class="file-preview-page-curr">{{ activeIndex + 1 }}</span>
          <span>/</span>
          <span class="file-preview-page-total">{{ fileList.length }}</span>
        </div>
      </div>
      <!-- 操作选项结束 -->
    </div>
  </div>
</template>
<script>
// 配置混入
import configMixin from "./configMixin";
// 缩略图列表混入
import thumbnailMixin from "./thumbnail";
// 选项操作混入
import optionsMixin from "./options";
export default {
  name: "JrFilePreview",
  components: {},
  mixins: [configMixin, thumbnailMixin, optionsMixin],
  props: {
    // 是否显示弹窗
    visible: Boolean,
    // 展示文件索引
    fileIndex: Number,
    // 图标配置
    showIcon: {
      type: Object,
      default: () => ({
        download: true,
        del: true,
      }),
    },
    // 文件列表
    fileList: {
      type: Array,
      default: () => [],
    },
    // 是否全屏展示
    full: {
      type: Boolean,
      default: true,
    },
    // 以全屏页面展示(不是弹窗了)
    fullPage: Boolean,
    //  窗口化时宽度
    width: {
      type: Number,
      default: 500
    },
    //  窗口化时高度
    height: {
      type: Number,
      default: 570
    }
  },
  data() {
    return {
      // 提示消息
      msgConfig: {
        text: "",
        show: false,
      },
      // 是否加载菊花loading
      isLoading: false,
      // 是否播放着音频
      isPlay: false,
      // 是否全屏
      isFull: false,
      // 激活索引
      activeIndex: null,
      // 视频宽度
      videoWidth: 0,
      // 视频高度
      videoHeight: 0,
    };
  },
  computed: {
    //  预览容器高度
    previewContainerStyles() {
      let styles = {};

      if(this.isFull) {
        styles = {
          position: "static !important",
          width: "100%",
          height: "100%"
        }
      } else {
        styles = {
          width: `${this.width}px`,
          height: `${this.height}px`
        }
      }

      return styles;
    },
    // 当前显示文件
    currFile() {
      return this.fileList[this.activeIndex] || {};
    },
    // 当前文件后缀
    currFileSuffix() {
      return this.$utils.fileSuffix(this.currFile.url);
    },
    // 当前完整文件名
    currFileName() {
      return `${this.currFile.fileName}.${this.currFileSuffix}`;
    },
    // 是否禁止左切箭头
    isvDisPre() {
      return !this.activeIndex;
    },
    // 是否禁止右切箭头
    isDisNext() {
      return this.activeIndex === this.fileList.length - 1;
    },
  },
  watch: {
    // 监听弹窗显示隐藏
    visible: "initPop",
    // 监听索引变化
    fileIndex: {
      handler(i) {
        this.activeIndex = i;
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * @desc 关闭弹窗
     * @author 陈宇奇
     * @date 2020年07月25日 10:42:17
     */
    closeFileView() {
      this.$emit("update:visible", false);
    },
    /**
     * @desc 全屏方法
     * @author 陈宇奇
     * @date 2020年07月23日 17:48:28
     */
    toggleFull() {
      this.isFull = !this.isFull;
      // 设置视频尺寸
      this.setVideoSize();
    },
    /**
     * @desc 切换文件
     * @param {Boolean} isNext 是否切换到下一个
     * @author 陈宇奇
     * @date 2020年07月25日 11:20:34
     */
    switchFile(isNext = true) {
      if ((isNext && this.isDisNext) || (!isNext && this.isvDisPre)) {
        return;
      }
      this.activeIndex = isNext ? ++this.activeIndex : --this.activeIndex;
      this.$nextTick(() => {
        this.scrollIntoView();
      });
    },
    /**
     * @desc 获取视频实际宽高
     * @param {Object} size 视频实际大小
     * @author 陈宇奇
     * @date 2020年07月28日 11:24:49
     */
    getVideoSize({ width, height }) {
      const ratio = height / width,
        isColumn = ratio > 1,
        // 屏幕宽度
        boxWidth = this.$el.offsetWidth,
        // 视频尺寸是否超过1000 最大1000 否则为屏幕宽度
        boxSize = boxWidth > 1000 ? 1000 : boxWidth;
      this.videoWidth = isColumn ? (width / height) * boxSize : boxSize;
      this.videoHeight = isColumn ? boxSize : ratio * boxSize;
    },
    /**
     * @desc 设置视频大小
     * @author 陈宇奇
     * @date 2020年07月28日 11:37:45
     */
    setVideoSize() {
      // 全屏视频放大倍数
      const multiple = 1.5;
      ["videoWidth", "videoHeight"].forEach((key) => {
        this[key] = this.isFull ? this[key] * multiple : this[key] / multiple;
      });
    },
    /**
     * @desc 播放暂停音频
     * @author 陈宇奇
     * @date 2020年07月28日 10:39:37
     */
    toggleAudio() {
      this.isPlay = !this.isPlay;
      const { audio } = this.$refs;
      // 暂停则播放 播放则暂停
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    /**
     * @desc 修改高亮索引
     * @param {Number} i 点击索引
     * @author 陈宇奇
     * @date 2020年07月25日 14:16:38
     */
    changeActive(i) {
      this.activeIndex = i;
    },
  },
};
</script>
<style scoped lang="scss">
@import "filePreview.scss";
</style>
