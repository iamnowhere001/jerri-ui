import htmlToPdf from './htmlToPdf.vue';

htmlToPdf.install = function (Vue) {
  Vue.component(htmlToPdf.name, htmlToPdf);
};

export default htmlToPdf;
