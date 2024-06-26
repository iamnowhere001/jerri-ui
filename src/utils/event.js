/****************************************************************************

所属系统: 组件库
所属模块: 工具模块—[事件监听工具]
创建时间: 2019年4月24日 14:50:55

***************************************************************************/

/**
 * 监听事件
 * @param {HTMLElement} element 监听的标签
 * @param {string} event 事件名称
 * @param {Function} handler 事件回调
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * 取消监听事件
 * @param {HTMLElement} element 监听的标签
 * @param {string} event 事件名称
 * @param {Function} handler 事件回调
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
