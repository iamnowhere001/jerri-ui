import MessageBox from './messageBox.vue';

MessageBox.install = function (Vue) {
  let MessageConstructor = Vue.extend(MessageBox);
  let instance;

  let Msg = function ({
    type = 'warn',
    tip,
    desc,
    confirmText = '确定',
    cancleText = '取消',
    onSure = () => { },
    onClose = () => { },
  }) {
    //  未曾实例化
    if (!instance) {
      // 实例化消息组件
      instance = new MessageConstructor();
      instance.$mount();
      document.body.appendChild(instance.$el)
    }

    getVal();
    instance.value = true

    function getVal() {
      instance.tip = tip
      instance.type = type
      instance.desc = desc
      instance.onSure = onSure
      instance.onClose = onClose
      instance.confirmText = confirmText
      instance.cancleText = cancleText
    }
    return instance
  }

  //  原型链挂载Message
  Vue.prototype.$messageBox = Msg;
  //  组件注册Message
  Vue.component(MessageBox.name, MessageBox);
};

export default MessageBox;
