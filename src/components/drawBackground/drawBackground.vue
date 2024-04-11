/****************************************************************************

所属系统: 组件库
所属模块: 水印组件


***************************************************************************/
<template>
  <div>
    <!-- 实际结构 建议先阅读最终html结构-->

    <!-- 最后会将watermark-wrapper由html转成canvas并获取base64，再将此base64作为need-watermark-box的背景图片 -->
    <!-- need-watermark-box为需要水印的元素-->
    <!-- watermark-wrapper为装载水印元素的盒子 -->
    <!-- watermark就是水印 -->

    <!-- <div class="need-watermark-box">
      <div class="watermark-wrapper">
        <div class="watermark">
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
// 引入html转canvas插件
import html2canvas from "html2canvas";
export default {
  name: "JrDrawBackground",
  props: {
    // 需要添加水印的内容
    domNode: {
      type: String
    },
    //水印在页面的层级
    zindex: {
      default: 1000
    },
    //水印区域
    wapper: "",
    //水印内容
    content: {
      default: "",
      required: true
    },
    //canvas画布宽度
    cWidth: {
      default: "76px"
    },
    //canvas画布高度
    cHeight: {
      default: "16px"
    }
  },
  data() {
    return {
      //添加水印的元素
      container: () => {
        return "";
      },
      // 存储水印盒子元素的宽
      domWidth: "",
      // 存储水印盒子元素的高
      domHeight: ""
    };
  },
  watch: {
    /**
     * @desc 监视宽度变化重新绘制背景图
     * @author 周克朱
     * @date 2019-12-25 10:56:54
     */
    domWidth(val, oldVal) {
      // 第二次且宽度有变化才执行，防止循环绘制
      if (oldVal && val !== oldVal) {
        this._initPic();
      }
    },
    /**
     * @desc 监视高度变化重新绘制背景图
     * @author 周克朱
     * @date 2019-12-25 10:56:54
     */
    domHeight(val, oldVal) {
      // 第二次且高度有变化才执行，防止循环绘制
      if (oldVal && val !== oldVal) {
        this._initPic();
      }
    }
  },
  mounted() {
    this._initPic();
  },
  methods: {
    /**
     * @desc 初始化图片
     * @author 周克朱
     * @date 2019-12-25 10:50:20
     */
    _initPic() {
      this.$nextTick(() => {
        // 获取watermark-wrapper
        this.container = (() => {
          if (!this.wapper) {
            return document.body;
          } else {
            return document.getElementsByClassName(this.wapper)[0];
          }
        })();

        // 以下获取单个水印宽度----------------------------------------------------------------------------------------

        // 创建一个元素用于计算宽度
        let temp = document.createElement("label");

        // 设置单个水印的样式
        let styleObj = {
          visibility: "hidden",
          position: "absolute",
          top: "-9999px"
        };

        Object.keys(styleObj).forEach(ele => {
          temp.style[ele] = styleObj[ele];
        });

        // 赋值水印的内容  如DKLHQWELQHDK这样的字符串
        temp.innerText = this.content;

        // 插入文档
        document.body.appendChild(temp);

        // 存储单个水印内容宽度(水印区域由多个水印内容铺满)
        let len = temp.clientWidth;

        // 删除单个水印
        temp.parentNode.removeChild(temp);
        // 以上单个水印宽度获取完成----------------------------------------------------------------------------------------

        // 每个单个水印左右的间隔
        const SINGLEPADDING = 4.5;

        // canvas 实现 watermark
        let __canvasWM = (
          // 参数的默认取值
          container = this.container,
          width = len - this.content.length - SINGLEPADDING + "px",
          height = this.cHeight,
          content = this.content,
          zIndex = this.zindex,
          textAlign = "left",
          textBaseline = "middle",
          font = "12px Microsoft Yahei",
          fillStyle = "rgba(231, 234, 239, 0.3)"
          // rgba(231, 234, 239, 0.3)
        ) => {
          // 以下绘制canvas---------------------------------------------------------------------------------------------------
          //声明canvas元素
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // 设置画布宽高
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          //设置画布属性
          ctx.textAlign = textAlign;
          ctx.textBaseline = textBaseline;
          ctx.font = font;
          ctx.fillStyle = fillStyle;
          // 字符间距设置
          ctx.fillText(content, 0, 8);

          //转base64
          const base64Url = canvas.toDataURL();
          // 绘制canvas完成-----------------------------------------------------------------------------------------

          //生成水印
          const __wm = document.querySelector(".__wm");
          const watermarkDiv = __wm || document.createElement("div");

          // 获取need-watermark
          const needWaterMark = document.querySelector(this.domNode);

          // 存储宽高(用于watch该水印区域变化后重绘水印)
          this.domWidth = parseInt(needWaterMark.style.width);
          this.domHeight = parseInt(needWaterMark.style.height);

          // 以下绘制一个绝对覆盖needWaterMark的水印（也就是上面的watermark）--------------------------------------------------
          // 圆直径
          const diameter = Math.sqrt(
            Math.pow(needWaterMark.clientWidth, 2) +
              Math.pow(needWaterMark.clientHeight, 2)
          );

          // 半径
          const radius = diameter / 2;

          // 背景图的内斜边
          const hypotenuse = Math.sqrt(
            Math.pow(diameter, 2) + Math.pow(diameter, 2)
          );

          // 背景图需要左移的距离
          const leftDistance = (hypotenuse - needWaterMark.clientWidth) / 2;

          // 背景图需要下移的距离
          const topDistance = Math.sqrt(
            Math.pow(radius, 2) - Math.pow(needWaterMark.clientWidth / 2, 2)
          );

          // 背景图片(此背景图用于watermark)
          const styleStr = `
          position:absolute;
          top: ${topDistance}px;
          left: -${leftDistance}px;
          width: ${diameter}px;
          height: ${diameter}px;
          transform-origin: 0% 0%;
          transform: rotate(-45deg);
          z-index:${zIndex};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')`;

          // 添加水印背景图
          watermarkDiv.setAttribute("style", styleStr);
          watermarkDiv.classList.add("__wm");
          // 以上绘制一个绝对覆盖needWaterMark的水印完成--------------------------------------------------

          if (!__wm) {
            container.style.position = "relative";
            container.insertBefore(watermarkDiv, container.firstChild);
          }

          // 绘制一个盛装水印的盒子（也就是watermark-wrapper，和内容元素同样大小），下面再html转成canvas
          let containerStyle = {
            height: "100%",
            width: "100%",
            position: "absolute",
            // overflow: "hidden",
            top: "0px",
            left: "0px"
          };

          Object.keys(containerStyle).forEach(ele => {
            container.style[ele] = containerStyle[ele];
          });

          // 需要水印的盒子相对定位(确保和装水印元素的外层盒子同样大小)
          needWaterMark.style["position"] = "relative";

          // 先让needWaterMarkoverf hidden
          let tempHidden = needWaterMark.style["overflow"];
          needWaterMark.style["overflow"] = "hidden";

          // 装水印的盒子作为子元素添加到需要水印的盒子中
          needWaterMark.appendChild(container);
          // watermark-wrapper从canvas转base64
          html2canvas(container, {
            removeContainer: true,
            scrollX: 0,
            scrollY: 0
          }).then(canvas => {
            // need-watermark赋值背景图片
            needWaterMark.style[
              "background-image"
            ] = `url(${canvas.toDataURL()})`;

            // 画完背景还原
            needWaterMark.style.overflow = tempHidden;
            // watermark-wrapper删除多余背景图，避免重复水印
            container.children[0].style["background-image"] = "";
            container.style.visibility = "hidden";
          });
        };

        // 挂到window上面
        window.__canvasWM = __canvasWM;

        // 调用
        __canvasWM();
      });
    }
  }
};
</script>
