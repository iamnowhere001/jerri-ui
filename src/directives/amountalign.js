/****************************************************************************

所属系统: 组件库
所属模块: 工具模块—[Vue指令，计算金额对齐方式]
创建时间: 2020年5月27日17:17:33

***************************************************************************/

import Vue from 'vue';

export default {
  //  指令第一次绑定到元素时调用，初始化回调处理
  bind(el, binding) {
    el.style = 'display:inline-block';

    // 先打标识，因为同个表格不同列都可能是金额
    let attr = `data-${binding.value||'aomuntAlign'}`;
    // 默认标识是0，以0区分是否为最后一条
    el.setAttribute(attr, 0);

    Vue.nextTick(() => {
      // 获取到当前元素的宽
      el.setAttribute(attr, el.offsetWidth);
      let dom = Array.prototype.slice.call(document.querySelectorAll(`[${attr}]`));
      let boxW = 0;

      // 遍历dom节点找到最大宽度, 且以falg判断是否为最后一条
      let falg = dom.some(el => {
        let width = +el.getAttribute(attr);
        boxW = width > boxW ? width : boxW;
        return !width;
      });

      // 最后一条数据执行遍历,将所有元素的最小宽度设置为元素的最大宽度值
      if (!falg) {
        dom.forEach(el => el.style = `display:inline-block;min-width:${boxW}px;text-align:right;`);
      }

    })
  }
}
