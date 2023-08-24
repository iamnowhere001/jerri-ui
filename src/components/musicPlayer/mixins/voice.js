/****************************************************************************

所属系统: 组件库
所属模块: chatInfo—[音量调节功能]
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
      //  是否展示音量调节窗体
      isShowVoiceForm: false,
      //  是否正在拖拽音量进度
      isDraggingVoiceProgress: false
    }
  },
  methods: {
    /**
     * @desc 开始拖拽音量进度条圆点
     * @author 杨文杰
     * @date 2019年8月9日 11: 25: 57
     */
    startDragVoicePoint() {
      //  设置拖拽音量进度
      this.isDraggingVoiceProgress = true;
      //  阻止文本选中
      document.onselectstart = () => false;

      this.$utils.on(document, "mousemove", this.draggingVoicePoint);
      this.$utils.on(document, "mouseup", this.stopDragVoicePoint);
    },
    /**
     * @desc 拖拽播放音量进度条圆点中
     * @param {Event} event 事件
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    draggingVoicePoint(event) {
      const y =
        event.clientY -
        this.$refs.audioVoiceContainer.getBoundingClientRect()["y"];

      //  超出顶部
      if (y < 0) {
        //  设置音量进度条为最大
        this.private_volume = 100;
      }

      //  超出底部
      else if (y > this.$refs.audioVoiceContainer.clientHeight) {
        //  音量为最小
        this.private_volume = 0;
      }

      //  两边均没有超出
      else {
        this.private_volume = (this.$refs.audioVoiceContainer.clientHeight - y);
      }
    },
    /**
     * @desc 停止拖拽音量进度条圆点
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    stopDragVoicePoint() {
      //  停止拖拽音量进度
      this.isDraggingVoiceProgress = false;
      //  放开阻止文本选中
      document.onselectstart = null;

      this.$utils.off(document, "mousemove", this.draggingVoicePoint);
      this.$utils.off(document, "mouseup", this.stopDragVoicePoint);
    },
    /**
     * @desc 点击设置音量大小
     * @param {Event} event 事件
     * @author 杨文杰
     * @date 2019年8月9日 11:25:57
     */
    jumpVoiceProgress(event) {
      const y =
        event.clientY -
        this.$refs.audioVoiceContainer.getBoundingClientRect()['y']
      const height = this.$refs.audioVoiceContainer.clientHeight - y;

      this.private_volume = height;
    }
  }
}
