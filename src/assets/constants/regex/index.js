/****************************************************************************

所属系统: 组件库
所属模块: 常量—正则
创建时间: 2020年6月15日 10:12:57

***************************************************************************/

// 只能输入最多多少个数字 默认不限制
export const NUMBER_MAX_COUNT = (maxCount = "") =>
  new RegExp(`^\\d{1,${maxCount}}$`);

// 只能输入开头不为0 第二位开始最多多少个数字 默认不限制
export const AT_HAVE_MAX_COUNT = (maxCount = "") =>
  new RegExp(`^[1-9]\\d{0,${maxCount}}$`);

//  为数字
export const NUMBER = /^[0-9]*$/;

//  保留两位小数点
export const DECIMAL = /^[1-9]\d*\.?\d{1,2}$|^[0]$/;

// 英文、空格
export const ENGLISH = /^[A-Za-z\s]+$/;
