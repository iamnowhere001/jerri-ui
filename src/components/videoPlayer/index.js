import VideoPlayer from './videoPlayer.vue';

VideoPlayer.install = function (Vue) {
  Vue.component(VideoPlayer.name, VideoPlayer);
};

export default VideoPlayer;
