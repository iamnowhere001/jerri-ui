import CountDown from './countDown.vue';

CountDown.install = function (Vue) {
  Vue.component(CountDown.name, CountDown);
};

export default CountDown;
