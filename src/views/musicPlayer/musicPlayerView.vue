<template>
  <div>
   <h2 class="j-mb-20">音乐播放器</h2>
    <p v-move>当前形态：{{type}}</p>
    <jr-music-player ref="musicPlayer"
                     :type.sync="type"
                     :currentIndex.sync="currentIndex"
                     :isAutoPlay="true"
                     :audioList="audioList"></jr-music-player>

    <h3>点歌名换歌</h3>

    <button @click="() => {
        $refs.musicPlayer.play()
      }">播放歌曲</button>
    <button @click="() => {
        $refs.musicPlayer.pause()
      }">暂停歌曲</button>

    <ul>
      <li v-for="(music, index) in audioList"
          :key="index"
          @click="() => {
            currentIndex = index;
          }">
        {{music.fileName}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "musicPlayerView",
  label: "音乐播放器",
  data() {
    return {
      type: "window",
      currentIndex: 0,
      audioList: [
        {
          fileName: "Legend Never Die",
          filePath:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/OSS/DK/UploadFiles/Musics/2019/08/aeb3aac8cf484d9aa5e17f077241b50b.mp3"
        },
        {
          fileName: "Closer",
          filePath:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/OSS/DK/UploadFiles/Musics/2019/08/bc9ba2fe76634647a0130ebabb17b9e8.mp3"
        },
        {
          fileName: "What Lovers Do",
          filePath:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/OSS/DK/UploadFiles/Musics/2019/08/cf8f15966d584ff68d430dfc2894473c.mp3"
        },
        {
          fileName: "Yellow",
          filePath: "http://mp3.9ku.com/m4a/465288.m4a"
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

