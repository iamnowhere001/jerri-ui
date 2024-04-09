/****************************************************************************

所属系统: 组件库
所属模块: 文件上传公共混入
创建时间: 2020年06月30日 21:12:25


***************************************************************************/
// 导入后缀类型数据 图片后缀 和视频后缀 可预览文件类型 有图片类型后缀
import {
  imgArr,
  videoArr,
  audioArr,
  canPreviewArr,
} from "../assets/constants/fileSuffixes";
// 文件类型图片混入
import fileImgTypeMixin from "./fileImgType";
export default {
  inheritAttrs: false,
  mixins: [fileImgTypeMixin],
  props: {
    // 是否只读 只读不出现上传按钮
    isRead: {
      type: Boolean,
      default: false,
    },
    // 最大上传张数
    maxLen: { type: Number, default: 1 },
    // 只读文件数组
    readFiles: {
      type: Array,
      default: () => [],
    },
    // 一行排几个
    bankCount: Number,
    // 是否可以下载文件
    isDownload: {
      type: Boolean,
      default: true,
    },
    //  预览前事件回调
    beforePreview: Function,
    // 是否嵌套在iframe中
    isIframe: Boolean,
  },
  data() {
    return {
      videoArr,
      audioArr,
      imgArr,
      canPreviewArr,
      // 上传的文件数组
      files: [],
      // 需要重新上传的文件id
      reUploadId: "",
      // 需要上传的文件md5
      delMd5: "",
      // 文件预览地址
      previewUrl: "",
      // 媒体图片文件
      mediaFile: [...imgArr, ...videoArr, ...audioArr],
      // 是否打开文件预览
      preVisible: false,
      // 预览文件索引
      preFileIndex: null,
    };
  },
  computed: {
    // 是否显示上传按钮
    showUploadBtn() {
      return this.files.length < this.maxLen && !this.isRead;
    },
    // 监听是否所有文件上传完成
    allComplete() {
      return this.files.every(({ uploadProess }) => uploadProess === 1);
    },
    // 是否存在上传失败的文件
    isExistErr() {
      return this.files.some(({ isErr }) => isErr);
    },
    // 是否单张
    isAlone() {
      return this.maxLen === 1;
    },
    // 预览组件icon配置
    preShowIcon() {
      const { showIcon } = this.$attrs;
      return showIcon || { download: this.isDownload, del: !this.isRead };
    },
    // 盒子尺寸
    boxSize() {
      return {
        width: `${this.boxWidth}px`,
        height: `${this.boxHeight}px`,
      };
    },
  },
  watch: {
    // 监听回传数据
    readFiles: {
      handler(arr) {
        this.files = arr.map((res, i) => {
          // 后缀截取 传了采用传的 否则在url中截取
          const fileSuffix = res.fileType || this.$utils.fileSuffix(res.url),
            fileType = fileSuffix ? fileSuffix.toLocaleLowerCase() : "",
            item = this.files[i];
          return {
            ...res,
            fileType,
            uploadProess: res.hasOwnProperty(`uploadProess`)
              ? res.uploadProess
              : 1,
            md5:
              res.md5 ||
              // 随机生成一个md5用户新上传文件组件删除文件
              `${Math.random()
                .toString(16)
                .substring(2)}`,

            // 如果文件有flv地址 则保存
            snapshot: item ? item.snapshot : "",
            // 常见文件类型返回出去
            ...this.fileTypeMold(fileType),
          };
        });
      },
      immediate: true,
    },
    // 关闭文件预览组件通知外面
    preVisible(value) {
      if (!value) {
        this.$emit("close-preview-file");
      }
    },
  },
  methods: {
    /**
     * @desc 返回文件类型对象
     * @param {String} type 当前文件类型
     * @return {Object} 文件类型对象
     * @author 陈宇奇
     * @date 2020年07月29日 17:05:28
     */
    fileTypeMold(type) {
      const isFile = canPreviewArr.includes(type);
      const isImage = imgArr.includes(type);
      const isVideo = videoArr.includes(type);
      return { isFile, isImage, isVideo };
    },
    /**
     * @desc 预览之前的钩子
     * @param {Object} item 当前文件信息
     * @author 陈宇奇
     * @date 2020年07月29日 17:05:55
     */
    async beforePreviewFn(item) {
      return await Promise.resolve(
        this.beforePreview ? this.beforePreview(item) : true
      );
    },
    /**
     * @desc 打开文件预览组件
     * @param {String} md5 文件md5
     * @author 陈宇奇
     * @date 2020年07月28日 15:09:37
     */
    openFilePreview(md5, files = this.files) {
      const index = files.findIndex((item) => md5 === item.md5);
      this.preFileIndex = index;
      this.preVisible = true;
    },
    /**
     * @desc 删除文件预览对应文件
     * @param {Number} index 删除文件索引
     * @author 陈宇奇
     * @date 2020年07月28日 14:08:38
     */
    delPreviewFile(index) {
      this.files.splice(index, 1);
      // 没有图片了隐藏图片查看
      !this.files.length && (this.preVisible = false);
      // 预览索引减少
      this.preFileIndex && this.preFileIndex--;
    },
    /**
     * @desc 选择文件
     * @author 陈宇奇
     * @date 2019年9月7日 15:43:23
     */
    selectFile() {
      this.$nextTick(() => {
        this.$refs.upload.upload();
      });
    },
    /**
     * @desc 触发重新上传文件
     * @param {Object} item 当前文件信息
     * @author 陈宇奇
     * @date 2019年9月7日 15:46:06
     */
    reUpload(item) {
      // 触发重新上传
      this.reUploadId = item.md5;
      // 隐藏错误
      item.isErr = false;
      item.showPro = true;
    },
    /**
     * @desc 获取上传的文件信息
     * @param {Object} file 当前文件信息
     * @author 陈宇奇
     * @date 2019年9月7日 15:46:06
     */
    getFile(file) {
      this.$set(file, "isErr", false);
      this.$set(file, "showPro", true);
      // 设置第一帧的地址
      this.$set(file, "snapshot", "");
      // 是否上传过
      let item = this.findFile(file.md5);
      // 没上传过并且  文件数量小于最大上传数量或者只能上传一张
      if (!item && (this.showUploadBtn || this.isAlone)) {
        // 如果上传最大数量为1的时候 则需要替换之前上传过的文件 并且取消之前的文件上传
        if (this.isAlone && this.files.length === 1) {
          // 取消上传
          this.delMd5 = this.files[0].md5;
          this.$nextTick(() => {
            this.delMd5 = "";
          });
          this.files.splice(0, 1, file);
          return;
        }
        this.files.push({ ...file, ...this.fileTypeMold(file.fileType) });
        // 添加到数组中告诉父组件 可以做校验
        this.$emit("on-uploading", this.files);
      }
    },
    /**
     * @desc 获取上传的文件进度
     * @param {Object} file 当前文件信息
     * @author 陈宇奇
     * @date 2019年9月7日 15:46:06
     */
    getProgress(file) {
      let item = this.findFile(file.md5);
      // 设置进度条
      item && (item.uploadProess = file.proess);
    },
    /**
     * @desc 文件上传出现错误
     * @param {Object} res 当前文件信息
     * @author 陈宇奇
     * @date 2019年9月7日 15:46:06
     */
    uploadError(res) {
      // 清空一下重新上传id 防止点击重新上传无法watch到
      this.reUploadId = "";
      let file = this.findFile(res.md5);
      // 显示错误
      file.isErr = true;
      // 隐藏进度
      file.showPro = false;
    },
    /**
     * @desc 获取文件结果
     * @param {Object} res 当前文件信息
     * @author 陈宇奇
     * @date 2019年9月7日 15:46:06
     */
    getResult(res) {
      let file = this.findFile(res.fileMd5);
      if (file) {
        // 视频格式如果存在转码地址则需要使用转码地址
        if (videoArr.includes(res.suffix)) {
          // 视频第一帧截取原地址赋值
          file.snapshot = res.fileUrl;
          // 转码地址 如果有则使用转码地址 否则使用原地址
          file.url = res.conversionFileUrl || res.fileUrl;
        } else {
          // 上传成功替换url
          file.url = res.fileUrl;
        }
        // 进度条100%
        file.uploadProess = 1;
        this.$emit("get-files", this.files);
      }
    },
    /**
     * @desc 查找到对应文件信息
     * @param {Object} filemd5 文件md5
     * @return {Object} 查找到的文件信息
     * @author 陈宇奇
     * @date 2019年9月7日 15:46:06
     */
    findFile(filemd5) {
      // 查找文件对象
      return this.files.find(({ md5 }) => md5 === filemd5);
    },
    /**
     * @desc 标题描述
     * @param {Object} el 当前项
     * @return {String} 对应的标题描述
     * @author 陈宇奇
     * @date 2019年11月1日 15:11:10
     */
    titleDesc(el) {
      // 文件上传失败
      if (el.isErr) {
        return "上传失败";
      }
      // 文件上传中
      if (el.uploadProess < 1) {
        return this.$t("uploadFile_上传中");
      }
      return this.$t("uploadFile_点击预览");
    },
    /**
     * @desc 图片报错显示默认图
     * @param {Object} event 事件对象
     * @param {Boolean} isVideo 是否是视频
     * @param {Object} el 当前项
     * @author 陈宇奇
     * @date 2019年11月1日 11:23:46
     */
    moveErrorImg(event, isVideo, el) {
      let defaultImg = isVideo
        ? require("../assets/images/uploadFile/i_video_big.png")
        : require("../assets/images/uploadFile/i_pic_big.png");
      event.currentTarget.src = defaultImg;
      // 设置图片错误信息 禁止预览
      !isVideo && (el.imgErr = true);
    },
    /**
     * @desc 图片缩略图
     * @param {Object} el 图片对象
     * @return {String} 缩略图地址
     * @author 陈宇奇
     * @date 2020年3月13日 14:37:29
     */
    imgUrl(el) {
      // 上传完成使用缩略图 否则使用本地图片
      return el.uploadProess === 1
        ? `${el.url}?x-oss-process=image/resize,m_mfit,w_${this.boxWidth}/auto-orient,1`
        : window.URL.createObjectURL(el.file);
    },
    /**
     * @desc 视频文件展示
     * @param {Object} item 视频对象
     * @return {String} 视频地址
     * @author 陈宇奇
     * @date 2020年3月13日 14:37:29
     */
    videoUrl(item) {
      // 视频判断是否上传完毕 上传完毕使用第一帧 否则用视频类型图片
      return item.uploadProess === 1
        ? `${item.snapshot ||
            item.url}?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_1000,f_jpg,w_${
            this.boxWidth
          },m_fast`
        : require("../assets/images/uploadFile/i_video_big.png");
    },
    /**
     * @desc 展示文件的图片
     * @param {Object} item 文件项对象
     * @author 陈宇奇
     * @date 2020年3月13日 18:07:11
     */
    showImg(item) {
      const { fileType } = item;
      if (this.imgArr.includes(fileType)) {
        // 图片
        return this.imgUrl(item);
      } else if (this.videoArr.includes(fileType)) {
        // 视频
        return this.videoUrl(item);
      } else if (this.audioArr.includes(fileType)) {
        // 音频
        return require(`../assets/images/uploadFile/i_voice_big.png`);
      }
      return this.$_fileImgType_getSrc(fileType);
    },
  },
};
