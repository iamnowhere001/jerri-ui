/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[数据工具]
创建时间: 2019年8月14日 09:52:27
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

/**
 * 按属性对对象数组分类
 * @param {Array} arr 目标数组
 * @param {String} property 提取属性key
 * @return {Object}  返回的对象
 *
 */
export const getClassify = (arr, property) => {
  return arr.reduce((acc, current) => {
    let key = current[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(current);
    return acc;
  }, {});
};

/**
 * @desc 取得一个数组中某个属性最小或最大的对象
 * @param {Object} arr 比较的数组
 * @param {String} attr 属性名称
 * @param {String} returnType 返回类型
 * @param {Boolean} max true为最大，false为最小
 * @return {Number} 对象
 * @author 林逸豪
 * @date 2019年8月5日
 * */
export function findMaxInArray(arr, attr, returnType = "index", max = true) {
  let object;
  let index;
  arr.forEach((item, i) => {
    object = object || item;
    let obj1;
    let obj2;

    if (attr) {
      obj1 = object[attr];
      obj2 = item[attr];
    } else {
      obj1 = object;
      obj2 = item;
    }

    if (max) {
      obj2 > obj1 && ((object = item), (index = i));
    } else {
      obj2 < obj1 && ((object = item), (index = i));
    }
  });
  return returnType === "index" ? index : object;
}

/**
 * @desc 在数组中寻找符合规则的对象下标
 * @param {*} arr 数组
 * @param {*} attr 属性
 * @param {*} max 最大？
 */
export function findIndexInArray(arr, attr, max) {
  return findMaxInArray(arr, attr, "index", max);
}

/**
 * @desc 在数组中寻找符合规则的对象
 * @param {*} arr 数组
 * @param {*} attr 属性
 * @param {*} max 最大？
 */
export function findObjectInArray(arr, attr, max) {
  return findMaxInArray(arr, attr, "object", max);
}

/**
 * @desc 时间戳转为对应时间格式
 * @param {Object} date new Date()
 * @param {String} fmt 格式化的格式
 * @return 格式化后的时间
 * @author 陈宇奇
 * @date 2019年4月13日 14:36:47
 */
export function date(date, fmt) {
  if (!date) return "";
  let dateTemp = "";
  if (date > 0) {
    dateTemp = new Date(Number(date));
  } else {
    dateTemp = new Date(date);
  }
  if (dateTemp.toString() === "Invalid Date") {
    dateTemp = new Date(date.toString().replace(/-/g, "/"));
    if (dateTemp.toString() === "Invalid Date") {
      return date;
    }
  }
  date = dateTemp;
  let o = {
    "M+": date.getMonth() + 1, // 月份
    "D+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt || "";
}

/**
 * @desc 返回当前日期或者当前月份
 * @param {Boolean} toDay true返回当前日期 false返回当前月份
 * @return {String} 时间字符串
 * @author 周克朱
 * @date 2019-10-14 15:57:27
 */
export function currentDate(toDay = true) {
  let date = new Date();
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate = toDay
    ? year + seperator1 + month + seperator1 + strDate
    : year + seperator1 + month;
  return currentdate;
}

/**
 * @desc 返回传入月份的第一天和最后一天
 * @param {Number} whichMonth 传如YYYY-MM
 * @param {Boolean} isFirst true返回第一天 false返回最后一天
 * @return {String} 时间字符串
 * @author 周克朱
 * @date 2019-10-14 15:57:21
 */
export function firstOrLastDay(whichMonth, isFirst = true) {
  let date = new Date(whichMonth);
  isFirst && date.setDate(1);
  let month = +whichMonth.split("-")[1];
  let year = date.getFullYear();
  month = month < 10 ? "0" + month : month;
  let day = isFirst ? date.getDate() : new Date(year, month, 0).getDate();
  day = day < 10 ? "0" + day : day;
  return year + "-" + month + "-" + day;
}

/**
 * @desc 日期/时间戳转星期
 * @param {String/Number} date 日期/时间戳
 * @return {String} 时间字符串
 * @author 陈宇奇
 * @date 2019-10-14 15:57:17
 */
export function weekday(date) {
  switch (new Date(date).getDay()) {
    case 0:
      return "星期天";
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
  }
}

/**
 * @desc JS获取当前周从星期一到星期天的日期
 * @param {Boolean} currentTime 当前日期字符串
 * @return {String} 时间字符串
 * @author 周克朱
 * @date 2019-10-14 16:27:43
 */
export function curWeek(currentTime) {
  let currentDate = new Date(currentTime);
  let timesStamp = currentDate.getTime();
  let currenDay = currentDate.getDay();
  let dates = [];
  for (var i = 0; i < 7; i++) {
    dates.push(
      new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7)))
        .toLocaleDateString()
        .replace(/\//g, "-")
    );
  }
  dates.forEach((item, index) => {
    if (item.split("-")[1].length === 1 || item.split("-")[2].length === 1) {
      let arr = item.split("-");
      arr.forEach((t, i) => {
        if (
          (i === 1 && item.split("-")[1].length === 1) ||
          (i === 2 && item.split("-")[2].length === 1)
        ) {
          arr[i] = "0" + t;
        }
      });
      dates[index] = arr.join("-");
    }
  });
  return dates;
}

