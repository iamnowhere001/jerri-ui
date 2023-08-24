/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[对象原型链工具方法]
创建时间: 2019年8月14日 09:52:27
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

/**
 * 对比两份数据是否相等
 * @param {any} data 目标数组
 * @return {Boolean}  是否相等
 *
 */
export function isSame(data) {
  return JSON.stringify(this) === JSON.stringify(data);
}

/**
 * @desc 判断元素是否为某个数组的最后一项
 * @param { Array } arr
 * @param { Number } index
 * @exapmle

var a = { name: 1 };
var b = { name: 2 };
var c = { age: 2 };

var arr1 = [a, b];
var arr2 = [c];

b.isLast(arr1);    //    true
a.isLast(arr1);    //    false
b.isLast(arr2);    //    false

但可能会有这样的情况，数组内容为相同值

var arr = [a, a, a, a];

// 此时需要这样调用
a.isLast(arr, 2);   //  false
a.isLast(arr, 3);   //  true


 */
export function isLast(arr, index = "") {
  if(index !== "") {
    return arr.length - 1 === index;
  } else {
    return arr[arr.length - 1] === this;
  }
}

/**
 * @desc 为对象设置多个属性
 * @param {*} attrObj
 *
 * var a = { name: "a" };

  var b = { name: "b", age: 18, gender: "" };

  a.setAttr(b);
 */
export function setAttr(attrObj) {
  Object.keys(attrObj).forEach((attr) => {
    if (attrObj !== '') {
      this[attr] = attrObj[attr]
    }
  })
}
