import Head from './head.vue';

Head.install = function (Vue) {
  Vue.component(Head.name, Head);
};

export default Head;