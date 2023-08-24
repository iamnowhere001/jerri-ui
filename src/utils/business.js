/****************************************************************************

所属系统: 组件库
所属模块: 工具类—[业务相关工具]
创建时间: 2019年8月14日 09:52:27
维护人: August

存放招生，KSS业务系统中常见的值转换方法

存放业务系统，与审批流项目交互的工具方法

*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/

/**
 * @desc 解析授权对象为键值
 * @author 杨文杰
 * @date 2020年6月11日 10:42:24
 */
export function parseUseTargetToValue(value) {
  return [[], ['1'], ['2'], '', ['1', '2']][value]
}

/**
 * @desc 将表单值拆分为键值
 * @author 杨文杰
 * @date 2020年6月11日 10:46:09
 * @example
 *
 * keyArr = [1, 2]
 * key => 4
 *
 * keyArr = [1]
 * keyArr => 1
 *
 * keyArr = [2]
 * keyArr => 2
 */
export function parseUseTargetToKey(keyArr) {
  /**
   * 0：未选
   * 1：新生
   * 2：老生
   * 4：全选
   */
  //  服务端的数据库字段只存了一个值来保存此值
  if (keyArr.length) {
    return keyArr.length == 2 ? '4' : keyArr.join('')
  } else {
    return '0'
  }
}

/**
 * @desc 解析授权对象为文本
 * @param {*} value
 */
export function parseUseTargetToText(value) {
  return ['', '新生', '老生', '', '新生, 老生'][value]
}

/**
 * @desc 设置iframe页面配置
 * @param { Object } config
 * @example:
 * config: {
 *  width,
 *  height,
 *  iframeBorder
 * }
 */
export function setIframeConfig(config) {
  window.parent.postMessage(JSON.stringify({
    type: 'setIframeConfig',
    ...config
  }), '*');
}

// (function(){let f= this ? class g{} : class h{}; return [typeof f,typeof h]}()

