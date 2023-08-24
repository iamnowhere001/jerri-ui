/****************************************************************************

所属系统: 组件库
所属模块: 图片查看器—[拖拽窗体功能]
创建时间: 2019年6月3日 15:30:20
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

export default {
  data() {
    return {
      //  正在拖拽查看器
      isMoving: false,
      //  拖拽前光标位置距离整个页面左侧的距离
      disX: "",
      //  拖拽前光标位置距离整个页面顶部的距离
      disY: ""
    }
  },
  methods: {
    /**
     * @desc 处理鼠标按下事件，记录鼠标的各项位置，准备拖拽窗体
     * @author 杨文杰
     * @date 2019年6月21日 16:38:42
     */
    handleMouseDown(e) {
      this.isMoving = true;
      let wX = this.$refs.picContent.offsetLeft;
      let wY = this.$refs.picContent.offsetTop;
      this.disX = e.clientX - wX;
      this.disY = e.clientY - wY;

      //  鼠标移动（移动窗口）
      this.$utils.on(document, "mousemove", this.handleMouseMove);
      //  鼠标按键松开（停止移动窗口）
      this.$utils.on(document, "mouseup", this.handleMouseUp);
    },
    /**
     * @desc 处理鼠标移动事件，更新窗体的位置
     * @author 杨文杰
     * @date 2019年6月21日 16:39:15
     */
    handleMouseMove(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.isMoving) {
        const xLoc = e.clientX - this.disX;
        const yLoc = e.clientY - this.disY;

        const picContent = this.$refs.picContent;

        picContent.style.left = xLoc + "px";
        picContent.style.top = yLoc + "px";
      }
    },
    /**
     * @desc 鼠标按键松开事件，移除移动中状态
     * @author 杨文杰
     * @date 2019年6月21日 16:39:42
     */
    handleMouseUp(e) {
      this.isMoving = false;
      //  取消监听
      this.$utils.off(document, "mousemove", this.handleMouseMove);
      this.$utils.off(document, "mouseup", this.handleMouseUp);
    },

    /**
     * @desc 处理手势按下事件，记录触碰的各项位置，准备拖拽窗体
     * @param {*} e
     */
    handleTouchStart(e) {
      this.isMoving = true;
      let wX = this.$refs.picContent.offsetLeft;
      let wY = this.$refs.picContent.offsetTop;
      this.disX = e.touches[0].clientX - wX;
      this.disY = e.touches[0].clientY - wY;

      //  鼠标移动（移动窗口）
      this.$utils.on(document, "touchmove", this.handleTouchMove);
      //  鼠标按键松开（停止移动窗口）
      this.$utils.on(document, "touchend", this.handleTouchEnd);
    },
    /**
     * @desc 处理鼠标移动事件，更新窗体的位置
     * @author 杨文杰
     * @date 2019年6月21日 16:39:15
     */
    handleTouchMove(e) {
      e.stopPropagation();
      if (this.isMoving) {
        const xLoc = e.touches[0].clientX - this.disX;
        const yLoc = e.touches[0].clientY - this.disY;

        const picContent = this.$refs.picContent;

        picContent.style.left = xLoc + "px";
        picContent.style.top = yLoc + "px";
      }
    },
    /**
     * @desc 鼠标按键松开事件，移除移动中状态
     * @author 杨文杰
     * @date 2019年6月21日 16:39:42
     */
    handleTouchEnd(e) {
      this.isMoving = false;
      //  取消监听
      this.$utils.off(document, "mousemove", this.handleTouchMove);
      this.$utils.off(document, "mouseup", this.handleTouchEnd);
    }
  }
}
