/****************************************************************************

所属系统: 组件库
所属模块: 通用模块—[指令]
创建时间: 2019年8月12日 14:33:31
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
import utils from "../utils"

/**
 * @desc 金额千分位格式化
 * @param {number} num 金额
 * @author 杨文杰
 * @date 2019年8月12日 14:33:07
 */
export function toThousandFilter(num, length, defaultValue) {
  return utils.toThousandFilter(num, length, defaultValue)
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
  return utils.date(date, fmt) || '--';
}

/**
 * @desc 补零函数，数据小于十时，补充零
 * @param {*} number 文本
 */
export function zeroPadding(number) {
  if (number < 10 && number >= 0) {
    return "0" + number
  } else {
    return number;
  }
}

/**
 * @desc 文件大小格式化函数
 * @param {} bytes 字节大小
 */
export function byteConvert(bytes) {
  if (isNaN(bytes)) {
    return ''
  }
  const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let exp = Math.floor(Math.log(bytes) / Math.log(2)),
    biteIndex = Math.floor(exp / 10)
  if (exp < 1) {
    exp = 0
  }
  bytes = bytes / Math.pow(2, 10 * biteIndex)
  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    bytes = bytes.toFixed(1)
  }
  return bytes + symbols[biteIndex];
}