/**
 * @desc 跟据当前获取某一天时间
 * @param {Number} day 距离当前日期的天数 跟据正负控制前还是后
 * @return {String} 时间字符串
 * @author 周克朱
 * @date 2019-7-19 16:39:49
 */
export function getSomeDay(day = 0) {
  let date = new Date().getTime() + 86400 * day * 1000;
  return new Date(date).toJSON().split("T")[0];
}

/**
 * @desc base64转file对象
 * @param {String} dataurl  base64
 * @param {String} filename 文件名
 */
export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime,
  });
}

/**
 * @desc 获取文件后缀名
 * @param {String} src 文件地址
 * @return {String} 文件后缀
 * @author 陈宇奇
 */
export function fileSuffix(src) {
  // 防止src为null的情况
  src = src || "";
  const RULE = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  //获取后缀名
  let suffix = src.match(RULE);
  return suffix && suffix[1];
}

/**
 * @desc 数组对象去重
 * @param {Array} arr 目标数组
 * @param {String} key 去重键名
 */
export function uniqueArr(arr, key) {
  const keyMap = {};
  if (!key) {
    return arr;
  }
  return arr.reduce((prev, current) => {
    keyMap[current[key]]
      ? ""
      : (keyMap[current[key]] = true && prev.push(current));
    return prev;
  }, []);
}

/**
 * @desc 返回字符串占用的字符长度
 * @param {String} str 字符串
 */
export function strLen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}

/**
 * @desc 深拷贝
 * @param {Object} p 拷贝对象
 * @param {Object} c 复制对象
 */
export function deepCopy(p, c) {
  function isObject(val) {
    return val && [Array, Object].includes(val.constructor);
  }

  if (!p) {
    return;
  }
  //  如存在第二复制参数，两者构造器必须一致
  if (c && p.constructor !== c.constructor) {
    return window["console"].error("如存在第二复制参数时，两者构造器必须一致");
  }
  c = c || (p.constructor === Object ? {} : []);

  if (isObject(p)) {
    for (let i in p) {
      if (p.hasOwnProperty(i)) {
        if (isObject(p[i])) {
          c[i] = p[i].constructor === Array ? [] : {};
          c[i] = deepCopy(p[i], c[i]);
        } else {
          c[i] = p[i];
        }
      }
    }
    return c;
  } else {
    return p;
  }
}

/**
 * @desc 将带有表情标记文字转为HTML文本
 * @param {*} text 文本
 */
export function faceFilter(text) {
  //  表情校验规则
  let faceRule = /(?:\[[^\[]+\](?:(?:\d)\])?)/gi;

  /**
   * @desc 单行渲染函数
   * @param {String} line 当前行文本内容
   * @author 杨文杰
   * @date 2019年5月22日 16:51:05
   */
  function simpleParser(line) {
    //  假设plaintext = "[微笑]你好"

    //  符合规则数组 ["[微笑]"]
    let ruleMatches = line.match(faceRule) || [];

    ruleMatches = ruleMatches.map((matchedRule, ruleNumber) => {
      //  生成特殊标签，例如表情
      let createdNode = faceRender(matchedRule);
      //  记录生成后的节点key值
      createdNode = Object.assign(createdNode, {
        key: ruleNumber,
      });
      return createdNode;
    });
    //  根据规则切割的数组 ["", "你好"]
    let ruleSplits = line.split(faceRule);

    /**
     * 将本行的内容进行累加
     * ruleSplits = ["", "你好"]
     * ruleMatches = [VNode]
     */
    let nodes = ruleSplits.reduce((prev, current, index) => {
      //  第一轮
      //  [...[], "", VNode]
      //  第二轮
      //  [...[VNode], "你好", undefined]
      //  最后
      //  [VNode, "你好"]
      return [...prev, current, ruleMatches[index]];
    }, []);
    return nodes;
  }

  const faceData = require("../assets/constants/faceKeyMap").default;

  /**
   * 表情文本转图片
   * @param {string} msg 文本
   */
  function faceText2Img(msg) {
    let src;
    for (var key in faceData) {
      if (msg.indexOf(faceData[key].chs) > -1) {
        let imgName = faceData[key]["png"];
        src = `${require("../assets/images/facePicker/" + imgName)}`;
        break;
      }
    }
    return src;
  }

  /**
   * @desc 表情渲染函数
   * @param {Regex} text 表情内容
   * @author 杨文杰
   * @date 2019年5月22日 16:51:28
   */
  function faceRender(text) {
    //  如果可以转化为表情
    const faceText = faceText2Img(text);
    if (faceText) {
      return `<img class="face" alt=${text} src=${faceText} />`;
    }
    //  否则返回为纯文本
    else {
      return `<span>${text}</span>`;
    }
  }
  return simpleParser(text).join("");
}

