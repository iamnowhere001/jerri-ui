import ScrollView from './scrollView.vue';

ScrollView.install = function (Vue) {
  Vue.component(ScrollView.name, ScrollView);
};

export default ScrollView;
