//  工具类
import utils from './index';

//  外框架方法
import frame from './frame';

//  指令
import * as directives from '../directives';

//  过滤器
import * as filters from '../filters';

// 多语言转换方法
import {
  translate
} from "../assets/constants/lang";

/**
 * @desc 工具类安装方法
 * @param {*} Vue
 */
export default (Vue) => {
  //  挂载工具类
  Vue.prototype.$utils = utils;

  //  挂载外框架方法
  Vue.prototype.$frame = frame;

  // 多语言配置
  Vue.prototype.$t = translate;

  // 执行一下全局挂载的刷新页面方法
  frame.reloadPage();

  //  安装指令
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
  });

  //  安装过滤器
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });
}
