<!--
/*
所属系统: 组件库
所属模块: 全屏预览组件
创建时间: 2020年07月22日 17:07:28
*/
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
        <!-- 显示隐藏缩率图列表 -->
        <i title="预览" class="icon-preview_file" @click="showThumb = !showThumb"></i>
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
// 导入后缀类型数据 图片后缀 和视频后缀 有图片类型后缀
import { imgArr } from "../../assets/constants/fileSuffixes";
// 文件类型图片混入
import fileImgTypeMixin from "../../mixins/uploadFile";
// 配置混入
// import configMixin from "./configMixin";
// 缩略图列表混入
// import thumbnailMixin from "./thumbnail";
// 选项操作混入
// import optionsMixin from "./options";
export default {
  name: "JrFullPreview",
  components: {},
  mixins: [fileImgTypeMixin],
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
      // 定时器id
      timeId: null,

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

      // 缩放倍数
      multiples: 1,
      // 旋转度数
      deg: 0,
      // 图片是否是实际大小 1比1  --> 默认true
      isActual: false,

      // 是否显示缩略图列表
      showThumb: false,
      // 是否显示翻页箭头
      showThumbArrow: false,
      // 是否禁止上一页箭头
      isDisThumbPrev: false,
      // 是否禁止下一页箭头
      isDisThumbNext: false,
    };
  },
  created() {
    // 因为鼠标滚轮监听 所以节流缩放图片方法
    this.zoom = this.$utils.throttle(this.zoomFn, 100);
  },
  mounted() {
    this.resizeListener();
  },
  computed: {
    // 图片类型
    isImg() {
      return this.fileType(imgArr);
    },
    // 是否禁止图片移动
    isDisabledImgMove() {
      return this.multiples <= 1 && !this.isActual;
    },
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

    currFile: {
      handler(item) {
        // 切换到图片挂载图片
        this.isImg && this.mountImg();
        item.showErr = false;
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * @desc 切换文件
     * @param {Boolean} isNext 是否切换到下一个
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
     * @date 2020年07月25日 14:16:38
     */
    changeActive(i) {
      this.activeIndex = i;
    },

    /**
     * @desc 重置弹窗
     * @date 2020年07月25日 16:12:09
     */
     resetPlacement() {
      const { previewContainer } = this.$refs;
      // 重置移动位置
      previewContainer.style.left = "auto";
      previewContainer.style.top = "auto";
      // 重置弹窗数据
      this.isPlay = this.isActual = false;
      this.resetImgOptions();
    },
    /**
     * @desc 处理图片挂载逻辑
     * @date 2020年07月28日 10:24:35
     */
    async mountImg() {
      this.isLoading = true;
      await this.$nextTick();
      // 重置图片
      this.resetPic();
    },
    /**
     * @desc 重置图片
     * @date 2020年07月25日 15:45:45
     */
    resetPic() {
      const { img } = this.$refs;
      this.resetImgOptions();
      // 图片默认根据容器缩小
      this.isActual = false;
      // 重置移动位置和图片尺寸
      Object.assign(img.style, {
        left: "auto",
        top: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
      });
    },
    /**
     * @desc 图片加载完成后回调
     * @param {Object} event 默认事件参数
     * @author 杨文杰
     * @date 2019年5月8日15:15:38
     */
    successLoadImg(event) {
      let node = event.target;
      if (node.complete) {
        this.isLoading = false;
      }
    },
    /**
     * @desc 图片显示错误
     * @param {Object} event 事件对象
     * @date 2020年07月28日 14:23:44
     */
    moveErrorImg(event, size) {
      // 存放图片文件夹
      const folder = size === "big" ? "uploadFile" : "small-file";
      event.target.src = require(`../../assets/images/${folder}/i_pic_${size}.png`);
      this.isLoading = false;
      this.currFile.showErr = true;
    },
    /**
     * @desc 根据文件后缀确定文件类型
     * @param {Array} suffixList 文件后缀列表
     * @param {String} suffix 文件后缀
     * @return 是否属于对应文件
     * @date 2020年07月24日 17:20:37
     */
    fileType(suffixList, suffix = this.currFileSuffix) {
      const fileType = suffix && suffix.toLocaleLowerCase();
      return suffixList.includes(fileType);
    },
    /**
     * @desc 展示文件的图片
     * @param {Object} item 文件项对象
     * @param {String} size 显示图片大小
     * @date 2020年3月13日 18:07:11
     */
    showImgSrc(url, size) {
      const suffix = this.$utils.fileSuffix(url);
      // 图片只看缩略图
      if (this.fileType(imgArr, suffix)) {
        return `${url}?x-oss-process=image/resize,m_mfit,w_40/auto-orient,1`;
      }
      return this.$_fileImgType_getSrc(suffix, size);
    },
    /**
     * @desc 显示消息提示
     * @param {String} text 提示文本
     * @param {Number} delay 延迟时间
     * @date 2020年07月25日 14:56:20
     */
    showMsg(text, delay = 500) {
      this.msgConfig.text = text;
      this.msgConfig.show = true;
      this.timeId && clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.msgConfig.show = false;
      }, delay);
    },
    /**
     * @desc 鼠标滚轮事件
     * @date 2020年07月25日 15:38:11
     */
    mousewheelFn(event) {
      if (!this.visible) {
        return;
      }
      let deltaY = event.deltaY;
      if (deltaY > 0) {
        //  滚轮向下（缩小图片）
        this.zoom(false);
      } else {
        //  滚轮向上（放大图片）
        this.zoom();
      }
    },


    /**
     * @desc 节流缩放函数
     * @date 2020年07月25日 15:19:43
     */
     zoom() {},

    /**
     * @desc 缩放图片
     * @param {Boolean} isMagnify 是否放大图片
     * @date 2020年07月25日 15:06:47
     */
    zoomFn(isMagnify = true) {
      if (
        // 放大图片放到最大 或者缩小图片到最小直接返回
        (isMagnify && this.multiples >= 5) ||
        (!isMagnify && this.multiples <= 0.25)
      ) {
        return;
      }
      isMagnify ? (this.multiples += 0.25) : (this.multiples -= 0.25);
      this.showMsg(`${this.multiples * 100}%`);
    },
    /**
    /**
     * @desc 旋转图片
     * @date 2020年07月25日 14:58:37
     */
    rotate() {
      this.deg += 90;
      if (this.deg >= 360) {
        this.deg = 0;
      }
    },
    /**
     * @desc 文件下载
     * @date 2020年07月25日 16:27:21
     */
    download() {
      const ele = document.createElement("a");
      ele.setAttribute("href", this.currFile.url);
      ele.setAttribute("download", "download");
      ele.click();
    },
    /**
     * @desc 删除文件通知父组件
     * @date 2020年07月25日 16:34:22
     */
    delFile() {
      this.$emit("del-file", this.activeIndex);
    },
    /**
     * @desc 开关1比1图片
     * @date 2020年07月28日 10:05:03
     */
    toggleActual() {
      this.isActual = !this.isActual;
      const { img } = this.$refs;
      Object.assign(img.style, {
        left: "auto",
        top: "auto",
        maxWidth: this.isActual ? "none" : "100%",
        maxHeight: this.isActual ? "none" : "100%",
      });
      this.resetImgOptions();
    },
    /**
     * @desc 重置图片选项
     * @date 2020年08月19日 10:43:37
     */
    resetImgOptions() {
      this.multiples = 1;
      this.deg = 0;
    },

   /**
     * @desc 监听缩略图窗体变化
     * @date 2020年07月27日 10:27:18
     */
     resizeListener() {
      const { thumbContainer } = this.$refs;
      //  开始监听
      this.$utils.addResizeListener(thumbContainer, this.resizeThumb);
      // 销毁组件的时候销毁事件
      this.$once("hook:beforeDestory", () => {
        //  取消监听
        this.$utils.removeResizeListener(thumbContainer, this.resizeThumb);
      });
    },
    /**
     * @desc 监听缩略图容器变化
     * @date 2020年07月25日 17:37:06
     */
    resizeThumb() {
      const { thumbContainer, thumbList } = this.$refs,
        thumbListWidth = thumbList.offsetWidth,
        preWrapWidth = thumbContainer.offsetWidth;
      this.showThumbArrow = thumbListWidth > preWrapWidth;
      // 修改翻页箭头状态
      this.changePageTurningStatus();
      this.scrollIntoView("auto", "center");
    },
    /**
     * @desc 将高亮的缩略图滚动到可视区域
     * @param {String} behavior 定义动画过渡效果
     * @param {String} inline 水平对齐方式
     * @date 2020年07月27日 13:05:42
     */
    scrollIntoView(behavior = "smooth", inline = "nearest") {
      const { thumbList } = this.$refs,
        el = thumbList.querySelector(".active");
      el &&
        el.scrollIntoView({
          behavior,
          inline,
        });
    },

    /**
     * @desc 缩略图列表滚动后，改变翻页按钮的状态
     */
    changePageTurningStatus() {
      const thumbContainer = this.$refs.thumbContainer;
      const { scrollLeft, clientWidth, scrollWidth } = thumbContainer;
      if (clientWidth === scrollWidth) {
        this.isDisThumbPrev = this.isDisThumbNext = true;
        return;
      }

      if (scrollLeft === 0) {
        this.isDisThumbPrev = true;
        this.isDisThumbNext = false;
      } else if (scrollLeft + clientWidth === scrollWidth) {
        this.isDisThumbNext = true;
        this.isDisThumbPrev = false;
      } else {
        this.isDisThumbPrev = this.isDisThumbNext = false;
      }
    },
    /**
     * @desc 翻页缩略图
     * @param {Boolean} isNext 是否是下一页
     * @date 2020年07月25日 18:06:51
     */
    pageTurning(isNext = true) {
      const { thumbContainer } = this.$refs,
        { scrollLeft, clientWidth } = thumbContainer,
        left = isNext ? scrollLeft + clientWidth : scrollLeft - clientWidth;
      thumbContainer.scrollTo({ left, behavior: "smooth" });
    },
  },
};
</script>
<style scoped lang="scss">
@import "fullPreview.scss";
</style>
