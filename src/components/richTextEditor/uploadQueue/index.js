/****************************************************************************

所属系统: KPC
所属模块: 组件模块—[艾特弹出框导出文件]
创建时间: 2019年4月24日 15:55:24
维护人: August
*┌────────────────────────────────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．│
*│　版权所有：杰人软件(深圳)有限公司　　　　　　　　　　　         │
*└────────────────────────────────────────────────────────────┘
***************************************************************************/
import Vue from 'vue';
import uploadQueueVue from './uploadQueue.vue';

let uploadQueueInstance;

//  关闭回调
const close = function () {
  if (this.$el && this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el);
  }
  this.$destroy();
  uploadQueueInstance = undefined;
}

const UploadQueueConstructor = Vue.extend(uploadQueueVue);

UploadQueueConstructor.prototype.close = close;

/**
 * 上传队列组件构造函数
 * @param  {...any} args
 */
const UploadQueue = (...args) => {

  if (Vue.prototype.$isServer) { return };

  if (uploadQueueInstance) {
    return uploadQueueInstance;
  }

  const instance = new UploadQueueConstructor({
    el: document.createElement('div'),
    methods: {
      close
    }
  });

  document.body.appendChild(instance.$el);
  uploadQueueInstance = instance;
  return instance;
};

export default UploadQueue;
