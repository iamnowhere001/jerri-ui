/****************************************************************************

所属系统: 组件库
所属模块: 工具模块—[Vue指令，v-move]
创建时间: 2019年4月24日 14:51:53
维护人: August
*┌──────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　          │
*└──────────────────────────────────────────────────────────────┘
***************************************************************************/
import Vue from "vue";
//  事件监听
import { on, off } from "../utils/event";

/**
 * v-move
 * @desc 移动这个窗口
 * @example
 * ```vue
 * <div v-move>
 * </div>
 * ```
 */
export default {
  //  初次挂载时
  bind(el, { expression, value }) {
    Vue.nextTick(() => {
      if (expression) {
        //  正在拖拽
        let isMoving = false;
        //  拖拽前光标位置距离整个页面左侧的距离
        let disX = "";
        //  拖拽前光标位置距离整个页面顶部的距离
        let disY = "";
        //  当前拖拽移动节点
        let node = value();
        //  移动到外围
        const moveOut = el.getAttribute("move-out");

        node.style.position = "fixed";

        /**
         * @desc 处理鼠标按下事件，记录鼠标的各项位置，准备拖拽窗体
         * @author 杨文杰
         * @date 2019年6月21日 16:38:42
         */
        function handleMouseDown(e) {
          const moveDisabled = el.getAttribute("move-disabled");
          if (moveDisabled) {
            return false;
          }

          isMoving = true;
          disX = e.clientX - node.offsetLeft;
          disY = e.clientY - node.offsetTop;

          //  鼠标移动（移动窗口）
          on(document, "mousemove", handleMouseMove);
          //  鼠标按键松开（停止移动窗口）
          on(document, "mouseup", handleMouseUp);
        }

        /**
         * @desc 处理鼠标移动事件，更新窗体的位置
         * @author 杨文杰
         * @date 2019年6月21日 16:39:15
         */
        function handleMouseMove(e) {
          e.preventDefault();
          e.stopPropagation();
          if (isMoving) {
            let xLoc = e.clientX - disX;
            let yLoc = e.clientY - disY;

            if (!moveOut) {
              const setRight =
                window.document.documentElement.clientWidth - node.clientWidth;

              const setBottom =
                window.document.documentElement.clientHeight -
                node.clientHeight;

              if (xLoc < 0) {
                xLoc = 0;
              }
              if (xLoc > setRight) {
                xLoc = setRight;
              }
              if (yLoc < 0) {
                yLoc = 0;
              }
              if (yLoc > setBottom) {
                yLoc = setBottom;
              }
            }

            node.style.left = xLoc + "px";
            node.style.top = yLoc + "px";
            node.style.cursor = "move";
          }
        }

        /**
         * @desc 鼠标按键松开事件，移除移动中状态
         * @author 杨文杰
         * @date 2019年6月21日 16:39:42
         */
        function handleMouseUp() {
          isMoving = false;
          node.style.cursor = "";
          //  取消监听
          off(document, "mousemove", handleMouseMove);
          off(document, "mouseup", handleMouseUp);
        }

        el.handleMouseDown = handleMouseDown;

        on(el, "mousedown", el.handleMouseDown);
      }
    });
  },
  //  指令解绑时
  unbind(el) {
    off(el, "mousedown", el.handleMouseDown);
  },
};
