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
    :class="{ 'full-screen': isFull }"
  >
    <div class="file-preview" ref="previewContainer">
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
  name: "JrFullPreview",
  components: {},
  mixins: [configMixin, thumbnailMixin, optionsMixin],
  props: {
    // 是否显示弹窗
    visible: Boolean,
    // 展示文件索引
    fileIndex: Number,
    // 文件列表
    fileList: {
      type: Array,
      default: () => [],
    },
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
      // 是否全屏
      isFull: true,
      // 激活索引
      activeIndex: null,
    };
  },
  computed: {
    // 当前显示文件
    currFile() {
      return this.fileList[this.activeIndex] || {};
    },
    // 当前文件后缀
    currFileSuffix() {
      return this.$utils.fileSuffix(this.currFile.url);
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
@import "fullPreview.scss";
</style>
