/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[数字工具]
创建时间: 2019年8月14日 09:52:27
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

/**
 * @desc 金额千分位格式化
 * @param {Number} num 金额
 */
export function toThousandFilter(num, len = 0, defaultText = "--") {
  if (typeof num === 'number' || typeof num === 'string') {
    num = (+num).toFixed(len)
    let [integer, fractiona] = num.toString().split('.')
    integer = (+integer).toLocaleString()
    return fractiona ? `${integer}.${fractiona}` : integer
  } else {
    return defaultText
  }
}

/**
 * @desc 小数运算,只能支持两个数字的加减乘除
 * @param {String} type 'Add' 加法 'Sub' 减法  'Mul' 乘法 'Div' 除法
 * @param {Number} arg1 第一个数字
 * @param {Number} arg2 第二个数字
 */
export function decimalCalc(type = 'Add', arg1, arg2) {
  switch (type) {
    case 'Add':
      return accAdd(arg1, arg2)
    case 'Sub':
      return accSub(arg1, arg2)
    case 'Mul':
      return accMul(arg1, arg2)
    case 'Div':
      return accDiv(arg1, arg2)
    default:
      return accAdd(arg1, arg2)
  }

  /**
   ** 加法函数，用来得到精确的加法结果
   ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
   ** 调用：accAdd(arg1,arg2)
   ** 返回值：arg1加上arg2的精确结果
   **/
  function accAdd(arg1, arg2) {
    var r1, r2, m, c
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    c = Math.abs(r1 - r2)
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
      var cm = Math.pow(10, c)
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace('.', ''))
        arg2 = Number(arg2.toString().replace('.', '')) * cm
      } else {
        arg1 = Number(arg1.toString().replace('.', '')) * cm
        arg2 = Number(arg2.toString().replace('.', ''))
      }
    } else {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', ''))
    }
    return (arg1 + arg2) / m
  }

  /**
   ** 减法函数，用来得到精确的减法结果
   ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
   ** 调用：accSub(arg1,arg2)
   ** 返回值：arg1减去arg2的精确结果
   **/
  function accSub(arg1, arg2) {
    var r1, r2, m, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  }

  /**
   ** 乘法函数，用来得到精确的乘法结果
   ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
   ** 调用：accMul(arg1,arg2)
   ** 返回值：arg1乘以 arg2的精确结果
   **/
  function accMul(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  }

  /**
   ** 除法函数，用来得到精确的除法结果
   ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   ** 调用：accDiv(arg1,arg2)
   ** 返回值：arg1除以arg2的精确结果
   **/
  function accDiv(a, b) {
    let c, d, f, g

    try {
      c = a.toString().split('.')[1].length
    } catch (e) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (e) {
      d = 0
    }
    f = Number(a.toString().replace('.', ''))
    g = Number(b.toString().replace('.', ''))
    return (f / g) * Math.pow(10, d - c)
  }
}

/**
 * @desc 是否正整数
 * @param {*} num 数字
 */
export function isPositiveInteger(num) {
  return /^[1-9]\d*$/.test(num)
}

/**
 * @desc 是否小数
 * @param {*} num 数字
 */
export function isDecimal(num) {
  return /^-?\d+\.\d+$/.test(num)
}

/**
 * @desc 是否整数
 * @param {Number} obj 目标数字
 */
export function isInteger(obj) {
  return Math.floor(obj) === obj
}


/**
 * @desc 金额转大写汉字
 * @param {*} money
 */
export function smallToBig(money) {
  //汉字的数字
  var cnNums = new Array(
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖'
  )
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟')
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆')
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘')
  //整数金额时后面跟的字符
  var cnInteger = '整'
  //整型完以后的单位
  var cnIntLast = '元'
  //最大处理的数字
  var maxNum = 999999999999999.9999
  //金额整数部分
  var integerNum
  //金额小数部分
  var decimalNum
  //输出的中文金额字符串
  var chineseStr = ''
  //分离金额后用的数组，预定义
  var parts
  if (!money && money !== 0) {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    //超出最大处理数字
    return ''
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  //转换为字符串
  money = money.toString()
  if (money.indexOf('.') == -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0
    var IntLen = integerNum.length
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1)
      var p = IntLen - i - 1
      var q = p / 4
      var m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        //归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1)
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum == '') {
    chineseStr += cnInteger
  }
  return chineseStr
}
