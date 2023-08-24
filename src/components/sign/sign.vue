 /****************************************************************************

所属系统: 组件库
所属模块: 签字板
创建时间: 2020-01-02
维护人: 郑恺
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　 │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
 <template>
  <jr-message-box :value="isShow"
                  :title="title"
                  width="562px"
                  :isDefine="true"
                  @onClose="$emit('update:isShow',false)">

    <!-- 签字区域 -->
    <div id="canvasParcel">
      <canvas id="canvas"
              width="500"
              height="280"
              ref="canvas"
              @mousedown="down($event)"
              @mousemove="draw($event)"
              @mouseup="up"
              @mouseout="up"></canvas>

      <!-- 签字 按钮 -->
      <div class="j-btn-group">
        <jr-button @click="empty"
                   size="normal"
                   type="plain"
                   :disabled="!isCanvas">{{$t('sign_清空')}}</jr-button>
        <jr-button @click="exportSignature"
                   size="normal"
                   :disabled="!isCanvas">{{$t('common_保存')}}</jr-button>
      </div>
    </div>

    <!-- 上传到指定系统 -->
    <jr-upload :isAdd="1"
               :files="files"
               v-bind="$attrs"
               @file-result="getResult">
    </jr-upload>
  </jr-message-box>
</template>


<script>
export default {
  name: "JrSign",
  inheritAttrs: false,
  props: {
    // 是否显示签字板
    isShow: {
      type: Boolean,
      default: false
    },
    // 签字板左上角的标题
    title: {
      type: String,
      default: "收银员签字"
    }
  },
  data() {
    return {
      canvaDom: "", // 画布对象
      context: "", // 画板的上下文
      canvasX: "", // 画板的坐标x
      canvasY: "", // 画板的坐标y
      onoff: false, // 锁定开关
      oldx: "", // 起始坐标x
      oldy: "", // 起始坐标y
      newx: "", // 结束坐标x
      newy: "", // 结束坐标y
      isCanvas: false, // 判断canvas是否有内容
      // 签字后图片文件
      files: ""
    };
  },
  watch: {
    // 签字板的显示隐藏
    isShow(val) {
      if (val) {
        this.$nextTick(() => {
          this.init();
        });
      }
    }
  },
  methods: {
    /**
     * @desc 初始化canvas画布
     * @author 郑恺
     * @date 2020-1-2
     */
    init() {
      this.canvaDom = this.$refs.canvas; // 画布对象
      this.context = this.canvaDom.getContext("2d"); // 画板的上下文
      this.canvasX = this.canvaDom.getBoundingClientRect().left; // 画板的坐标x
      this.canvasY = this.canvaDom.getBoundingClientRect().top; // 画板的坐标y
      this.context.fillStyle = "white"; // 画布背景色
      this.context.lineWidth = 4; // 线的宽度
      this.context.strokeStyle = "black"; // 线的颜色
      this.context.fillRect(0, 0, this.canvaDom.width, this.canvaDom.height); // 画板的范围
      this.oldx = this.canvasX;
      this.oldy = this.canvasY;
    },

    /**
     * @desc 鼠标按下去的事件
     * @param {Object} event 事件源
     * @author 郑恺
     * @date 2020-1-2
     */
    down(event) {
      this.onoff = true; // 打开开关
      this.oldx = event.clientX - this.canvasX; // 鼠标在画板中点击的X的坐标
      this.oldy = event.clientY - this.canvasY; // 鼠标在画板中点击的Y的坐标
      this.context.beginPath(); // 开始路径
    },

    /**
     * @desc 鼠标移动
     * @param {Object} event 事件源
     * @author 郑恺
     * @date 2020-1-2
     */
    draw(event) {
      // 开关
      if (this.onoff) {
        this.isCanvas = true;
        this.newx = event.clientX - this.canvasX;
        this.newy = event.clientY - this.canvasY;
        this.context.moveTo(this.oldx, this.oldy); // 线的起点坐标
        this.context.lineTo(this.newx, this.newy); // 线的始点坐标
        this.context.stroke(); // 初始化到画布中
        this.oldx = this.newx;
        this.oldy = this.newy;
      }
    },

    /**
     * @desc 鼠标离开
     * @author 郑恺
     * @date 2020-1-2
     */
    up() {
      this.onoff = false; // 关闭开关
      this.context.closePath(); // 关闭路径
    },

    /**
     * @desc 导出信息
     * @author 郑恺
     * @date 2020-1-2
     */
    exportSignature() {
      const exportImg = this.canvaDom.toDataURL("image/jpeg", 0.1); // 0.1代表压缩的比率，默认为1
      this.uploadFile(this.$utils.dataURLtoFile(exportImg, "img.png"));
    },

    /**
     * @desc 清空签字
     * @author 郑恺
     * @date 2020-1-2
     */
    empty() {
      this.context.clearRect(0, 0, this.canvaDom.width, this.canvaDom.height); // 清空的范围
      this.context.fillRect(0, 0, this.canvaDom.width, this.canvaDom.height); // 重设的范围
      this.isCanvas = false;
      this.$emit("clear-sign", true);
    },

    /**
     * @desc 关闭签字板
     * @author 郑恺
     * @date 2020-1-2
     */
    close() {
      this.$emit("update:isShow", false);
      this.$emit("close-sign", { value: this.isShow });
    },

    /**
     * @desc 上传签字的结果
     * @param {Object} res 图片返回结果
     * @author 郑恺
     * @date 2020-1-2
     */
    getResult(res) {
      this.files = "";
      this.$emit("get-sign", res.fileUrl || undefined);
    },

    /**
     * @desc 当前文件
     * @author 郑恺
     * @date 2020-1-2
     */
    uploadFile(file) {
      this.files = file;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./sign.scss";
</style>
