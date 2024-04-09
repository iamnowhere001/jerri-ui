/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[DOM工具]
创建时间: 2019年8月14日 09:52:27

***************************************************************************/
import {
  isUndefined
} from "./types";

/**
 * @desc 存在当前目标的可视界面中吗？
 * @param {HTMLElement} el 校验的目标
 * @param {HTMLElement} container 目标区域
 */
export function isInContainer(el, container) {
  if (!el || !container) {
    return false
  }

  let elRect = el.getBoundingClientRect();
  let containerRect;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }
  return elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right;
}

/**
 * @desc 一个简写的元素查询选择器
 * @param {*} selector 选择器
 */
export function query(selector) {
  return document.querySelector(selector);
}

/**
 * @desc 页面滚动至顶部
 * @param {HTMLElement} ele 滚动的元素，不传则默认整个窗体滚动
 */
export function scrollTop(ele) {
  if (ele) {
    ele.scrollTop = 0
  } else {
    document.documentElement.scrollTop = 0;
  }
}

let scrollBarWidth;

/**
 * @desc 获取滚动条宽度
 */
export function scrollbarWidth() {
  if (scrollBarWidth) {
    return scrollBarWidth;
  }

  const outer = document.createElement("div");
  outer.className = "scrollbar__wrap";
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";

  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

/**
 * @desc 获取DOM元素样式
 * @param {*} element
 * @param {*} styleName
 */
export function getStyle(element, styleName) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}

/**
 * @desc 该节点属于目标节点的子元素吗？
 * @param {*} child
 * @param {*} parent
 */
export function isChildOf(child, parent) {
  var parentNode;

  if (child && parent) {
    parentNode = child.parentNode;

    while (parentNode) {
      if (parent === parentNode) {
        return true;
      }

      parentNode = parentNode.parentNode;
    }
  }

  return false;
}

/**
 * @desc 获取图片的实际宽高大小
 * @param {String} url 图片地址
 * @author 杨文杰
 * @date 2019年6月25日 10:32:06
 */
export function getImgRealSize(url) {
  // 获取图片的实际宽高大小
  return new Promise(res => {
    let _IMG = new Image();
    _IMG.src = url;
    _IMG.onload = () => {
      res({
        width: _IMG.width,
        height: _IMG.height
      });
    };
  });
}

/**
 * @desc 动画滚动
 * @param {String} select 元素的选择器
 * @param {Object} options 调整配置选项
 * @author 陈宇奇
 * @date 2019年9月21日 14:17:53
 */
/**
 * @desc 动画滚动
 * @param {String} select 元素的选择器
 * @param {Object} options 调整配置选项
 * @author 陈宇奇
 * @date 2019年9月21日 14:17:53
 */
export let jump = (select, options = {}) => {

  let dom = query(select),
    // 默认开启动画
    animate = options.animate === false ? false : true,
    // 默认滚动距顶部距离100
    distanceTop = isUndefined(options.distanceTop) ? 100 : options.distanceTop,
    // 默认容器是body滚动条
    container = query(options.container) || document.documentElement;
  if (dom) {
    // 动画滚动
    if (animate) {
      let total = dom.offsetTop - distanceTop,
        distance = container.scrollTop,
        step = total / 50,
        smoothDown = () => {
          if (total > distance) {
            distance += step;
            container.scrollTop = distance;
            setTimeout(smoothDown, 10);
          } else {
            container.scrollTop = total;
          }
        },
        smoothUp = () => {
          if (distance > total) {
            distance -= step
            container.scrollTop = distance;
            setTimeout(smoothUp, 10)
          } else {
            container.scrollTop = total;
          }
        }
      if (total > distance) {
        smoothDown()
      } else {
        step = (distance - total) / 50
        smoothUp()
      }
    } else {
      // 没动画跳转至对应dom位置
      container.scrollTop = dom.getBoundingClientRect().top + container.scrollTop - distanceTop;
    }
  }
}


/**
 * @desc 获取最深层的最后一个子节点
 * @param {*} node 节点
 */
export function getDeepLastChild(node) {
  let n = node;
  while (n.lastChild) {
    n = n.lastChild
  }
  return n;
}

/**
 * @desc 获取类型为可见块级元素最后一个节点
 * @param {*} node 节点
 */
export function getBlockLastChild(node) {
  const excludeConstructor = ["[object HTMLStyleElement]", "[object Comment]", "[object Text]"];
  let lastChild = node.lastChild;

  while (excludeConstructor.includes(Object.prototype.toString.call(lastChild))) {
    lastChild = lastChild.previousSibling;
  }
  return lastChild;
}

/**
 * 窗口缩放执行回调
 */
function resizeHandler(entries) {
  //  entry是ResizeObserver构造函数执行时传入的参
  for (let entry of entries) {
    //  取出之前声明的回调函数数组
    const listeners = entry.target.__resizeListeners__ || [];
    //  遍历执行回调
    if (listeners.length) {
      listeners.forEach(fn => {
        fn();
      });
    }
  }
}

/**
 * 添加尺寸改变时事件监听
 * @param {HTMLDivElement} node 元素
 * @param {Function} fn 回调
 */
export const addResizeListener = function (node, fn) {
  if (!node.__resizeListeners__) {
    //  设置当前元素的事件回调数组
    node.__resizeListeners__ = [];
    //  实例化Resize观察者对象
    node.__ro__ = new ResizeObserver(resizeHandler);
    //  开始观察指定的目标元素，当元素尺寸改变时，会执行resizeHandler方法
    node.__ro__.observe(node);
  }
  //  往回调数组中添加本次监听事件
  node.__resizeListeners__.push(fn);
};

/**
 * 移除尺寸改变时事件监听
 * @param {HTMLDivElement} node 元素
 * @param {Function} fn 回调
 */
export const removeResizeListener = function (node, fn) {
  if (!node || !node.__resizeListeners__) return;
  //  数组中移除
  node.__resizeListeners__.splice(
    node.__resizeListeners__.indexOf(fn), 1
  );
  //  取消目标对象上所有对node的观察
  if (!node.__resizeListeners__.length) {
    node.__ro__.disconnect();
  }
};
