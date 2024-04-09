/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[表单工具]
创建时间: 2019年8月14日 09:52:27

***************************************************************************/
/**
 * @desc 校验手机号码
 * @param {String | Number} tel
 * @returns {Boolean} 真或否
 */
export function isPhoneNum(tel) {
  return /^1\d{10}$/.test(tel);
}

/**
 * @desc 校验邮箱
 * @param {String} email 邮箱地址
 * @returns {Boolean} 真或否
 */
export function isEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

/**
 * @desc 校验身份证号码
 * @param {string} id 身份证号
 * @returns {boolean} 真或否
 */
export function isIdCard(id) {
  if (id.length != 18) {
    return false;
  }
  //  系数
  const coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  //  校验位
  const parity = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2];
  let total = 0;
  for (var i = 0; i < coefficient.length; i++) {
    if (isNaN(id[i])) {
      return false
    }
    total += id[i] * coefficient[i];
  }

  if (parity[total % 11] != id[17].toLowerCase()) {
    return false;
  }

  return true;
}
