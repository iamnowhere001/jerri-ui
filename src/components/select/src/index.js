import Vue from "vue";
import Options from './options.vue';


let OptionsConstructor = Vue.extend(Options)
let instance

export const showOptions = function (
  Select
  //   msg = "提示消息",
  //   duration = 1500,
  //   callback = () => {}
) {
  // 如果已经存在元素则返回
  if (document.body.contains(document.getElementById("msg"))) return;
  // 实例化消息组件
  instance = new OptionsConstructor({
    data() {
      return {
        showList: Select.showList,
        isSelect: true,
        list: Select.list,
        reSelect: Select.reSelect,
        title: Select.title,
        searchArr: Select.searchArr
      };
    },
  });
  // 如果Vue实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
  instance.$mount();
  // 如果元素不存在将元素挂载到body上
  document.body.appendChild(instance.$el);
};


/* istanbul ignore next */
// Select.prototype.$msg = Msg

export default Options;
// export const msg = Message.install(Vue)