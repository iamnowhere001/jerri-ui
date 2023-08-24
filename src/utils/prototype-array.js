/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[数组原型链工具方法]
创建时间: 2019年8月14日 09:52:27
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

/**
 * @desc 将数组的每个属性，以分隔符进行分割为字符串返回
 * @param {*} name 属性名
 * @param {*} separator 分隔符
 */
export function eachAttrs(name, separator = ",") {
  return this.map(arr => arr[name]).join(separator);
}

/**
 * @desc 返回数组的最后一个下标的元素
 */
export function last() {
  return this[this.length - 1];
}

/**
 * @desc 返回数组的第一个下标的元素
 */
export function first() {
  return this[0];
}

/**
 * @desc 返回数组的指定keyname的值
 */
export function findKey(name, keyName = 'bindKey') {
  return this.find(el => el[keyName] === name);;
}

/**
 * @desc 判断下标是否为当前数组最后一位
 * @param {*} index
 */
export function isLastIndex(index) {
  return this.length - 1 === index
}
