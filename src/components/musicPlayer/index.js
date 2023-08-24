import MusicPlayer from './musicPlayer.vue';

MusicPlayer.install = function (Vue) {
  Vue.component(MusicPlayer.name, MusicPlayer);
};

export default MusicPlayer;
