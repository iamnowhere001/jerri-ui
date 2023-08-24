/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[数据类型判断工具]
创建时间: 2019年8月14日 09:52:27
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

/**
 * @desc 是否函数（旧名称）
 * @param {*} fn
 */
export function isFn(fn) {
  return isFunction(fn);
}

/**
 * @desc 是否字符串
 * @param {*} obj
 */
export function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
}

/**
 * @desc 是否数字
 * @param {*} number
 */
export function isNumber(number) {
  return Object.prototype.toString.call(number) === "[object Number]";
}

/**
 * @desc 是否对象
 * @param {*} obj
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

/**
 * @desc 是否数组
 * @param {*} object
 */
export function isArray(array) {
  return Object.prototype.toString.call(array) === "[object Array]";
}

/**
 * @desc 是否布尔值
 * @param {*} boolean
 */
export function isBoolean(boolean) {
  return Object.prototype.toString.call(boolean) === "[object Boolean]";
}

/**
 * @desc 是否Html
 * @param {*} boolean
 */
export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

export const isFunction = (functionToCheck) => {
  var getType = {};
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === "[object Function]"
  );
};

export const isUndefined = (val) => {
  return val === void 0;
};

export const isDefined = (val) => {
  return val !== undefined && val !== null;
};

/**
 * @desc 数据类型校验
 * @param {*} data
 * @param {*} types
 * @param {*} msg
 * @param {*} stopRuning
 */
export function typeValidate(
  data,
  types,
  msg = "数据类型校验不通过",
  stopRuning
) {
  !Array.isArray(types) && (types = [types]);

  let result = true;

  const errorInfo = (msg) => console.error(msg);
  const error = (msg) => new Error(msg);

  const validateFn = {
    function: isFunction,
    number: isNumber,
    object: isObject,
    array: isArray,
    string: isString,
    boolean: isBoolean,
  };

  for (let i in types) {
    const type = types[i];

    if (!validateFn[type](data)) {
      result = false;

      const text = isObject(msg) ? msg[type] : msg;

      stopRuning ? error(text) : errorInfo(text);
      break;
    }
  }

  return result;
}
