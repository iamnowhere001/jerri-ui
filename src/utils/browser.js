/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[浏览器相关工具]
创建时间: 2019年8月14日 09:52:27

***************************************************************************/

const UA = navigator.userAgent

const isIPad = UA.match(/(iPad).*OS\s([\d_]+)/) ? true : false
const isIPhone = !isIPad && UA.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false
const isMac = UA.match(/(Mac\sOS)\sX\s([\d_]+)/) ? true : false
const isSafari = (isIPad || isIPhone) && UA.match(/Safari/) ? true : false
const isAndroid = UA.match(/android/i) ? true : false
const isMQQBrowser = UA.match(/MQQBrowser\/([\d\.]+)/) ? true : false
const isUCBrowser = UA.match(/UCBrowser\/([\d\.]+)/) ? true : false
const isQQ = !isMQQBrowser ? (UA.match(/QQ\/([\d\.]+)/) ? true : false) : false
const isPC = (function() {
  const Agents = new Array(
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  )
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (UA.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
})()

export const browser = {
  versions: {
    //IE内核
    trident: UA.indexOf('Trident') > -1,
    //opera内核
    presto: UA.indexOf('Presto') > -1,
    //苹果、谷歌内核
    webKit: UA.indexOf('AppleWebKit') > -1,
    //火狐内核
    gecko: UA.indexOf('Gecko') > -1 && UA.indexOf('KHTML') == -1,
    //是否为移动终端
    mobile: !!UA.match(/AppleWebKit.*Mobile.*/),
    //ios终端
    ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    //android终端
    android: UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1,
    //是否为iPhone或者QQHD浏览器
    iPhone: UA.indexOf('iPhone') > -1,
    //是否iPad
    iPad: UA.indexOf('iPad') > -1,

    //是否web应该程序，没有头部与底部
    webApp: UA.indexOf('Safari') == -1,
    //是否微信
    weixin: UA.indexOf('MicroMessenger') > -1,
    //是否QQ
    qq: UA.match(/\sQQ/i) == ' qq',
  },

  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  isIPad,
  isIPhone,
  isMac,
  isSafari,
  isAndroid,
  isMQQBrowser,
  isUCBrowser,
  isQQ,
  isPC,
}