/**
 * @desc 安全设置对象的值
 * @param {*} target 目标对象
 * @param {*} path 路径
 * @param {*} value 值
 */
export function safeSet(target, path, value) {
  path.split(".").reduce((prev, attr, index, arr) => {
    const isLast = index === arr.length - 1;
    if (
      !isLast &&
      prev[attr] &&
      Object.prototype.toString.call(prev[attr]) !== "[object Object]"
    ) {
      console.error("你这个已存在的属性不是对象啊");
      return "";
    }

    if (isLast) {
      prev[attr] = value;
      return prev[attr];
    }
    prev[attr] ? prev[attr] : (prev[attr] = {});
    return prev[attr];
  }, target);
}

/**
 * @desc 安全地获取嵌套对象的属性
 * 特别注意：为了简化判断流程，undefined 和 null 均返回 undefined
 * @param {object} target - 目标对象
 * @param {string} path - 属性路径
 * @param {any} defaultValue - 默认值
 * @return {any} 目标属性
 */
export function safeGet(target, path, defaultValue) {
  //  判断是否为无值，即 undefined 或者 null
  const isNil = (value) => value === null || value === undefined;
  const value = path
    .split(".")
    .reduce(
      (last, key) => (key && last && !isNil(last[key]) ? last[key] : undefined),
      target
    );

  return isNil(value) ? defaultValue : value;
}

/**
 * 文件类型
 * @param {*} value
 */
export const renderSize = (value) => {
  if (null === value || value === "") {
    return "0 Bytes";
  }
  var unitArr = new Array(
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB"
  );
  var index = 0,
    srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  var size = srcsize / Math.pow(1024, index);
  //  保留的小数位数
  size = size.toFixed(2);
  return size + unitArr[index];
};

/**
 * 是否拥有某个属性
 * @param {*} obj
 * @param {*} attr
 */
export const hasAttr = (obj, attr) => {
  return obj && obj.hasOwnProperty(attr);
};

/**
 * @desc 计算对角线长度
 */
export const countDiagonal = (x, y) => {
  return Math.sqrt(x * x + y * y);
};

/**
 * @desc 获取页面query参数
 * @param {*} url
 */
export const urlQueryToObject = url => {
  url = url || location.href;
  return url
    .substr(url.indexOf("?") + 1)
    .split("&")
    .reduce(function(prev, current) {
      const queryArr = current.split("=");
      prev[queryArr[0]] = queryArr[1]
      return prev;
    }, {});
};

/**
 * 对象转query
 * @param {*} obj
 */
export const obj2Query = (obj) => {
  return Object.keys(obj).reduce((prev, current, index) => {
    if (obj[current] !== '' && obj[current] !== undefined) {
      prev += `${!index ? '' : '&'}${current}=${obj[current]}`
    }
    return prev
  }, '')
}

/**
 * query转对象
 * @param {*} obj
 */
export const query2Obj = (obj) => {
  return urlQueryToObject(obj);
}

/**
 * @desc 复制内容
 * @param {*} text
 */
export const copy = text => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    document.body.removeChild(input);
    return true;
  }
}

/**
 * @desc 下载文件
 * @param { String } src 地址
 * @date 2020年6月30日 14:53:37
 * @author 杨文杰
 */
export function downloadFile(argument1) {
  const createIframeAndDownload = function(src) {
    if (!src) {
      return
    }
    const iframe = document.createElement('iframe')
    iframe.src = src
    iframe.hidden = true
    document.documentElement.append(iframe)
    iframe.onload = function() {
      iframe.remove()
    }
  }

  if (!argument1) {
    return
  }

  if (Array.isArray(argument1)) {
    argument1.forEach((src) => createIframeAndDownload(src))
  } else {
    createIframeAndDownload(argument1)
  }
}

export function phoneFormat(phone) {
  return String(phone).replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3')
}


/**
 * @desc 是否小数点校验函数
 * @param {*} val
 * @param {*} data
 * @param {*} field
 * @returns { Boolean }
 *
<jr-input v-model="formData.name" @change="(val) => $utils.isDecimalPoint(val, formData, 'name')" />

等价于

<jr-input v-model="formData.name" @change="nameChange" />

nameChange(val) {
  const result = this.$utils.isDecimalPoint(val);
  if (!result) {
    formData.name = "";
  }
}
 */
export function isDecimalPoint(val, data, field) {
  const clear = () =>
    Object.prototype.toString.call(data) === '[Object object]' &&
    (data[field] = '')
  //  不为数字类型数据
  if (isNaN(val)) {
    clear();
    return false;
  }
  //  带小数点，且小数点后数据长度大于2
  if (val.includes(".") && val.split(".").last.length > 2) {
    clear();
    return false;
  }
  return true;
}

/**
 * @desc 数值在某个范围
 * @param {*} min
 * @param {*} max
 * @returns { Boolean }
 */
export function inRange(val, min, max) {
  if (isNaN(val)) {
    return false;
  }
  if (val < min || val > max) {
    return false;
  }
  return true;
}
