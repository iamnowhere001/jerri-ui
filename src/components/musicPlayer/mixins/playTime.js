/****************************************************************************

所属系统: 组件库
所属模块: chatInfo—[进度调节功能]
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
      //  是否正在拖拽时间进度
      isDraggingTimeProgress: false
    }
  },
  methods: {
    /**
     * @desc 开始拖拽播放进度条圆点
     * @author 杨文杰
     * @date 2019年8月9日 11: 25: 57
     */
    startDragTimePoint() {
      if (!this.currentMusicLoadSuccess) return;

      //  正在拖拽时间进度
      this.isDraggingTimeProgress = true;
      //  阻止文本选中
      document.onselectstart = () => false;

      this.$utils.on(document, "mousemove", this.draggingTimePoint);
      this.$utils.on(document, "mouseup", this.stopDragTimePoint);
    },
    /**
     * @desc 拖拽播放进度条圆点中
     * @param {Event} event 事件
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    draggingTimePoint(event) {
      const x =
        event.pageX -
        this.$refs.audioProgressContainer.getBoundingClientRect()["x"];

      //  超出左边
      if (x < 0) {
        //  设置播放进度圆点位置
        this.setTimePointPosition(0);
        //  设置进度条宽度
        this.timeProgressWidth = 0;

        //  设置当前时间
        this.currentTime = 0;
        //  设置当前时间（格式化后）
        this.currentTimeAfterFormat = this.formatTime(this.currentTime);
      }

      //  超出右边
      else if (x > this.$refs.audioProgressContainer.clientWidth) {
        //  设置播放进度圆点位置
        this.setTimePointPosition(
          this.$refs.audioProgressContainer.clientWidth
        );

        //  设置进度条宽度
        this.timeProgressWidth =
          this.$refs.audioProgressContainer.clientWidth + "px";

        //  设置当前时间，0.1解决有的浏览器播放完了进度还会再走
        this.currentTime = this.currentMusic.duration - 0.1;
        //  设置当前时间（格式化后）
        this.currentTimeAfterFormat = this.formatTime(this.currentTime);
      }

      //  两边均没有超出
      else {
        this.setTimePointPosition(x);

        //  设置进度条宽度
        this.timeProgressWidth = x;
        //  设置当前时间
        this.currentTime =
          (this.timeProgressWidth /
            this.$refs.audioProgressContainer.offsetWidth) *
          this.currentMusic.duration;
        //  设置当前时间（格式化后）
        this.currentTimeAfterFormat = this.formatTime(this.currentTime);
      }
    },
    /**
     * @desc 停止拖拽播放进度条圆点
     */
    stopDragTimePoint() {
      //  设置播放位置
      this.$refs.audio.currentTime = this.currentTime;
      //  停止拖拽时间进度
      this.isDraggingTimeProgress = false;
      //  放开阻止文本选中
      document.onselectstart = null;

      this.$utils.off(document, "mousemove", this.draggingTimePoint);
      this.$utils.off(document, "mouseup", this.stopDragTimePoint);
    },
    /**
     * @desc 点击跳转播放进度
     * @param {Event} event 事件
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    jumpProgress(event) {
      if (!this.currentMusicLoadSuccess) return;
      const x =
        event.pageX -
        this.$refs.audioProgressContainer.getBoundingClientRect()["x"];

      //  设置当前时间
      this.currentTime =
        (x / this.$refs.audioProgressContainer.clientWidth) * this.currentMusic.duration;

      //  设置播放位置
      this.$refs.audio.currentTime = this.currentTime;
      this.setTimePointPosition(x);

      //  设置进度条宽度
      this.timeProgressWidth = x;
      // 设置当前时间（格式化后）
      this.currentTimeAfterFormat = this.formatTime(this.currentTime);
    },
    /**
     * @desc 设置播放进度圆点位置
     * @param {Number} x 宽度
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    setTimePointPosition(x) {
      const pointWidthHalf = this.$refs.audioProgressPoint.clientWidth / 2;
      const left = x - pointWidthHalf;

      //  计算圆点的准确位置
      this.$refs.audioProgressPoint.style.left = left < 0 ? x : left + "px";
    }
  }
}
