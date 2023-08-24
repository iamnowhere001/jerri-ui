//  组件自动导入方法
const requireComponent = require.context(
  '.',
  true,
  /index.js$/
);

//  全部组件
const allComponents = requireComponent.keys().reduce((prev, modulePath) => {
  const value = requireComponent(modulePath);
  const viewModal = value.default;

  if (viewModal && viewModal.install) {
    prev[viewModal.name] = viewModal;
  }

  return prev;
}, {});

//  通用样式
import '../themes/common.scss';

//  工具类安装方法
import utilsInstall from '../utils/install';

/**
 * @desc 安装组件
 * @param {*} Vue Vue
 */
const install = (Vue) => {
  //  安装服务
  utilsInstall(Vue);

  //  安装组件
  Object.values(allComponents).forEach(component => {
    component.install(Vue);
  });
}

//  如果浏览器环境且拥有全局Vue，则自动安装组件，且为全量安装
if (typeof window !== 'undefined' && window.Vue) {
  install(Vue);
}

import config from '../../package.json';

export default {
  version: config.version,
  install,
  ...allComponents
}
