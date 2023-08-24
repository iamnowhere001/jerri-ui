import htmlToImg from './htmlToImg.vue';

htmlToImg.install = function (Vue) {
  Vue.component(htmlToImg.name, htmlToImg);
};

export default htmlToImg;
