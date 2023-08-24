/****************************************************************************

所属系统: 组件库
所属模块: 公共模块—[工具类]
创建时间: 2019年7月15日 17:11:05
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
import * as browser from './browser';

//  业务支持方法
import * as business from './business'

// 数据处理
import * as data from './data'

// DOM处理
import * as dom from './dom'

// DOM事件处理
import * as event from './event'

// 表单处理
import * as form from './form'

// 请求
import * as formAjax from './formAjax'

// 金额数字处理
import * as number from './number'

// 数据类型处理
import * as types from './types'

//  数组原型链工具
import * as arrayPrototypeUtils from './prototype-array'

// 对象原型链工具
import * as objectPrototypeUtils from './prototype-object'

const methods = [
  browser,
  business,
  data,
  dom,
  event,
  form,
  formAjax,
  number,
  types,
].reduce(
  (prev, current) => {
    for (let i in current) {
      prev[i] = current[i]
    }
    return prev
  },
  {
    /**
     * @desc 防抖
     * @param {Function} fn 回调函数
     * @param {Number} wait 延迟时间
     * @param {Boolean} immediate 立即执行
     */
    debounce(fn, wait, immediate) {
      let timeout

      return function() {
        const that = this
        const args = arguments

        if (timeout) clearTimeout(timeout)
        if (immediate) {
          // 如果已经执行过，不再执行
          let callNow = !timeout
          timeout = setTimeout(function() {
            timeout = null
          }, wait)
          if (callNow) fn.apply(that, args)
        } else {
          timeout = setTimeout(function() {
            fn.apply(that, args)
          }, wait)
        }
      }
    },

    /**
     * @desc 节流
     * @param {*} fn 执行的回调
     * @param {*} interval 节流间隔
     */
    throttle(fn, interval) {
      // 记录前一次时间
      let last = +new Date()
      let timerId = null
      return function() {
        let current = +new Date()
        let args = [].slice.call(arguments, 0)
        let context = this
        // 首先清除定时器
        clearTimeout(timerId)
        // current 与last 间隔大于interval 执行一次fn
        // 在一个周期内 last相对固定 current一直再增加
        // 这里可以保证调用很密集的情况下 current和last 必须是相隔interval 才会调用fn
        if (current - last >= interval) {
          fn.apply(context, args)
          last = current
        } else {
          // 如果没有大于间隔 添加定时器
          // 这可以保证 即使后面没有再次触发 fn也会在规定的interval后被调用
          timerId = setTimeout(function() {
            fn.apply(context, args)
            last = current
          }, interval)
        }
      }
    },
  }
)

//  挂载数组原型链方法
Object.keys(arrayPrototypeUtils).forEach((fnName) => {
  if (!Array.prototype.hasOwnProperty(fnName)) {
    let obj = {}
    // 以函数的形参数量判断挂载方式
    obj[arrayPrototypeUtils[fnName].length ? 'value' : 'get'] =
      arrayPrototypeUtils[fnName];
    Object.defineProperty(Array.prototype, fnName, obj);
  }
})

// 挂载对象原型链方法
Object.keys(objectPrototypeUtils).forEach((fnName) => {
  if (!Object.prototype.hasOwnProperty(fnName)) {
    let obj = {
      writable: true,
    }
    obj['value'] = objectPrototypeUtils[fnName];
    Object.defineProperty(Object.prototype, fnName, obj);
  }
})

//  挂载手动触发元素按键事件方法
HTMLElement.prototype.pressKey = function(code) {
  const event = document.createEvent('UIEvents')
  event.keyCode = code
  event.initEvent('keydown', true, true)
  this.dispatchEvent(event)
}

export default methods
