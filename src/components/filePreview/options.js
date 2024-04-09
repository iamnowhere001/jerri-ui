/****************************************************************************

所属系统: 组件库
所属模块: 选项操作混入
创建时间: 2020年07月25日 14:22:15


***************************************************************************/
export default {
  data() {
    return {
      // 缩放倍数
      multiples: 1,
      // 旋转度数
      deg: 0,
      // 图片是否是实际大小 1比1
      isActual: false,
    };
  },
  created() {
    // 因为鼠标滚轮监听 所以节流缩放图片方法
    this.zoom = this.$utils.throttle(this.zoomFn, 100);
  },
  methods: {
    /**
     * @desc 节流缩放函数
     * @author 陈宇奇
     * @date 2020年07月25日 15:19:43
     */
    zoom() {},
    /**
     * @desc 缩放图片
     * @param {Boolean} isMagnify 是否放大图片
     * @author 陈宇奇
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
     * @author 陈宇奇
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
     * @author 陈宇奇
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
     * @author 陈宇奇
     * @date 2020年07月25日 16:34:22
     */
    delFile() {
      this.$emit("del-file", this.activeIndex);
    },
    /**
     * @desc 开关1比1图片
     * @author 陈宇奇
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
     * @author 陈宇奇
     * @date 2020年08月19日 10:43:37
     */
    resetImgOptions() {
      this.multiples = 1;
      this.deg = 0;
    },
  },
};
