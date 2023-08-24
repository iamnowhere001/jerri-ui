import LoadingStep from './loadingStep.vue';

LoadingStep.install = function (Vue) {
  let LoadingConstructor = Vue.extend(LoadingStep);
  let instance;
  let load = function (bol = true, whiteMask = false) {
    let loadDom = document.getElementById("loading");
    // 判断加载是否存在
    if (document.body.contains(loadDom)) {
      // 控制显示隐藏
      loadDom.style = `display: ${bol ? 'block' : 'none'}`;
      // 判断loading是显示还是隐藏
      if (bol) {
        //  显示的时候需要判断是否新增白屏遮罩需要则添加类名
        whiteMask && loadDom.classList.add('white-mask');
      } else {
        //  关闭的时候如果因此白屏遮罩则删除类名
        !whiteMask && loadDom.classList.remove('white-mask');
      }
    } else {
      // 开启的时候才挂载 否则不挂载
      if (bol) {
        // 实例化加载组件
        instance = new LoadingConstructor({
          data() {
            return {
              isShow: bol,
              whiteMask
            };
          }
        });
        // 如果Vue实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
        instance.$mount();
        // 如果元素不存在将元素挂载到body上
        document.body.appendChild(instance.$el);
      }
    }
    return instance;
  }
  Vue.prototype.$loading = load;
};

export default LoadingStep;
