/****************************************************************************

所属系统: 组件库
所属模块: 文件图片处理混入
创建时间: 2020年07月25日 14:04:36
维护人: 陈宇奇
*┌────────────────────────────────────────────────────────────┐
*│  此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│  版权所有：杰人软件(深圳)有限公司                             │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
// 导入后缀类型数据 图片后缀 和视频后缀 有图片类型后缀
import {
  imgArr,
  videoArr,
  audioArr,
} from "../../assets/constants/fileSuffixes";
// 文件类型图片混入
import fileImgTypeMixin from "../../mixins/uploadFile";
export default {
  mixins: [fileImgTypeMixin],
  data() {
    return {
      // 定时器id
      timeId: null,
    };
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
    // 视频类型
    isVideo() {
      return this.fileType(videoArr);
    },
    // 是否是音频
    isAudio() {
      return this.fileType(audioArr);
    },
  },
  watch: {
    currFile: {
      handler(item) {
        // 切换到图片挂载图片
        this.isImg && this.mountImg();
        // 重置音频播放状态
        this.isPlay = false;
        item.showErr = false;
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * @desc 初始弹窗
     * @param {Boolean} bol 是否
     * @author 陈宇奇
     * @date 2020年07月25日 14:11:42
     */
    initPop(bol) {
      document.body.style.overflow = bol ? "hidden" : "visible";
      // 打开弹窗
      if (bol) {
        // 是否出现滚动条
        if (document.body.scrollHeight > document.body.clientHeight) {
          // 出现滚动条则减去滚动条宽度防止页面抖动
          document.body.style.width = `calc(100% - ${this.$utils.scrollbarWidth()}px)`;
        }
        // 绑定键盘事件
        this.$utils.on(document, "keydown", this.keyDownFn);
        this.isFull = this.full;
      } else {
        // 关闭弹窗
        document.body.style.width = "";
        // 解绑键盘事件
        this.$utils.off(document, "keydown", this.keyDownFn);
        // 重置弹窗
        this.resetPlacement();
      }
    },
    /**
     * @desc 重置弹窗
     * @author 陈宇奇
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
     * @author 陈宇奇
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
     * @author 陈宇奇
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
     * @author 陈宇奇
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
     * @author 陈宇奇
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
     * @author 陈宇奇
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
     * @author 陈宇奇
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
     * @desc 键盘事件
     * @author 陈宇奇
     * @date 2020年07月25日 15:38:04
     */
    keyDownFn(event) {
      if (!this.visible) {
        return;
      }
      let keyCode = event.keyCode;
      //  ESC（关闭查看器）
      if (keyCode === 27) {
        // 全屏时候展示esc不能关闭
        !this.fullPage && this.closeFileView();
      }
      //  左按键（上一张）
      else if (keyCode === 37) {
        this.switchFile(false);
      }
      //  右按键（下一张）
      else if (keyCode === 39) {
        this.switchFile();
      }
    },
    /**
     * @desc 鼠标滚轮事件
     * @author 陈宇奇
     * @date 2020年07月25日 15:38:11
     */
    mousewheelFn(event) {
      if (!this.visible) {
        return;
      }
      let deltaY = event.deltaY;
      //  滚轮向下（缩小图片）
      if (deltaY > 0) {
        this.zoom(false);
      }
      //  滚轮向上（放大图片）
      else {
        this.zoom();
      }
    },
  },
};
