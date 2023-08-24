import Vue from 'vue'
import App from './App.vue'
import router from './router'
import JrUI from './components';
Vue.use(JrUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
